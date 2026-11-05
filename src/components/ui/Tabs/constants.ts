// Kept out of Tabs.tsx: a Server Component importing a value from a
// 'use client' module gets a client reference, not the array itself
export const TABS_ORIENTATIONS = ['horizontal', 'vertical'] as const;

export type TabsOrientation = (typeof TABS_ORIENTATIONS)[number];
