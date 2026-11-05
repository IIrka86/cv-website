'use client';

import React, { FC, KeyboardEventHandler, useId, useRef } from 'react';
import styles from './Tabs.module.css';
import { clsx } from 'clsx';
import { Tab } from './Tab';
import { TabPanel } from './TabPanel';
import type { TabsOrientation } from './constants';

export interface TabItem {
  id: string;
  label: string;
  meta?: string;
  monogram?: React.ReactNode;
  content?: React.ReactNode;
}

const ARROW_STEPS: Record<TabsOrientation, Record<string, number>> = {
  horizontal: { ArrowRight: 1, ArrowLeft: -1 },
  vertical: { ArrowDown: 1, ArrowUp: -1 },
};

export interface TabsProps extends React.ComponentPropsWithoutRef<'div'> {
  labelledBy: string;
  tabs: TabItem[];
  orientation?: TabsOrientation;
  defaultValue?: string;
}

export const Tabs: FC<TabsProps> = ({
  labelledBy,
  tabs,
  defaultValue,
  orientation = 'horizontal',
  className,
  ...rest
}) => {
  const baseId = useId();
  const [selectedTabId, setSelectedTabId] = React.useState(defaultValue);
  const activeTabId = tabs.some((tab) => selectedTabId === tab.id)
    ? selectedTabId
    : tabs[0]?.id;

  const tabRefs = useRef(new Map<string, HTMLButtonElement>());

  const selectTab = (id: string) => {
    setSelectedTabId(id);
    tabRefs.current
      .get(id)
      ?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  };

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;

    let next;

    if (event.key === 'Home') {
      next = tabs[0];
    }

    if (event.key === 'End') {
      next = tabs[tabs.length - 1];
    }

    const step = ARROW_STEPS[orientation][event.key];

    if (step !== undefined) {
      const index = tabs.findIndex((tab) => tab.id === activeTabId);
      next = tabs[(index + step + tabs.length) % tabs.length];
    }

    if (!next) return;

    event.preventDefault();
    selectTab(next.id);
    tabRefs.current.get(next.id)?.focus({ preventScroll: true });
  };

  return (
    <div
      className={clsx(
        styles.wrapper,
        orientation === 'vertical' && styles.wrapperVertical,
        className,
      )}
      {...rest}
    >
      <div
        className={styles.tabs}
        role="tablist"
        aria-labelledby={labelledBy}
        aria-orientation={orientation}
        onKeyDown={handleKeyDown}
      >
        {tabs.map((tab) => (
          <Tab
            ref={(node) => {
              if (!node) return;
              tabRefs.current.set(tab.id, node);
              return () => {
                tabRefs.current.delete(tab.id);
              };
            }}
            id={tab.id}
            key={tab.id}
            baseId={baseId}
            label={tab.label}
            meta={tab.meta}
            monogram={tab.monogram}
            orientation={orientation}
            selected={activeTabId === tab.id}
            onSelectTab={selectTab}
          />
        ))}
      </div>

      {tabs.map((tab) => (
        <TabPanel
          id={tab.id}
          key={tab.id}
          baseId={baseId}
          selected={activeTabId === tab.id}
        >
          {tab.content}
        </TabPanel>
      ))}
    </div>
  );
};
