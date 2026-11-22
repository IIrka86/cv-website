import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from './Switch';

const STATE_LABELS = { on: 'Shown', off: 'Hidden' };

describe('Switch', () => {
  it('is a switch named by its label, without the state words', () => {
    render(<Switch label="Polish" stateLabels={STATE_LABELS} />);

    // The name must be exactly the label: Shown/Hidden are aria-hidden,
    // the switch role already announces on/off
    expect(screen.getByRole('switch', { name: 'Polish' })).not.toBeChecked();
  });

  it('toggles on a click on the switch', async () => {
    const user = userEvent.setup();
    render(<Switch label="Polish" />);
    const toggle = screen.getByRole('switch', { name: 'Polish' });

    await user.click(toggle);
    expect(toggle).toBeChecked();

    await user.click(toggle);
    expect(toggle).not.toBeChecked();
  });

  it('toggles on a click on the label text', async () => {
    const user = userEvent.setup();
    render(<Switch label="Polish" />);

    await user.click(screen.getByText('Polish'));

    expect(screen.getByRole('switch', { name: 'Polish' })).toBeChecked();
  });

  it('toggles with Space when focused', async () => {
    const user = userEvent.setup();
    render(<Switch label="Polish" />);

    await user.tab();
    await user.keyboard(' ');

    expect(screen.getByRole('switch', { name: 'Polish' })).toBeChecked();
  });

  it('does not toggle when disabled', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <Switch
        label="English"
        defaultChecked
        disabled
        onChange={handleChange}
      />,
    );
    const toggle = screen.getByRole('switch', { name: 'English' });

    await user.click(toggle);

    expect(toggle).toBeDisabled();
    expect(toggle).toBeChecked();
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('calls onChange once per toggle', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Switch label="Polish" onChange={handleChange} />);

    await user.click(screen.getByRole('switch', { name: 'Polish' }));

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('sends its name with the form only when on', async () => {
    const user = userEvent.setup();
    render(
      <form aria-label="Languages">
        <Switch label="Russian" name="lang-ru" defaultChecked />
        <Switch label="Polish" name="lang-pl" />
      </form>,
    );
    const form = screen.getByRole<HTMLFormElement>('form', {
      name: 'Languages',
    });

    expect(new FormData(form).get('lang-ru')).toBe('on');
    expect(new FormData(form).has('lang-pl')).toBe(false);

    await user.click(screen.getByRole('switch', { name: 'Polish' }));

    expect(new FormData(form).get('lang-pl')).toBe('on');
  });
});
