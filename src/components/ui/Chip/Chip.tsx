import React, { FC } from 'react';
import styles from './Chip.module.css';
import { clsx } from 'clsx';

export const CHIP_VARIANTS = ['default', 'outline'] as const;

export type ChipVariant = (typeof CHIP_VARIANTS)[number];

export interface ChipProps extends React.ComponentPropsWithoutRef<'span'> {
  variant?: ChipVariant;
}

export const Chip: FC<ChipProps> = ({
  variant = 'default',
  className,
  ...rest
}) => {
  return (
    <span className={clsx(styles.chip, styles[variant], className)} {...rest} />
  );
};
