import React, { FC } from 'react';
import styles from './Cluster.module.css';
import gapStyles from '@/styles/gap.module.css';
import { clsx } from 'clsx';
import type { Space } from '@/styles/tokens/space';

export interface ClusterProps extends React.ComponentPropsWithoutRef<'div'> {
  gap?: Space;
}

export const Cluster: FC<ClusterProps> = ({ gap, className, ...rest }) => {
  return (
    <div
      className={clsx(
        styles.cluster,
        gap && gapStyles[`gap-${gap}`],
        className,
      )}
      {...rest}
    />
  );
};
