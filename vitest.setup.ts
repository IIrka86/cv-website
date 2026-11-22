import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Testing Library unmounts automatically only with `globals: true`;
// with explicit imports a previous test's DOM would leak into the next one
afterEach(() => {
  cleanup();
});

// jsdom has no layout engine and doesn't implement scrollIntoView,
// which Tabs calls when a tab gets selected
Element.prototype.scrollIntoView = () => {};

// RTL's asyncWrapper only advances fake timers when a global `jest` exists;
// without it every userEvent call hangs under vi.useFakeTimers()
Object.assign(globalThis, {
  jest: { advanceTimersByTime: (ms: number) => vi.advanceTimersByTime(ms) },
});
