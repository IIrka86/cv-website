import 'server-only';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

export type Token = { name: string; value: string };

export type TokenSet = {
  palette: Token[];
  semantic: { light: Token[]; dark: Token[] };
  typography: Token[];
  layout: Token[];
  motion: Token[];
};

const TOKENS_DIR = path.join(process.cwd(), 'src', 'styles', 'tokens');

// /* ... */ including multi-line comments
const COMMENT = /\/\*[\s\S]*?\*\//g;
// --name: value;  (value may span several lines)
const DECLARATION = /(--[\w-]+)\s*:\s*([^;]+);/g;
const DARK_THEME_SELECTOR = "[data-theme='dark']";

async function readTokenFile(fileName: string): Promise<string> {
  const css = await readFile(path.join(TOKENS_DIR, fileName), 'utf8');
  return css.replace(COMMENT, '');
}

// Keeps the first declaration of each name, so overrides inside
// @media blocks (e.g. reduced motion) don't show up twice.
export function parseTokens(css: string): Token[] {
  const tokens = new Map<string, string>();

  for (const [, name, value] of css.matchAll(DECLARATION)) {
    if (name && value && !tokens.has(name)) {
      tokens.set(name, value.trim().replace(/\s+/g, ' '));
    }
  }

  return [...tokens].map(([name, value]) => ({ name, value }));
}

export async function getTokens(): Promise<TokenSet> {
  const [palette, semantic, typography, layout, motion] = await Promise.all(
    ['palette', 'semantic', 'typography', 'layout', 'motion'].map((file) =>
      readTokenFile(`${file}.css`),
    ),
  );

  const [light = '', dark = ''] = (semantic ?? '').split(DARK_THEME_SELECTOR);

  return {
    palette: parseTokens(palette ?? ''),
    semantic: { light: parseTokens(light), dark: parseTokens(dark) },
    typography: parseTokens(typography ?? ''),
    layout: parseTokens(layout ?? ''),
    motion: parseTokens(motion ?? ''),
  };
}
