import type { ContrastResult } from '@/lib/contrast';
import styles from './ContrastTable.module.css';

function ThemeTable({
  title,
  theme,
  results,
}: {
  title: string;
  theme?: 'dark';
  results: ContrastResult[];
}) {
  const failures = results.filter((result) => !result.passes).length;

  return (
    <div className={styles.panel} data-theme={theme}>
      <h3 className={styles.title}>
        {title}: {failures === 0 ? 'all pass' : `${failures} below minimum`}
      </h3>
      <div className={styles.scroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Sample</th>
              <th scope="col">Foreground</th>
              <th scope="col">Background</th>
              <th scope="col">Ratio</th>
              <th scope="col">Min</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr
                key={`${result.fg}/${result.bg}/${result.base}`}
                className={result.passes ? undefined : styles.fail}
              >
                <td>
                  {/* Base layer shows through translucent backgrounds */}
                  <span
                    className={styles.sampleBase}
                    style={{
                      background: `var(--color-${result.base ?? 'bg'})`,
                    }}
                  >
                    <span
                      className={styles.sample}
                      style={{
                        color: `var(--color-${result.fg})`,
                        background: `var(--color-${result.bg})`,
                      }}
                    >
                      Aa
                    </span>
                  </span>
                </td>
                <td>
                  <code>{result.fg}</code>
                </td>
                <td>
                  <code>
                    {result.bg}
                    {result.base && ` over ${result.base}`}
                  </code>
                </td>
                <td>
                  {result.ratio.toFixed(2)}
                  {!result.passes && ' ✕'}
                </td>
                <td>
                  {result.min}
                  {result.min === 3 && ' (UI)'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function ContrastTable({ results }: { results: ContrastResult[] }) {
  return (
    <div className={styles.panels}>
      <ThemeTable
        title="Light"
        results={results.filter((result) => result.theme === 'light')}
      />
      <ThemeTable
        title="Dark"
        theme="dark"
        results={results.filter((result) => result.theme === 'dark')}
      />
    </div>
  );
}
