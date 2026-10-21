// Steps of the --space-* scale in layout.css. Keep three places in sync:
// - here: a missing step can't be used as a prop;
// - layout.css: a missing --space-N resolves to nothing;
// - src/styles/gap.module.css: a missing .gap-N class is silently dropped,
//   types don't catch it because CSS module keys are typed as string.

export const SPACE_SCALE = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 24, 28] as const;

export type Space = (typeof SPACE_SCALE)[number];
