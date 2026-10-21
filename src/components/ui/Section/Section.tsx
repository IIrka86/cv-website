import React, { FC } from 'react';
import styles from './Section.module.css';
import { clsx } from 'clsx';

export const SECTION_TONES = [
  'default',
  'hero',
  'exp',
  'tint',
  'dark',
  'contact',
] as const;

export type SectionTone = (typeof SECTION_TONES)[number];

export interface SectionProps extends React.ComponentPropsWithoutRef<'section'> {
  tone?: SectionTone;
  padding?: 'default' | 'none';
}

export const Section: FC<SectionProps> = ({
  tone = 'default',
  padding = 'default',
  className,
  ...rest
}) => {
  return (
    <section
      className={clsx(
        styles.section,
        styles[tone],
        padding === 'none' && styles.paddingNone,
        className,
      )}
      {...rest}
    />
  );
};
