import React, { FC } from 'react';
import { clsx } from 'clsx';
import styles from './Card.module.css';
import { VisuallyHidden } from '@/components/ui/VisuallyHidden';
import { Link } from '@/i18n/navigation';
import { isExternalHref, isInternalHref } from '@/lib/href';
import { useTranslations } from 'next-intl';

export interface CardLinkProps extends React.ComponentPropsWithoutRef<'a'> {
  /**
   * Internal paths (`/…`) go through next-intl's Link, which adds the current
   * locale: pass `/projects`, not `/ru/projects`. Only for pages inside
   * `app/[locale]`; routes outside it (`/admin`, `/login`, `/dev`) would get
   * a locale prefix and 404. External URLs render a plain `<a>`.
   */
  href: string;
}

export const CardLink: FC<CardLinkProps> = ({
  href,
  rel,
  className,
  children,
  'aria-label': ariaLabel,
  ...rest
}) => {
  const t = useTranslations('Common');
  const linkClassName = clsx(styles.cardLink, className);

  if (isInternalHref(href)) {
    return (
      <Link
        href={href}
        className={linkClassName}
        rel={rel}
        aria-label={ariaLabel}
        {...rest}
      >
        {children}
      </Link>
    );
  }

  const isExternal = isExternalHref(href);
  const newTabHint = isExternal ? t('openInNewTab') : undefined;

  return (
    <a
      href={href}
      className={linkClassName}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? clsx('noopener noreferrer', rel) : rel}
      aria-label={
        ariaLabel && newTabHint ? `${ariaLabel} ${newTabHint}` : ariaLabel
      }
      {...rest}
    >
      {children}
      {newTabHint && !ariaLabel && (
        <VisuallyHidden>{newTabHint}</VisuallyHidden>
      )}
    </a>
  );
};
