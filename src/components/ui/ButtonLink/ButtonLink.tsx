import React, { FC } from 'react';
import type { ButtonSize, IconPosition } from '@/components/ui/Button';
import { ButtonContent, getButtonClassName } from '@/components/ui/Button';
import type { IconName } from '@/components/ui/Icon';
import Link from 'next/link';

export const BUTTON_LINK_VARIANTS = ['primary', 'ghost', 'icon'] as const;

export type ButtonLinkVariant = (typeof BUTTON_LINK_VARIANTS)[number];

export interface BaseButtonLinkProps extends React.ComponentPropsWithoutRef<'a'> {
  href: string;
  size?: ButtonSize;
}

// Icon-only button: no visible text, so the icon and the accessible name
// are required.
type IconButtonLinkProps = BaseButtonLinkProps & {
  variant: 'icon';
  icon: IconName;
  'aria-label': string;
  children?: never;
  iconPosition?: never;
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

  if (href?.startsWith('/') && !download) {
    return (
      <Link
        href={href}
        className={getButtonClassName({ variant, size, className })}
        {...rest}
      >
        {renderButtonContent()}
      </Link>
    );
  }

  const isExternal = href.startsWith('https://') || href.startsWith('http://');

  return (
    <a
      href={href}
      className={getButtonClassName({ variant, size, className })}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      download={download}
      {...rest}
    >
      {renderButtonContent()}
    </a>
  );
};
