import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ToastProvider, useToast } from './ToastProvider';
import { Button } from '@/components/ui/Button';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TOAST_DURATION_MS } from '@/styles/tokens/motion';
import type { ReactNode } from 'react';

const ToastButton = ({
  buttonName,
  message,
}: {
  buttonName: string;
  message: string;
}) => {
  const showToast = useToast();

  return <Button onClick={() => showToast(message)}>{buttonName}</Button>;
};

const renderProvider = (
  name: string,
  message: string,
  children?: ReactNode,
) => {
  render(
    <ToastProvider>
      <ToastButton buttonName={name} message={message} />
      {children}
    </ToastProvider>,
  );
};

describe('ToastProvider', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('renders an empty status region before any toast is shown', () => {
    renderProvider('Help', 'Please help me!');
    expect(screen.getByRole('status')).toBeEmptyDOMElement();
  });

  it('shows the message inside the status region', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderProvider('Help', 'Please help me!');

    await user.click(screen.getByRole('button', { name: 'Help' }));
    expect(screen.getByRole('status')).toHaveTextContent('Please help me!');
  });

  it('hides the toast after TOAST_DURATION_MS', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderProvider('Help', 'Please help me!');

    await user.click(screen.getByRole('button', { name: 'Help' }));

    act(() => {
      vi.advanceTimersByTime(TOAST_DURATION_MS - 1);
    });

    expect(screen.getByRole('status')).toHaveTextContent('Please help me!');

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(screen.getByRole('status')).toBeEmptyDOMElement();
  });

  it('restarts the timer when a new toast replaces the current one', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderProvider(
      'Help',
      'Please help me!',
      <ToastButton buttonName="Save" message="Please save me!" />,
    );

    await user.click(screen.getByRole('button', { name: 'Help' }));

    act(() => {
      vi.advanceTimersByTime(TOAST_DURATION_MS / 2);
    });

    await user.click(screen.getByRole('button', { name: 'Save' }));

    act(() => {
      vi.advanceTimersByTime(TOAST_DURATION_MS - 1);
    });

    expect(screen.getByRole('status')).toHaveTextContent('Please save me!');
    expect(screen.getByRole('status')).not.toHaveTextContent('Please help me!');

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(screen.getByRole('status')).toBeEmptyDOMElement();
  });

  it('keeps the toast while the mouse is over it', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderProvider('Help', 'Please help me!');

    await user.click(screen.getByRole('button', { name: 'Help' }));

    act(() => {
      vi.advanceTimersByTime(TOAST_DURATION_MS - 1);
    });

    await user.hover(screen.getByText('Please help me!'));

    act(() => {
      vi.advanceTimersByTime(TOAST_DURATION_MS);
    });

    expect(screen.getByRole('status')).toHaveTextContent('Please help me!');
  });

  it('restarts the full duration after the mouse leaves', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderProvider('Help', 'Please help me!');

    await user.click(screen.getByRole('button', { name: 'Help' }));

    act(() => {
      vi.advanceTimersByTime(TOAST_DURATION_MS - 1);
    });

    await user.hover(screen.getByText('Please help me!'));

    act(() => {
      vi.advanceTimersByTime(TOAST_DURATION_MS);
    });

    await user.unhover(screen.getByText('Please help me!'));

    act(() => {
      vi.advanceTimersByTime(TOAST_DURATION_MS - 1);
    });

    expect(screen.getByRole('status')).toHaveTextContent('Please help me!');

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(screen.getByRole('status')).toBeEmptyDOMElement();
  });

  it('throws when useToast is used outside ToastProvider', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() =>
      render(<ToastButton buttonName="Save" message="Save me" />),
    ).toThrow('useToast must be used inside ToastProvider');
  });
});
