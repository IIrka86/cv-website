import React, { FC } from 'react';
import { clsx } from 'clsx';
import styles from './Checkbox.module.css';

export interface CheckboxProps extends Omit<
  React.ComponentProps<'input'>,
  'type' | 'children'
> {
  label: string;
  type?: 'checkbox' | 'radio';
}

export const Checkbox: FC<CheckboxProps> = ({
  label,
  type = 'checkbox',
  className,
  ...rest
}) => {
  return (
    <label className={clsx(styles.check, className)}>
      <input type={type} className={styles.input} {...rest} />
      <span>{label}</span>
    </label>
  );
};
