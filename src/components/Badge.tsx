import type { HTMLAttributes, ReactNode } from 'react';

type BadgeVariant = 'neutral' | 'success' | 'warning' | 'danger' | 'brand' | 'dark';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  neutral: 'bg-neutral-100 text-neutral-800',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-amber-100 text-amber-800',
  danger: 'bg-red-100 text-red-700',
  /** Kuning brand — HANYA untuk hal terkait logo/brand. */
  brand: 'bg-brand text-black',
  /** Hitam tegas — untuk info yang harus menonjol (mis. kompensasi). */
  dark: 'bg-black text-white',
};

/**
 * Badge kecil rounded-full.
 */
export function Badge({ variant = 'neutral', className = '', children, ...rest }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide whitespace-nowrap',
        variantClasses[variant],
        className,
      ].join(' ')}
      {...rest}
    >
      {children}
    </span>
  );
}
