import React, { FC } from 'react';
import styles from './Text.module.css';
import { clsx } from 'clsx';

export const TEXT_VARIANTS = [
  'body-lg',
  'body',
  'body-strong',
  'body-sm',
  'caption',
  'small',
  'mono-label',
  'mono-md',
  'mono-sm',
  'mono-xs',
] as const;

export const TEXT_TONES = ['primary', 'secondary', 'muted'] as const;

export type TextVariant = (typeof TEXT_VARIANTS)[number];
export type TextTone = (typeof TEXT_TONES)[number];

export interface TextProps extends React.ComponentPropsWithoutRef<'div'> {
  as?: 'p' | 'span' | 'div';
  variant?: TextVariant;
  tone?: TextTone;
}

export const Text: FC<TextProps> = ({
  as: Tag = 'p',
  variant = 'body',
  tone,
  className,
  ...rest
}) => {
  return (
    <Tag
      className={clsx(styles[variant], tone && styles[tone], className)}
      {...rest}
    />
  );
};
