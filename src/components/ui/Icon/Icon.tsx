import React, { FC } from 'react';
import styles from './Icon.module.css';
import { clsx } from 'clsx';

import Alert from '@/components/ui/Icon/icons/Alert';
import ArrowLeft from '@/components/ui/Icon/icons/ArrowLeft';
import ArrowRight from '@/components/ui/Icon/icons/ArrowRight';
import Calendar from '@/components/ui/Icon/icons/Calendar';
import Check from '@/components/ui/Icon/icons/Check';
import ChevronRight from '@/components/ui/Icon/icons/ChevronRight';
import Code from '@/components/ui/Icon/icons/Code';
import Download from '@/components/ui/Icon/icons/Download';
import External from '@/components/ui/Icon/icons/External';
import Eye from '@/components/ui/Icon/icons/Eye';
import EyeOff from '@/components/ui/Icon/icons/EyeOff';
import Github from '@/components/ui/Icon/icons/Github';
import Globe from '@/components/ui/Icon/icons/Globe';
import Info from '@/components/ui/Icon/icons/Info';
import Linkedin from '@/components/ui/Icon/icons/Linkedin';
import Lock from '@/components/ui/Icon/icons/Lock';
import Logout from '@/components/ui/Icon/icons/Logout';
import Mail from '@/components/ui/Icon/icons/Mail';
import MapPin from '@/components/ui/Icon/icons/MapPin';
import Moon from '@/components/ui/Icon/icons/Moon';
import Plus from '@/components/ui/Icon/icons/Plus';
import Sun from '@/components/ui/Icon/icons/Sun';
import Trash from '@/components/ui/Icon/icons/Trash';

export const ICON_NAMES = [
  'alert',
  'arrow-left',
  'arrow-right',
  'calendar',
  'check',
  'chevron-right',
  'code',
  'download',
  'external',
  'eye',
  'eye-off',
  'github',
  'globe',
  'info',
  'linkedin',
  'lock',
  'logout',
  'mail',
  'map-pin',
  'moon',
  'plus',
  'sun',
  'trash',
] as const;

export const ICON_SIZES = ['sm', 'md', 'lg'] as const;

export type IconName = (typeof ICON_NAMES)[number];
export type IconSize = (typeof ICON_SIZES)[number];

export interface IconProps extends React.ComponentPropsWithoutRef<'svg'> {
  name: IconName;
  size?: IconSize;
  label?: string;
}

export const Icon: FC<IconProps> = ({
  name,
  label,
  size = 'lg',
  className,
  ...rest
}) => {
  const renderChild = () => {
    switch (name) {
      case 'alert':
        return <Alert />;
      case 'arrow-left':
        return <ArrowLeft />;
      case 'arrow-right':
        return <ArrowRight />;
      case 'calendar':
        return <Calendar />;
      case 'check':
        return <Check />;
      case 'chevron-right':
        return <ChevronRight />;
      case 'code':
        return <Code />;
      case 'download':
        return <Download />;
      case 'external':
        return <External />;
      case 'eye':
        return <Eye />;
      case 'eye-off':
        return <EyeOff />;
      case 'github':
        return <Github />;
      case 'globe':
        return <Globe />;
      case 'info':
        return <Info />;
      case 'linkedin':
        return <Linkedin />;
      case 'lock':
        return <Lock />;
      case 'logout':
        return <Logout />;
      case 'mail':
        return <Mail />;
      case 'map-pin':
        return <MapPin />;
      case 'moon':
        return <Moon />;
      case 'plus':
        return <Plus />;
      case 'sun':
        return <Sun />;
      case 'trash':
        return <Trash />;
      default:
        // Compile-time exhaustiveness check: if a name is added to ICON_NAMES
        // without a case above, name isn't narrowed to never here and tsc fails.
        name satisfies never;
        return null;
    }
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={label ? undefined : true}
      role={label ? 'img' : undefined}
      aria-label={label}
      className={clsx(styles.icon, styles[`size-${size}`], className)}
      {...rest}
    >
      {renderChild()}
    </svg>
  );
};
