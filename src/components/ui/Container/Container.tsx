import React, { FC } from 'react';
import styles from './Container.module.css';
import { clsx } from 'clsx';

export type ContainerProps = React.ComponentPropsWithoutRef<'div'>;

export const Container: FC<ContainerProps> = ({ className, ...rest }) => {
  return <div className={clsx(styles.container, className)} {...rest} />;
};
