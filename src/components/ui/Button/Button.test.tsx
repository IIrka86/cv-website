import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';
import userEvent from '@testing-library/user-event';
import type { SubmitEventHandler } from 'react';

describe('Button', () => {
  it('defaults to type=button and does not submit the parent form', async () => {
    const handleSubmit = vi.fn();
    const user = userEvent.setup();

    render(
      <form onSubmit={handleSubmit}>
        <Button>Button</Button>
      </form>,
    );

    const button = screen.getByRole('button', { name: 'Button' });
    await user.click(button);

    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('submits the parent form when type=submit', async () => {
    const handler: SubmitEventHandler<HTMLFormElement> = (e) => {
      e.preventDefault();
    };
    const handleSubmit = vi.fn(handler);
    const user = userEvent.setup();

    render(
      <form onSubmit={handleSubmit}>
        <Button type="submit">Button</Button>
      </form>,
    );

    const button = screen.getByRole('button', { name: 'Button' });
    await user.click(button);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('calls onClick when button pressed', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Button</Button>);

    const button = screen.getByRole('button', { name: 'Button' });
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Button onClick={handleClick} disabled>
        Button
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Button' });
    await user.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('takes name from aria-label when variant=icon', () => {
    render(
      <Button variant="icon" icon="calendar" aria-label="Open calendar" />,
    );

    const button = screen.getByRole('button', { name: 'Open calendar' });
    expect(button).toBeInTheDocument();
  });

  it('passes extra attributes to the button element', () => {
    render(
      <Button aria-describedby={'aria'} name={'button-name'}>
        Button
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Button' });
    expect(button).toHaveAttribute('aria-describedby', 'aria');
    expect(button).toHaveAttribute('name', 'button-name');
  });
});
