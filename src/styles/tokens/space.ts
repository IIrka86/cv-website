// Steps of the --space-* scale in layout.css. Keep both lists in sync:
// a step missing here can't be used as a prop, a step missing there
// resolves to nothing.

export const SPACE_SCALE = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 24, 28] as const;

export type Space = (typeof SPACE_SCALE)[number];
