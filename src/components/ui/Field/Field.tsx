import React, { FC, useId } from 'react';
import { clsx } from 'clsx';
import styles from './Field.module.css';
import { FieldMessage } from './FieldMessage';

export interface FieldMessageProps {
  label: string;
  hint?: string;
  error?: string;
}

export interface FieldControl {
  labelId: string;
  controlProps: {
    id: string;
    'aria-describedby'?: string;
    'aria-invalid'?: true;
  };
}

export interface FieldProps
  extends
    FieldMessageProps,
    Omit<React.ComponentPropsWithoutRef<'div'>, 'id' | 'children'> {
  id?: string;
  required?: boolean;
  children: (control: FieldControl) => React.ReactNode;
}

export const fieldControlClassName = styles.control;
export const fieldLabelClassName = styles.label;
export const fieldRequiredClassName = styles.required;

export const Field: FC<FieldProps> = ({
  label,
  hint,
  error,
  id,
  required,
  className,
  children,
  ...rest
}) => {
  const generatedId = useId();
  const controlId = id ?? generatedId;
  const labelId = `${controlId}-label`;
  const messageId = `${controlId}-message`;
  const hasMessage = Boolean(error ?? hint);

  return (
    <div className={clsx(styles.field, className)} {...rest}>
      <label id={labelId} htmlFor={controlId} className={styles.label}>
        {label}
        {required && (
          <span aria-hidden="true" className={styles.required}>
            *
          </span>
        )}
      </label>

      {children({
        labelId,
        controlProps: {
          id: controlId,
          'aria-describedby': hasMessage ? messageId : undefined,
          'aria-invalid': error ? true : undefined,
        },
      })}

      <FieldMessage id={messageId} hint={hint} error={error} />
    </div>
  );
};
