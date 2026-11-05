import { FC, ReactNode } from 'react';
import { clsx } from 'clsx';
import styles from './Tabs.module.css';
import type { TabsOrientation } from './Tabs';

export interface TabProps extends React.ComponentProps<'button'> {
  id: string;
  baseId: string;
  selected?: boolean;
  label: string;
  meta?: string;
  monogram?: ReactNode;
  orientation?: TabsOrientation;
  onSelectTab: (id: string) => void;
}

export const Tab: FC<TabProps> = ({
  ref,
  id,
  baseId,
  selected,
  label,
  meta,
  monogram,
  orientation,
  className,
  onSelectTab,
  ...rest
}) => {
  const tabId = `${baseId}-tab-${id}`;
  const panelId = `${baseId}-panel-${id}`;

  const handleClick = () => {
    onSelectTab(id);
  };

  return (
    <button
      id={tabId}
      ref={ref}
      type="button"
      role="tab"
      aria-selected={!!selected}
      aria-controls={panelId}
      tabIndex={selected ? 0 : -1}
      className={clsx(styles.tab, className)}
      onClick={handleClick}
      {...rest}
    >
      <span className={styles.tabContent}>
        {monogram}
        <span className={styles.tabStack}>
          <span className={styles.tabLabel}>{label}</span>
          {meta && <span className={styles.tabMeta}>{meta}</span>}
        </span>
      </span>
      {orientation === 'horizontal' && <span className={styles.barIn} />}
    </button>
  );
};
