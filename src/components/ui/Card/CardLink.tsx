import React, { FC } from 'react';
import { clsx } from 'clsx';
import styles from './Card.module.css';
import Link from 'next/link';

export interface CardLinkProps extends React.ComponentPropsWithoutRef<'a'> {
  href: string;
}

export const CardLink: FC<CardLinkProps> = ({ className, ...rest }) => {
  return <Link className={clsx(styles.cardLink, className)} {...rest} />;
};
