import React, { FC } from 'react';
import { clsx } from 'clsx';
import type { ButtonSize, IconPosition } from '@/components/ui/Button';
import { ButtonContent, getButtonClassName } from '@/components/ui/Button';
import type { IconName } from '@/components/ui/Icon';
import { VisuallyHidden } from '@/components/ui/VisuallyHidden';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { isExternalHref, isInternalHref } from '@/lib/href';

export const BUTTON_LINK_VARIANTS = ['primary', 'ghost', 'icon'] as const;

export type ButtonLinkVariant = (typeof BUTTON_LINK_VARIANTS)[number];

type BaseButtonLinkProps = React.ComponentPropsWithoutRef<'a'> & {
  /**
   * Internal paths (`/…`) go through next-intl's Link, which adds the current
   * locale: pass `/projects`, not `/ru/projects`. Only for pages inside
   * `app/[locale]`; routes outside it (`/admin`, `/login`, `/dev`) would get
   * a locale prefix and 404. External URLs and `download` links render a plain `<a>`.
   */
  href: string;
  size?: ButtonSize;
};

type IconButtonLinkProps = BaseButtonLinkProps & {
  variant: 'icon';
  icon: IconName;
  'aria-label': string;
  children?: never;
  iconPosition?: never;
  size?: never;
};

type TextButtonLinkProps = BaseButtonLinkProps & {
  variant?: Exclude<ButtonLinkVariant, 'icon'>;
  icon?: IconName;
  iconPosition?: IconPosition;
};

export type ButtonLinkProps = IconButtonLinkProps | TextButtonLinkProps;

export const ButtonLink: FC<ButtonLinkProps> = ({
  href,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'end',
  download,
  rel,
  className,
  children,
  'aria-label': ariaLabel,
  ...rest
}) => {
  const t = useTranslations('Common');

  const renderButtonContent = () => (
    <ButtonContent
      variant={variant}
      size={size}
      icon={icon}
      iconPosition={iconPosition}
    >
      {children}
    </ButtonContent>
  );

  if (isInternalHref(href) && !download) {
    return (
      <Link
        href={href}
        className={getButtonClassName({ variant, size, className })}
        rel={rel}
        aria-label={ariaLabel}
        {...rest}
      >
        {renderButtonContent()}
      </Link>
    );
  }

  const isExternal = isExternalHref(href);
  const newTabHint = isExternal ? t('openInNewTab') : undefined;

  return (
    <a
      href={href}
      className={getButtonClassName({ variant, size, className })}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? clsx('noopener noreferrer', rel) : rel}
      download={download}
      aria-label={
        ariaLabel && newTabHint ? `${ariaLabel} ${newTabHint}` : ariaLabel
      }
      {...rest}
    >
      {renderButtonContent()}
      {newTabHint && !ariaLabel && (
        <VisuallyHidden>{newTabHint}</VisuallyHidden>
      )}
    </a>
  );
};
