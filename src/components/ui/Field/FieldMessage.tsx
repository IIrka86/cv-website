import React, { FC } from 'react';
import { clsx } from 'clsx';
import styles from './Field.module.css';
import { Icon } from '@/components/ui/Icon';

export interface FieldMessageViewProps {
  id: string;
  hint?: string;
  error?: string;
}

export const FieldMessage: FC<FieldMessageViewProps> = ({
  id,
  hint,
  error,
}) => {
  const message = error ?? hint;

  if (!message) {
    return null;
  }

  return (
    <p id={id} className={clsx(styles.message, error && styles.error)}>
      {error && <Icon name="alert" size="sm" className={styles.icon} />}
      {message}
    </p>
  );
};
