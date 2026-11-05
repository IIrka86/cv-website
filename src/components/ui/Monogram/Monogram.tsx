import React, { FC } from 'react';
import styles from './Monogram.module.css';
import { clsx } from 'clsx';

export const MONOGRAM_SIZES = ['sm', 'md', 'lg'] as const;

export type MonogramSize = (typeof MONOGRAM_SIZES)[number];

export interface MonogramProps extends React.ComponentPropsWithoutRef<'span'> {
  size?: MonogramSize;
  muted?: boolean;
}

export const Monogram: FC<MonogramProps> = ({
  size = 'sm',
  muted,
  className,
  ...rest
}) => {
  return (
    <span
      className={clsx(
        styles.monogram,
        styles[`size-${size}`],
        muted && styles.muted,
        className,
      )}
      aria-hidden={true}
      {...rest}
    />
  );
};
