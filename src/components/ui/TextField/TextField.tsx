import React, { FC } from 'react';
import { clsx } from 'clsx';
import styles from './TextField.module.css';
import type { FieldMessageProps } from '@/components/ui/Field';
import { Field, fieldControlClassName } from '@/components/ui/Field';

export interface TextFieldProps
  extends
    FieldMessageProps,
    Omit<React.ComponentProps<'input'>, 'prefix' | 'children'> {
  prefix?: string;
}

export const TextField: FC<TextFieldProps> = ({
  label,
  hint,
  error,
  prefix,
  id,
  required,
  className,
  type = 'text',
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
      {({ labelId, controlProps }) => {
        const prefixId = `${controlProps.id}-prefix`;

        return (
          <span className={styles.wrap}>
            {prefix && (
              <span id={prefixId} aria-hidden="true" className={styles.prefix}>
                {prefix}
              </span>
            )}
            <input
              type={type}
              required={required}
              className={clsx(
                fieldControlClassName,
                prefix && styles.withPrefix,
              )}
              {...rest}
              {...controlProps}
              aria-labelledby={
                prefix ? `${labelId} ${prefixId}` : rest['aria-labelledby']
              }
            />
          </span>
        );
      }}
    </Field>
  );
};
