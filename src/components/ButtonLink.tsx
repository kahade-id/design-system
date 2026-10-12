"use client";

import { forwardRef, type AnchorHTMLAttributes, type ElementType, type ReactNode } from 'react';
import type { Icon as PhosphorIcon } from '@phosphor-icons/react';
import { Icon } from '../icons/Icon';
import {
  buttonClasses,
  buttonIconSize,
  type ButtonSize,
  type ButtonVariant,
} from './buttonStyles';

export interface ButtonLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: PhosphorIcon;
  rightIcon?: PhosphorIcon;
  /** Komponen link (mis. `Link` dari next/link). Default `<a>`. */
  linkAs?: ElementType;
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
      linkAs: LinkTag = 'a',
      className = '',
      children,
      ...rest
    },
    ref,
  ) => {
    const iconSize = buttonIconSize(size);
    return (
      <LinkTag ref={ref} className={buttonClasses(variant, size, className)} {...rest}>
        {leftIcon && <Icon icon={leftIcon} size={iconSize} />}
        <span>{children}</span>
        {rightIcon && <Icon icon={rightIcon} size={iconSize} />}
      </LinkTag>
    );
  },
);
ButtonLink.displayName = 'ButtonLink';
