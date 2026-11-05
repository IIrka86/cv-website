import { Tabs } from './Tabs';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Stack } from '@/components/ui/Stack';
import { Section } from '@/components/ui/Section';
import { Monogram } from '@/components/ui/Monogram';
import { Heading } from '@/components/ui/Heading';

const TABS = [
  {
    id: 'tab1',
    label: 'Instinctools',
    meta: '2022 - Present',
    content: <Stack>Tabs 1</Stack>,
  },
  {
    id: 'tab2',
    label: 'Nuance Comunications',
    meta: '2019 - 2022',
    content: <Stack>Tabs 2</Stack>,
  },
];

const TABS_MONO = [
  {
    id: 'tab1',
    label: 'Instinctools',
    meta: '2022 - Present',
    monogram: <Monogram>IN</Monogram>,
    content: <Stack>Tabs 1</Stack>,
  },
  {
    id: 'tab2',
    label: 'Nuance Comunications',
    meta: '2019 - 2022',
    content: <Stack>Tabs 2</Stack>,
    monogram: <Monogram>NC</Monogram>,
  },
];

const TABS_NESTED = [
  {
    id: 'tab1',
    label: 'Instinctools',
    meta: '2022 - Present',
    content: (
      <Stack>
        <Heading as={'h4'} id={'header-1'}>
          Projects
        </Heading>
        <Tabs
          labelledBy={'header-1'}
          orientation={'vertical'}
          tabs={TABS_MONO}
        />
      </Stack>
    ),
  },
  {
    id: 'tab2',
    label: 'Nuance Comunications',
    meta: '2019 - 2022',
    content: (
      <Stack>
        {' '}
        <Heading as={'h4'} id={'header-2'}>
          Projects
        </Heading>
        <Tabs
          labelledBy={'header-2'}
          orientation={'vertical'}
          tabs={TABS_MONO}
        />
      </Stack>
    ),
    monogram: <Monogram>NC</Monogram>,
  },
];

const meta = {
  component: Tabs,
  args: {
    tabs: TABS,
    labelledBy: 'header',
    defaultValue: 'tab2',
  },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <>
      <Heading as={'h4'} id={'header'}>
        Experience
      </Heading>
      <Tabs {...args} />
    </>
  ),
};

export const Vertical: Story = {
  argTypes: {
    orientation: { control: false },
  },
  render: (args) => (
    <Section tone={'hero'}>
      <Heading as={'h4'} id={'header'}>
        Experience
      </Heading>
      <Tabs {...args} orientation={'vertical'} tabs={TABS_MONO} />
    </Section>
  ),
};

export const Nested: Story = {
  argTypes: {
    orientation: { control: false },
  },
  render: (args) => (
    <Section tone={'hero'}>
      <Heading as={'h4'} id={'header'}>
        Experience
      </Heading>
      <Tabs {...args} tabs={TABS_NESTED} />
    </Section>
  ),
};
