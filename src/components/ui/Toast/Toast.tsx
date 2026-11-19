import React, { FC } from 'react';
import { clsx } from 'clsx';
import styles from './Toast.module.css';
import { Icon } from '@/components/ui/Icon';

export type ToastProps = React.ComponentPropsWithoutRef<'div'>;

export const Toast: FC<ToastProps> = ({ className, children, ...rest }) => {
  return (
    <div className={clsx(styles.toast, className)} {...rest}>
      <span aria-hidden="true" className={styles.badge}>
        <Icon name="check" size="sm" strokeWidth={3} />
      </span>
      <span>{children}</span>
    </div>
  );
};
