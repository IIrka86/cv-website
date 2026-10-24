import React, { FC } from 'react';
import { type IconName } from '@/components/ui/Icon';
import { ButtonContent } from './ButtonContent';
import { getButtonClassName } from './getButtonClassName';

export const BUTTON_VARIANTS = ['primary', 'ghost', 'dashed', 'icon'] as const;
export const BUTTON_SIZES = ['sm', 'md', 'lg'] as const;
export const ICON_POSITIONS = ['start', 'end'] as const;

export type ButtonVariant = (typeof BUTTON_VARIANTS)[number];
export type ButtonSize = (typeof BUTTON_SIZES)[number];
export type IconPosition = (typeof ICON_POSITIONS)[number];

type BaseButtonProps = React.ComponentPropsWithoutRef<'button'> & {
  size?: ButtonSize;
};

type IconButtonProps = BaseButtonProps & {
  variant: 'icon';
  icon: IconName;
  'aria-label': string;
  children?: never;
  iconPosition?: never;
  size?: never;
};

type TextButtonProps = BaseButtonProps & {
  variant?: Exclude<ButtonVariant, 'icon'>;
  icon?: IconName;
  iconPosition?: IconPosition;
};

export type ButtonProps = IconButtonProps | TextButtonProps;

export const Button: FC<ButtonProps> = ({
  variant = 'primary',
  type = 'button',
  size = 'md',
  icon,
  iconPosition = 'end',
  className,
  children,
  ...rest
}) => {
  return (
    <button
      className={getButtonClassName({ variant, size, className })}
      type={type}
      {...rest}
    >
      <ButtonContent
        variant={variant}
        size={size}
        icon={icon}
        iconPosition={iconPosition}
      >
        {children}
      </ButtonContent>
    </button>
  );
};
