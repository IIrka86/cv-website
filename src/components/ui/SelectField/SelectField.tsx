import React, { FC } from 'react';
import { clsx } from 'clsx';
import styles from './SelectField.module.css';
import type { FieldMessageProps } from '@/components/ui/Field';
import { Field, fieldControlClassName } from '@/components/ui/Field';
import { Icon } from '@/components/ui/Icon';

export type SelectOption = string | { value: string; label: string };

export interface SelectFieldProps
  extends
    FieldMessageProps,
    Omit<React.ComponentProps<'select'>, 'children' | 'multiple'> {
  options: SelectOption[];
  placeholder?: string;
}

const toOption = (option: SelectOption) =>
  typeof option === 'string' ? { value: option, label: option } : option;

export const SelectField: FC<SelectFieldProps> = ({
  label,
  hint,
  error,
  options,
  placeholder,
  id,
  required,
  className,
  defaultValue,
  ...rest
}) => {
  return (
    <Field
      label={label}
      hint={hint}
      error={error}
      id={id}
      required={required}
      className={className}
    >
      {({ controlProps }) => (
        <span className={styles.wrap}>
          <select
            required={required}
            className={clsx(fieldControlClassName, styles.select)}
            // Without a value the browser selects the first enabled option,
            // skipping the disabled placeholder, so start on '' explicitly
            defaultValue={
              placeholder && rest.value === undefined
                ? (defaultValue ?? '')
                : defaultValue
            }
            {...rest}
            {...controlProps}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map(toOption).map(({ value, label: optionLabel }) => (
              <option key={value} value={value}>
                {optionLabel}
              </option>
            ))}
          </select>
          <Icon name="chevron-right" size="sm" className={styles.chevron} />
        </span>
      )}
    </Field>
  );
};
