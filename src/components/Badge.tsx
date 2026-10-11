import type { HTMLAttributes, ReactNode } from 'react';

export type BadgeVariant =
  | 'neutral'
  | 'outline'
  | 'success'
  | 'warning'
  | 'danger'
  | 'brand'
  | 'dark';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  neutral: 'bg-surface-2 text-fg-2',
  outline: 'border border-line-strong text-fg-2',
  success: 'bg-positive-soft text-positive',
  warning: 'bg-caution-soft text-caution',
  danger: 'bg-critical-soft text-critical',
  /** Kuning brand — HANYA untuk hal terkait identitas brand. Hindari di UI. */
  brand: 'bg-brand text-black',
  /** Hitam tegas — untuk info yang harus menonjol. */
  dark: 'bg-fg text-fg-inverse',
};

/**
 * Label status kecil berbentuk pil (24px).
 */
export function Badge({ variant = 'neutral', className = '', children, ...rest }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex h-6 items-center gap-1 rounded-full px-2.5 text-caption font-semibold whitespace-nowrap',
        variantClasses[variant],
        className,
      ].join(' ')}
      {...rest}
    >
      {children}
    </span>
  );
}
