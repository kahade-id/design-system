"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import type { Icon as PhosphorIcon } from '@phosphor-icons/react';
import { CircleNotch } from '@phosphor-icons/react/dist/ssr';
import { Icon } from '../icons/Icon';
import { buttonClasses, buttonIconSize, type ButtonSize, type ButtonVariant } from './buttonStyles';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: PhosphorIcon;
  rightIcon?: PhosphorIcon;
  children: ReactNode;
}

/**
 * Tombol Kahade — pil, monokrom. Satu tombol `primary` per area pandang.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      leftIcon,
      rightIcon,
      disabled,
      className = '',
      children,
      type = 'button',
      ...rest
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;
    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        className={buttonClasses(variant, size, className)}
        {...rest}
      >
        {loading ? (
          <Icon
            icon={CircleNotch}
            size={buttonIconSize(size)}
            className="animate-spin"
            aria-label="Memuat"
          />
        ) : (
          leftIcon && <Icon icon={leftIcon} size={buttonIconSize(size)} />
        )}
        <span>{children}</span>
        {!loading && rightIcon && (
          <Icon icon={rightIcon} size={buttonIconSize(size)} />
        )}
      </button>
    );
  },
);
Button.displayName = 'Button';
