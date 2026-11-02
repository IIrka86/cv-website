import React, { FC } from 'react';
import styles from './Cluster.module.css';
import gapStyles from '@/styles/gap.module.css';
import { clsx } from 'clsx';
import type { Space } from '@/styles/tokens/space';

export interface ClusterProps extends React.HTMLAttributes<HTMLElement> {
  gap?: Space;
  as?: 'div' | 'ul' | 'ol';
}

export const Cluster: FC<ClusterProps> = ({
  gap,
  as: Tag = 'div',
  className,
  ...rest
}) => {
  const isList = Tag === 'ol' || Tag === 'ul';

  return (
    <Tag
      className={clsx(
        styles.cluster,
        gap && gapStyles[`gap-${gap}`],
        isList && styles.list,
        className,
      )}
      role={isList ? 'list' : undefined}
      {...rest}
    />
  );
};
