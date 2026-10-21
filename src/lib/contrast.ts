import type { Token, TokenSet } from '@/lib/tokens';

type Rgba = { rgb: [number, number, number]; alpha: number };

export type ContrastPair = {
  fg: string;
  bg: string;
  // What a semi-transparent bg is painted over
  base?: string;
  // 4.5 for normal text (WCAG 1.4.3), 3 for UI parts (WCAG 1.4.11)
  min: 4.5 | 3;
};

export type ContrastResult = ContrastPair & {
  theme: 'light' | 'dark';
  ratio: number;
  passes: boolean;
};

// Text/background pairs from the design's usage notes
const text = (fg: string, bg: string, base?: string): ContrastPair => ({
  fg,
  bg,
  base,
  min: 4.5,
});
const ui = (fg: string, bg: string): ContrastPair => ({ fg, bg, min: 3 });

const SURFACES = ['bg', 'surface', 'surface-sunken', 'band-exp', 'band-tint'];
const DARK_BANDS = [
  'band-dark',
  'band-dark-end',
  'marquee-bg',
  'contact-start',
  'contact-mid',
  'contact-end',
  'footer-bg',
];
// Bands behind Section tone="dark" and tone="contact"
const SECTION_DARK_BANDS = [
  'band-dark',
  'band-dark-end',
  'contact-start',
  'contact-mid',
  'contact-end',
];

export const CONTRAST_PAIRS: ContrastPair[] = [
  ...['text', 'text-secondary', 'text-muted', 'teal', 'error'].flatMap((fg) =>
    SURFACES.map((bg) => text(fg, bg)),
  ),
  text('text-muted', 'row-hover', 'bg'),
  text('text', 'header', 'bg'),
  text('accent', 'bg'),
  text('accent', 'surface'),
  text('on-accent', 'accent'),
  text('badge-text', 'badge-bg', 'bg'),
  text('chip-text', 'chip-bg', 'surface'),
  text('chip-text', 'chip-bg', 'band-exp'),
  text('info-text', 'info-bg', 'surface'),
  text('error', 'error-bg', 'surface'),
  text('tile-text', 'tile-start'),
  text('tile-text', 'tile-end'),
  ...['on-dark', 'on-dark-muted', 'mint'].flatMap((fg) =>
    DARK_BANDS.map((bg) => text(fg, bg)),
  ),
  text('on-mint', 'mint'),
  // Surfaces and chips that Section remaps on dark and contact bands
  ...SECTION_DARK_BANDS.flatMap((band) => [
    ...['on-dark', 'on-dark-muted', 'mint'].map((fg) =>
      text(fg, 'on-dark-surface', band),
    ),
    text('mint', 'on-dark-chip-bg', band),
  ]),
  ui('focus', 'bg'),
  ui('focus', 'surface'),
  ui('focus', 'band-exp'),
  ui('border-strong', 'bg'),
  ui('border-strong', 'surface'),
  ui('on-dark-border', 'band-dark'),
];

const VAR = /^var\((--[\w-]+)\)$/;
const MIX = /^color-mix\(in srgb, var\((--[\w-]+)\) (\d+)%, transparent\)$/;

function hexToRgb(hex: string): [number, number, number] {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return [r ?? 0, g ?? 0, b ?? 0];
}

// Follows var() chains down to a palette hex; supports the
// color-mix(<color> N%, transparent) form used for translucent tokens.
function resolve(
  value: string,
  theme: Map<string, string>,
  palette: Map<string, string>,
): Rgba {
  const mix = value.match(MIX);
  if (mix?.[1] && mix[2]) {
    return {
      ...resolve(`var(${mix[1]})`, theme, palette),
      alpha: +mix[2] / 100,
    };
  }

  const name = value.match(VAR)?.[1];
  const next = name && (palette.get(name) ?? theme.get(name));
  if (!next) throw new Error(`Cannot resolve color "${value}"`);

  return next.startsWith('#')
    ? { rgb: hexToRgb(next), alpha: 1 }
    : resolve(next, theme, palette);
}

// Alpha-blends a translucent color over an opaque one
function over(top: Rgba, bottom: Rgba): Rgba {
  const rgb = top.rgb.map(
    (c, i) => c * top.alpha + (bottom.rgb[i] ?? 0) * (1 - top.alpha),
  ) as Rgba['rgb'];
  return { rgb, alpha: 1 };
}

// WCAG relative luminance: undo the sRGB gamma curve, then weight
// channels by how bright each looks to the eye.
function luminance({ rgb }: Rgba): number {
  const [r = 0, g = 0, b = 0] = rgb.map((channel) => {
    const c = channel / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(a: Rgba, b: Rgba): number {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return ((light ?? 0) + 0.05) / ((dark ?? 0) + 0.05);
}

const toMap = (tokens: Token[]) =>
  new Map(tokens.map((token) => [token.name, token.value]));

export function checkContrast(tokens: TokenSet): ContrastResult[] {
  const palette = toMap(tokens.palette);
  const light = toMap(tokens.semantic.light);
  // Dark block only overrides; everything else comes from :root
  const dark = new Map([...light, ...toMap(tokens.semantic.dark)]);

  return (
    [
      ['light', light],
      ['dark', dark],
    ] as const
  ).flatMap(([theme, values]) =>
    CONTRAST_PAIRS.map((pair) => {
      const color = (name: string) =>
        resolve(`var(--color-${name})`, values, palette);

      let bg = color(pair.bg);
      if (bg.alpha < 1) bg = over(bg, color(pair.base ?? 'bg'));
      let fg = color(pair.fg);
      if (fg.alpha < 1) fg = over(fg, bg);

      const ratio = contrastRatio(fg, bg);
      return { ...pair, theme, ratio, passes: ratio >= pair.min };
    }),
  );
}
