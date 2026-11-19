import React, { FC } from 'react';
import { clsx } from 'clsx';
import styles from './Switch.module.css';

export interface SwitchProps extends Omit<
  React.ComponentProps<'input'>,
  'type' | 'role' | 'children'
> {
  label: string;
  stateLabels?: { on: string; off: string };
}

export const Switch: FC<SwitchProps> = ({
  label,
  stateLabels,
  className,
  ...rest
}) => {
  return (
    <label className={clsx(styles.switch, className)}>
      <span className={styles.label}>{label}</span>

      <span className={styles.control}>
        {stateLabels && (
          <span aria-hidden="true" className={styles.state}>
            <span className={styles.on}>{stateLabels.on}</span>
            <span className={styles.off}>{stateLabels.off}</span>
          </span>
        )}
        <span className={styles.trackWrap}>
          <input
            type="checkbox"
            role="switch"
            className={styles.input}
            {...rest}
          />
          <span aria-hidden="true" className={styles.track}>
            <span className={styles.knob} />
          </span>
        </span>
      </span>
    </label>
  );
};
