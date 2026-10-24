import { clsx } from 'clsx';
import styles from './Button.module.css';
import type { ButtonSize, ButtonVariant } from './Button';

export const getButtonClassName = ({
  variant,
  size,
  className,
}: {
  variant: ButtonVariant;
  size: ButtonSize;
  className?: string;
}) => {
  return clsx(
    styles.button,
    styles[variant],
    variant !== 'icon' && styles[`size-${size}`],
    className,
  );
};
