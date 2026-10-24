import React, { FC } from 'react';
import { clsx } from 'clsx';
import type { ButtonSize, IconPosition } from '@/components/ui/Button';
import { ButtonContent, getButtonClassName } from '@/components/ui/Button';
import type { IconName } from '@/components/ui/Icon';
import Link from 'next/link';
import { isExternalHref, isInternalHref } from './href';

export const BUTTON_LINK_VARIANTS = ['primary', 'ghost', 'icon'] as const;

export type ButtonLinkVariant = (typeof BUTTON_LINK_VARIANTS)[number];

type BaseButtonLinkProps = React.ComponentPropsWithoutRef<'a'> & {
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
  ...rest
}) => {
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
        {...rest}
      >
        {renderButtonContent()}
      </Link>
    );
  }

  const isExternal = isExternalHref(href);

  return (
    <a
      href={href}
      className={getButtonClassName({ variant, size, className })}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? clsx('noopener noreferrer', rel) : rel}
      download={download}
      {...rest}
    >
      {renderButtonContent()}
    </a>
  );
};
