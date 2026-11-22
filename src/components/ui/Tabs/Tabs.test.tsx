import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { TabItem, TabsProps } from './Tabs';
import { Tabs } from './Tabs';

const TABS: TabItem[] = [
  { id: 'design', label: 'Design', content: 'Design panel' },
  { id: 'code', label: 'Code', content: 'Code panel' },
  { id: 'review', label: 'Review', content: 'Review panel' },
];

const renderTabs = (props: Partial<TabsProps> = {}) => {
  const user = userEvent.setup();

  render(
    <>
      <h2 id="workflow">Workflow</h2>
      <Tabs labelledBy="workflow" tabs={TABS} {...props} />
    </>,
  );

  return { user };
};

const getTab = (name: string) => screen.getByRole('tab', { name });

const expectActive = (name: string) => {
  expect(getTab(name)).toHaveAttribute('aria-selected', 'true');
  expect(getTab(name)).toHaveFocus();
  expect(screen.getByRole('tabpanel', { name })).toBeVisible();
};

describe('Tabs', () => {
  describe('initial state', () => {
    it('names the tablist by the heading from labelledBy', () => {
      renderTabs();

      expect(
        screen.getByRole('tablist', { name: 'Workflow' }),
      ).toBeInTheDocument();
    });

    it('selects the tab from defaultValue and shows only its panel', () => {
      renderTabs({ defaultValue: 'code' });

      expect(getTab('Code')).toHaveAttribute('aria-selected', 'true');
      expect(getTab('Design')).toHaveAttribute('aria-selected', 'false');
      // Hidden panels are left out of the accessibility tree
      expect(screen.getAllByRole('tabpanel')).toHaveLength(1);
      expect(screen.getByRole('tabpanel', { name: 'Code' })).toHaveTextContent(
        'Code panel',
      );
    });

    it('selects the first tab when defaultValue is missing', () => {
      renderTabs();

      expect(getTab('Design')).toHaveAttribute('aria-selected', 'true');
    });

    it('selects the first tab when defaultValue matches no tab', () => {
      renderTabs({ defaultValue: 'missing' });

      expect(getTab('Design')).toHaveAttribute('aria-selected', 'true');
    });

    it('renders an empty tablist when there are no tabs', () => {
      renderTabs({ tabs: [] });

      expect(screen.getByRole('tablist')).toBeInTheDocument();
      expect(screen.queryAllByRole('tab')).toHaveLength(0);
    });
  });

  describe('mouse', () => {
    it('selects a clicked tab and shows its panel', async () => {
      const { user } = renderTabs();

      await user.click(getTab('Review'));

      expectActive('Review');
      expect(getTab('Design')).toHaveAttribute('aria-selected', 'false');
    });
  });

  describe('keyboard', () => {
    it('puts only the selected tab in the Tab order, then the panel', async () => {
      const { user } = renderTabs({ defaultValue: 'code' });

      await user.tab();
      expect(getTab('Code')).toHaveFocus();

      await user.tab();
      expect(screen.getByRole('tabpanel', { name: 'Code' })).toHaveFocus();
    });

    it('moves selection and focus with ArrowRight and ArrowLeft', async () => {
      const { user } = renderTabs();

      await user.click(getTab('Design'));
      await user.keyboard('{ArrowRight}');
      expectActive('Code');

      await user.keyboard('{ArrowLeft}');
      expectActive('Design');
    });

    it('wraps from the last tab to the first and back', async () => {
      const { user } = renderTabs({ defaultValue: 'review' });

      await user.click(getTab('Review'));
      await user.keyboard('{ArrowRight}');
      expectActive('Design');

      await user.keyboard('{ArrowLeft}');
      expectActive('Review');
    });

    it('jumps to the first tab on Home and the last on End', async () => {
      const { user } = renderTabs({ defaultValue: 'code' });

      await user.click(getTab('Code'));
      await user.keyboard('{End}');
      expectActive('Review');

      await user.keyboard('{Home}');
      expectActive('Design');
    });

    it('ignores ArrowDown and ArrowUp in a horizontal tablist', async () => {
      const { user } = renderTabs();

      await user.click(getTab('Design'));
      await user.keyboard('{ArrowDown}{ArrowUp}');

      expectActive('Design');
    });

    it('uses ArrowDown and ArrowUp in a vertical tablist, not ArrowRight', async () => {
      const { user } = renderTabs({ orientation: 'vertical' });

      expect(screen.getByRole('tablist')).toHaveAttribute(
        'aria-orientation',
        'vertical',
      );

      await user.click(getTab('Design'));
      await user.keyboard('{ArrowRight}');
      expectActive('Design');

      await user.keyboard('{ArrowDown}');
      expectActive('Code');

      await user.keyboard('{ArrowUp}');
      expectActive('Design');
    });

    // Alt+Arrow is history navigation, Ctrl/Cmd+Arrow belong to the OS
    it.each(['Alt', 'Control', 'Meta'])(
      'leaves %s + Arrow to the browser',
      async (modifier) => {
        const { user } = renderTabs();

        await user.click(getTab('Design'));
        await user.keyboard(`{${modifier}>}{ArrowRight}{/${modifier}}`);

        expectActive('Design');
      },
    );
  });

  describe('nested tabs', () => {
    // The inner tablist sits in the outer tabpanel, a sibling of the outer
    // tablist, so its key events can't reach the outer handler today. This
    // guards the structure: it fails if onKeyDown moves from role="tablist"
    // to a wrapper that contains the panels too.
    it('keeps arrow keys inside the inner tablist', async () => {
      const user = userEvent.setup();

      render(
        <>
          <h2 id="outer">Outer</h2>
          <Tabs
            labelledBy="outer"
            tabs={[
              {
                id: 'first',
                label: 'First',
                content: (
                  <>
                    <h3 id="inner">Inner</h3>
                    <Tabs labelledBy="inner" tabs={TABS} />
                  </>
                ),
              },
              { id: 'second', label: 'Second', content: 'Second panel' },
            ]}
          />
        </>,
      );

      const inner = within(screen.getByRole('tablist', { name: 'Inner' }));
      const outer = within(screen.getByRole('tablist', { name: 'Outer' }));

      await user.click(inner.getByRole('tab', { name: 'Design' }));
      await user.keyboard('{ArrowRight}');

      expect(inner.getByRole('tab', { name: 'Code' })).toHaveAttribute(
        'aria-selected',
        'true',
      );
      expect(outer.getByRole('tab', { name: 'First' })).toHaveAttribute(
        'aria-selected',
        'true',
      );
    });
  });
});
