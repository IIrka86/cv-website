import React, { FC } from 'react';
import styles from './Badge.module.css';
import { clsx } from 'clsx';

export const BADGE_TONES = ['status', 'duration', 'info'] as const;

export type BadgeTone = (typeof BADGE_TONES)[number];

export interface BadgeProps extends React.ComponentPropsWithoutRef<'span'> {
  tone?: BadgeTone;
  dot?: boolean;
  pulse?: boolean;
}

export const Badge: FC<BadgeProps> = ({
  tone = 'status',
  dot,
  pulse,
  className,
  children,
  ...rest
}) => {
  return (
    <span className={clsx(styles.badge, styles[tone], className)} {...rest}>
      {(dot || pulse) && (
        <span
          aria-hidden="true"
          className={clsx(styles.dot, pulse && styles.pulse)}
        />
      )}
      {children}
    </span>
  );
};
