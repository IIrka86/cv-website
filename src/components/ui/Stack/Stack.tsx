import React, { FC } from 'react';
import styles from './Stack.module.css';
import gapStyles from '@/styles/gap.module.css';
import { clsx } from 'clsx';
import type { Space } from '@/styles/tokens/space';

export interface StackProps extends React.ComponentPropsWithoutRef<'div'> {
  gap?: Space;
}

export const Stack: FC<StackProps> = ({ gap, className, ...rest }) => {
  return (
    <div
      className={clsx(styles.stack, gap && gapStyles[`gap-${gap}`], className)}
      {...rest}
    />
  );
};
