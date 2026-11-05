import { FC, ReactNode } from 'react';
import { clsx } from 'clsx';
import styles from './Tabs.module.css';

export interface TabPanelProps extends React.ComponentProps<'div'> {
  id: string;
  baseId: string;
  selected?: boolean;
  children?: ReactNode;
}

export const TabPanel: FC<TabPanelProps> = ({
  ref,
  id,
  baseId,
  selected,
  className,
  children,
  ...rest
}) => {
  const tabId = `${baseId}-tab-${id}`;
  const panelId = `${baseId}-panel-${id}`;

  return (
    <div
      id={panelId}
      ref={ref}
      role="tabpanel"
      aria-labelledby={tabId}
      hidden={!selected}
      tabIndex={0}
      className={clsx(styles.tabPanel, className)}
      {...rest}
    >
      {children}
    </div>
  );
};
