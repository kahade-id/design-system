"use client";

import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from 'react';
import type { Icon as PhosphorIcon } from '@phosphor-icons/react';
import { Icon } from '../icons/Icon';
import {
  buttonClasses,
  buttonIconSize,
  type ButtonSize,
  type ButtonVariant,
} from './Button';

export interface ButtonLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: PhosphorIcon;
  rightIcon?: PhosphorIcon;
  children: ReactNode;
}

/**
 * Link dengan visual tombol Kahade.
 *
 * `<button>` di dalam `<a>` adalah HTML invalid — untuk navigasi yang
 * tampil seperti tombol, pakai komponen ini (me-render `<a>`).
 * Class visual dishare dengan `Button` sehingga selalu konsisten.
 */
export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      leftIcon,
      rightIcon,
      className = '',
      children,
      ...rest
    },
    ref,
  ) => {
    const iconSize = buttonIconSize(size);
    return (
      <a ref={ref} className={buttonClasses(variant, size, className)} {...rest}>
        {leftIcon && <Icon icon={leftIcon} size={iconSize} />}
        <span>{children}</span>
        {rightIcon && <Icon icon={rightIcon} size={iconSize} />}
      </a>
    );
  },
);
ButtonLink.displayName = 'ButtonLink';
