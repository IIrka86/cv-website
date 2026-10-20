import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTokens } from '@/lib/tokens';
import {
  byPrefix,
  PaletteView,
  RadiusScale,
  SpaceScale,
  ThemePanels,
  TokenGroup,
  TypeScale,
  ValueList,
} from './_components/TokenViews';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Design tokens',
  robots: { index: false, follow: false },
};

// Dev-only page: `next build` runs with NODE_ENV=production,
// so it is prerendered as 404 and never shipped.
export default async function TokensPage() {
  if (process.env.NODE_ENV === 'production') notFound();

  const tokens = await getTokens();
  const otherLayout = tokens.layout.filter(
    (token) => !/^--(space|radius)-/.test(token.name),
  );

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Design tokens</h1>
      <p className={styles.intro}>
        Read from <code>src/styles/tokens/*.css</code> on every request, so new
        tokens show up here without code changes.
      </p>

      <TokenGroup title="Semantic colors and shadows">
        <div id="semantic">
          <ThemePanels
            light={tokens.semantic.light}
            dark={tokens.semantic.dark}
          />
        </div>
      </TokenGroup>

      <TokenGroup title="Palette (primitives)">
        <PaletteView tokens={tokens.palette} />
      </TokenGroup>

      <TokenGroup title="Typography">
        <TypeScale tokens={tokens.typography} />
      </TokenGroup>

      <TokenGroup title="Spacing">
        <SpaceScale tokens={byPrefix(tokens.layout, '--space-')} />
      </TokenGroup>

      <TokenGroup title="Radii">
        <RadiusScale tokens={byPrefix(tokens.layout, '--radius-')} />
      </TokenGroup>

      <TokenGroup title="Sizes, breakpoint, z-index, focus">
        <ValueList tokens={otherLayout} />
      </TokenGroup>

      <TokenGroup title="Motion">
        <ValueList tokens={tokens.motion} />
      </TokenGroup>
    </main>
  );
}
