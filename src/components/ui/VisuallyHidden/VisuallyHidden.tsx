import React, { FC } from 'react';
import { clsx } from 'clsx';
import styles from './VisuallyHidden.module.css';

export type VisuallyHiddenProps = React.ComponentPropsWithoutRef<'span'>;

/**
 * Text for screen readers only: removed from the layout and invisible,
 * but still part of the accessible name of its parent (a link, a button).
 * Unlike `display: none` or `aria-hidden`, assistive tech still reads it.
 *
 * Renders a space before the span: the name is built by gluing text pieces
 * together, so without it "GitHub" + "(opens…)" reads as "GitHub(opens…)".
 * The space can't live inside the span, each piece is trimmed first.
 * A leading space is harmless when the hidden text comes first.
 */
export const VisuallyHidden: FC<VisuallyHiddenProps> = ({
  className,
  ...rest
}) => (
  <>
    {' '}
    <span className={clsx(styles.visuallyHidden, className)} {...rest} />
  </>
);
