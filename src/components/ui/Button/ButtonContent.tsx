import { Icon, type IconName } from '@/components/ui/Icon';
import React, { FC, PropsWithChildren } from 'react';
import type { ButtonSize, ButtonVariant, IconPosition } from './Button';

interface ButtonContentProps extends PropsWithChildren {
  variant?: ButtonVariant;
  icon?: IconName;
  iconPosition?: IconPosition;
  size?: ButtonSize;
}

export const ButtonContent: FC<ButtonContentProps> = ({
  variant,
  size,
  icon,
  iconPosition,
  children,
}) => {
  return (
    <>
      {icon && iconPosition === 'start' && (
        <Icon name={icon} size={size === 'sm' ? 'sm' : 'md'} />
      )}
      {variant !== 'icon' && children}
      {icon && iconPosition === 'end' && (
        <Icon name={icon} size={size === 'sm' ? 'sm' : 'md'} />
      )}
    </>
  );
};
