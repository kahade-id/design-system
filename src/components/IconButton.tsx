"use client";

import { forwardRef, type ButtonHTMLAttributes } from 'react';
import type { Icon as PhosphorIcon } from '@phosphor-icons/react';
import { Icon } from '../icons/Icon';

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  icon: PhosphorIcon;
  /** Wajib: label aksesibel (tombol tanpa teks). */
  label: string;
  /** `outline` (default) garis tipis, `ghost` tanpa garis, `solid` hitam. */
  variant?: 'outline' | 'ghost' | 'solid';
  /** `md` 44px (default), `lg` 52px. */
  size?: 'md' | 'lg';
}

const variantCls = {
  outline: 'border border-line-strong bg-surface text-fg hover:border-fg',
  ghost: 'text-fg hover:bg-surface-2',
  solid: 'bg-fg text-fg-inverse hover:bg-fg-2',
} as const;

/**
 * Tombol ikon bulat, target sentuh ≥44px. Untuk bagikan, tutup, salin, dll.
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, label, variant = 'outline', size = 'md', className = '', type = 'button', ...rest }, ref) => (
    <button
      ref={ref}
      type={type}
      aria-label={label}
      title={label}
      className={[
        'inline-flex shrink-0 items-center justify-center rounded-full transition-colors duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        size === 'lg' ? 'h-[52px] w-[52px]' : 'h-11 w-11',
        variantCls[variant],
        className,
      ].join(' ')}
      {...rest}
    >
      <Icon icon={icon} size={size === 'lg' ? 22 : 20} />
    </button>
  ),
);
IconButton.displayName = 'IconButton';
