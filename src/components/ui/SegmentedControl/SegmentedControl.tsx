import React, { FC } from 'react';
import { clsx } from 'clsx';
import Link from 'next/link';
import styles from './SegmentedControl.module.css';

export interface SegmentedOption {
  value: string;
  label: string;
  href: string;
  lang?: string;
}

export interface SegmentedControlProps extends Omit<
  React.ComponentPropsWithoutRef<'nav'>,
  'children'
> {
  label: string;
  options: SegmentedOption[];
  value: string;
}

export const SegmentedControl: FC<SegmentedControlProps> = ({
  label,
  options,
  value,
  className,
  ...rest
}) => {
  return (
    <nav
      aria-label={label}
      className={clsx(styles.segmented, className)}
      {...rest}
    >
      {options.map((option) => (
        <Link
          key={option.value}
          href={option.href}
          hrefLang={option.lang}
          lang={option.lang}
          aria-current={option.value === value ? 'page' : undefined}
          className={styles.option}
        >
          {option.label}
        </Link>
      ))}
    </nav>
  );
};
