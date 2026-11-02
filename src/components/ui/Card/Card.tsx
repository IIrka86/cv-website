import React, { FC } from 'react';
import styles from './Card.module.css';
import { clsx } from 'clsx';

export const CARD_SURFACES = ['default', 'sunken'] as const;

export type CardSurface = (typeof CARD_SURFACES)[number];

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  surface?: CardSurface;
  as?: 'div' | 'article' | 'li';
  interactive?: boolean;
  selected?: boolean;
}

export const Card: FC<CardProps> = ({
  surface = 'default',
  as: Tag = 'div',
  interactive,
  selected,
  className,
  ...rest
}) => {
  return (
    <Tag
      className={clsx(
        styles.card,
        styles[surface],
        interactive && styles.interactive,
        selected && styles.selected,
        className,
      )}
      {...rest}
    />
  );
};
