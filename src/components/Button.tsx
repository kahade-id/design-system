"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import type { Icon as PhosphorIcon } from '@phosphor-icons/react';
import { CircleNotch } from '@phosphor-icons/react/dist/ssr';
import { Icon } from '../icons/Icon';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: PhosphorIcon;
  rightIcon?: PhosphorIcon;
  children: ReactNode;
}

/** Class visual Button — dipakai ulang oleh ButtonLink agar konsisten. */
export function buttonClasses(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  className = '',
): string {
  return [
    'inline-flex items-center justify-center rounded-full font-semibold',
    'transition-all duration-150 select-none',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2',
    'active:scale-[0.97] disabled:active:scale-100 disabled:cursor-not-allowed',
    variantClasses[variant],
    sizeClasses[size],
    className,
  ].join(' ');
}

export function buttonIconSize(size: ButtonSize): number {
  return iconSizes[size];
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-black text-white hover:bg-neutral-800 active:bg-black disabled:bg-neutral-300 disabled:text-neutral-500',
  secondary:
    'bg-white text-black border border-neutral-300 hover:border-black hover:shadow-soft active:bg-neutral-100 disabled:border-neutral-200 disabled:text-neutral-400 disabled:shadow-none',
  ghost:
    'bg-transparent text-black hover:bg-neutral-100 active:bg-neutral-200 disabled:text-neutral-400',
  danger:
    'bg-red-600 text-white hover:bg-red-700 active:bg-red-700 disabled:bg-neutral-300 disabled:text-neutral-500',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm gap-1.5',
  md: 'h-11 px-6 text-sm gap-2',
  lg: 'h-13 px-8 text-base gap-2',
};

const iconSizes: Record<ButtonSize, number> = { sm: 16, md: 18, lg: 20 };

/**
 * Tombol Kahade. Gaya Apple-clean, monokrom.
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
            size={iconSizes[size]}
            className="animate-spin"
            aria-label="Memuat"
          />
        ) : (
          leftIcon && <Icon icon={leftIcon} size={iconSizes[size]} />
        )}
        <span>{children}</span>
        {!loading && rightIcon && (
          <Icon icon={rightIcon} size={iconSizes[size]} />
        )}
      </button>
    );
  },
);
Button.displayName = 'Button';
