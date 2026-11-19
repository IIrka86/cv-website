import React, { FC, useId } from 'react';
import { clsx } from 'clsx';
import styles from './RadioGroup.module.css';
import type { FieldMessageProps } from '@/components/ui/Field';
import {
  fieldLabelClassName,
  FieldMessage,
  fieldRequiredClassName,
} from '@/components/ui/Field';
import { Checkbox } from '@/components/ui/Checkbox';

export interface RadioOption {
  value: string;
  label: string;
}

export interface RadioGroupProps
  extends
    FieldMessageProps,
    Omit<React.ComponentPropsWithoutRef<'fieldset'>, 'children' | 'name'> {
  name: string;
  options: RadioOption[];
  defaultValue?: string;
  required?: boolean;
}

export const RadioGroup: FC<RadioGroupProps> = ({
  label,
  hint,
  error,
  name,
  options,
  defaultValue,
  required,
  className,
  ...rest
}) => {
  const messageId = `${useId()}-message`;
  const hasMessage = Boolean(error ?? hint);

  return (
    <fieldset
      className={clsx(styles.group, className)}
      aria-describedby={hasMessage ? messageId : undefined}
      {...rest}
    >
      <legend className={clsx(fieldLabelClassName, styles.legend)}>
        {label}
        {required && (
          <span aria-hidden="true" className={fieldRequiredClassName}>
            *
          </span>
        )}
      </legend>

      <div className={styles.options}>
        {options.map((option) => (
          <Checkbox
            key={option.value}
            type="radio"
            name={name}
            value={option.value}
            label={option.label}
            defaultChecked={option.value === defaultValue}
            required={required}
            aria-invalid={error ? true : undefined}
          />
        ))}
      </div>

      <FieldMessage id={messageId} hint={hint} error={error} />
    </fieldset>
  );
};
