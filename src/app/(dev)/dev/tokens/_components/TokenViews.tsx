import type { CSSProperties, ReactNode } from 'react';
import type { Token } from '@/lib/tokens';
import styles from './TokenViews.module.css';

export const byPrefix = (tokens: Token[], prefix: string) =>
  tokens.filter((token) => token.name.startsWith(prefix));

export function TokenGroup({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className={styles.group}>
      <h2 className={styles.groupTitle}>{title}</h2>
      {children}
    </section>
  );
}

function TokenLabel({ token, note }: { token: Token; note?: string }) {
  return (
    <span className={styles.label}>
      <code className={styles.name}>{token.name}</code>
      <code className={styles.value}>
        {token.value}
        {note && ` (${note})`}
      </code>
    </span>
  );
}

function Swatches({
  tokens,
  notes = {},
}: {
  tokens: Token[];
  notes?: Record<string, string>;
}) {
  return (
    <ul className={styles.swatches}>
      {tokens.map((token) => (
        <li key={token.name} className={styles.swatchItem}>
          <span
            className={styles.swatch}
            style={{ background: `var(${token.name})` }}
          />
          <TokenLabel token={token} note={notes[token.name]} />
        </li>
      ))}
    </ul>
  );
}

// --teal-50, --teal-60 ... grouped into one row per hue
export function PaletteView({ tokens }: { tokens: Token[] }) {
  const hues = Map.groupBy(tokens, (token) =>
    token.name.replace(/^--/, '').replace(/-\d+$/, ''),
  );

  return (
    <>
      {[...hues].map(([hue, hueTokens]) => (
        <div key={hue} className={styles.subgroup}>
          <h3 className={styles.subgroupTitle}>{hue}</h3>
          <Swatches tokens={hueTokens} />
        </div>
      ))}
    </>
  );
}

function ThemePanel({
  title,
  theme,
  tokens,
  notes,
}: {
  title: string;
  theme?: 'dark';
  tokens: Token[];
  notes?: Record<string, string>;
}) {
  return (
    <div className={styles.panel} data-theme={theme}>
      <h3 className={styles.subgroupTitle}>{title}</h3>
      <Swatches tokens={byPrefix(tokens, '--color-')} notes={notes} />

      <h4 className={styles.panelSubtitle}>Shadows</h4>
      <ul className={styles.shadows}>
        {byPrefix(tokens, '--shadow-').map((token) => (
          <li
            key={token.name}
            className={styles.shadowCard}
            style={{ boxShadow: `var(${token.name})` }}
          >
            <TokenLabel token={token} note={notes?.[token.name]} />
          </li>
        ))}
      </ul>

      <p className={styles.focusDemo}>
        <a href="#semantic">Focus me with Tab</a>
      </p>
    </div>
  );
}

// Light names drive both panels: a token missing from the dark block
// inherits its :root value, and is marked so on the dark side.
export function ThemePanels({
  light,
  dark,
}: {
  light: Token[];
  dark: Token[];
}) {
  const darkValues = new Map(dark.map((token) => [token.name, token.value]));
  const notes: Record<string, string> = {};
  const darkTokens = light.map((token) => {
    const value = darkValues.get(token.name);
    if (value === undefined) notes[token.name] = 'same as light';
    return { name: token.name, value: value ?? token.value };
  });

  return (
    <div className={styles.panels}>
      <ThemePanel title="Light" tokens={light} />
      <ThemePanel title="Dark" theme="dark" tokens={darkTokens} notes={notes} />
    </div>
  );
}

const fontFamilyFor = (style: string) => {
  if (style.startsWith('mono')) return 'var(--font-mono)';
  if (/^(body|caption|small)/.test(style)) return 'var(--font-body)';
  return 'var(--font-heading)';
};

// --text-{style}-size/-leading/-weight/-tracking → one sample per style
export function TypeScale({ tokens }: { tokens: Token[] }) {
  const names = new Set(tokens.map((token) => token.name));
  const textStyles = tokens
    .map((token) => token.name.match(/^--text-(.+)-size$/)?.[1])
    .filter((style) => style !== undefined);

  return (
    <>
      <div className={styles.subgroup}>
        <h3 className={styles.subgroupTitle}>Families and weights</h3>
        <ValueList tokens={byPrefix(tokens, '--font-')} />
      </div>

      <div className={styles.subgroup}>
        <h3 className={styles.subgroupTitle}>Scale</h3>
        <ul className={styles.typeList}>
          {textStyles.map((style) => {
            const prefix = `--text-${style}`;
            const sample: CSSProperties = {
              fontFamily: fontFamilyFor(style),
              fontSize: `var(${prefix}-size)`,
              lineHeight: `var(${prefix}-leading)`,
              fontWeight: `var(${prefix}-weight)`,
              letterSpacing: names.has(`${prefix}-tracking`)
                ? `var(${prefix}-tracking)`
                : undefined,
            };

            return (
              <li key={style} className={styles.typeItem}>
                <code className={styles.name}>{style}</code>
                <p style={sample}>Iryna Kavaliova · Ирина Ковалёва</p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export function SpaceScale({ tokens }: { tokens: Token[] }) {
  return (
    <ul className={styles.bars}>
      {tokens.map((token) => (
        <li key={token.name} className={styles.barItem}>
          <span
            className={styles.bar}
            style={{ inlineSize: `var(${token.name})` }}
          />
          <TokenLabel token={token} />
        </li>
      ))}
    </ul>
  );
}

export function RadiusScale({ tokens }: { tokens: Token[] }) {
  return (
    <ul className={styles.radii}>
      {tokens.map((token) => (
        <li key={token.name} className={styles.radiusItem}>
          <span
            className={styles.radiusBox}
            style={{ borderRadius: `var(${token.name})` }}
          />
          <TokenLabel token={token} />
        </li>
      ))}
    </ul>
  );
}

export function ValueList({ tokens }: { tokens: Token[] }) {
  return (
    <dl className={styles.valueList}>
      {tokens.map((token) => (
        <div key={token.name} className={styles.valueRow}>
          <dt>
            <code className={styles.name}>{token.name}</code>
          </dt>
          <dd>
            <code className={styles.value}>{token.value}</code>
          </dd>
        </div>
      ))}
    </dl>
  );
}
