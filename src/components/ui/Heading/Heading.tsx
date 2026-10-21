import React, { FC } from 'react';
import styles from './Heading.module.css';
import { clsx } from 'clsx';

export const HEADING_VARIANTS = [
  'heading-xs',
  'heading-sm',
  'heading-md',
  'heading-lg',
  'heading-xl',
  'display-lg',
  'display-xl',
] as const;

export type HeadingVariant = (typeof HEADING_VARIANTS)[number];

export interface HeadingProps extends React.ComponentPropsWithoutRef<'h1'> {
  as: 'h1' | 'h2' | 'h3' | 'h4';
  variant?: HeadingVariant;
}

export const Heading: FC<HeadingProps> = ({
  as: Tag,
  variant = 'heading-md',
  className,
  ...rest
}) => {
  return <Tag className={clsx(styles[variant], className)} {...rest} />;
};
