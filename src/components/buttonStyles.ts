/**
 * Gaya visual tombol Kahade — modul netral (bukan "use client") agar bisa
 * dipanggil dari Server Component maupun Client Component.
 * Dipakai Button, ButtonLink, SiteHeader, dan situs yang butuh tautan
 * bertampang tombol.
 */

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'danger'
  | 'inverse'
  | 'inverseSecondary';
export type ButtonSize = 'sm' | 'md' | 'lg';

/** Class visual Button — dipakai ulang oleh ButtonLink agar konsisten. */
export function buttonClasses(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  className = '',
): string {
  return [
    'inline-flex shrink-0 items-center justify-center rounded-full font-semibold whitespace-nowrap select-none',
    'transition-[background-color,border-color,color,box-shadow,transform] duration-150 ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    variant === 'inverse' || variant === 'inverseSecondary'
      ? 'focus-visible:ring-white focus-visible:ring-offset-black'
      : 'focus-visible:ring-fg',
    'active:scale-[0.98] disabled:active:scale-100 disabled:cursor-not-allowed aria-disabled:cursor-not-allowed',
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
    'bg-fg text-fg-inverse hover:bg-fg-2 disabled:bg-surface-3 disabled:text-fg-subtle',
  secondary:
    'bg-surface text-fg border border-line-strong hover:border-fg disabled:border-line disabled:text-fg-subtle disabled:hover:border-line',
  ghost:
    'bg-transparent text-fg hover:bg-surface-2 active:bg-surface-3 disabled:text-fg-subtle disabled:hover:bg-transparent',
  danger:
    'bg-critical text-white hover:bg-red-800 disabled:bg-surface-3 disabled:text-fg-subtle',
  /** Untuk permukaan hitam: tombol putih. */
  inverse:
    'bg-white text-black hover:bg-surface-3 disabled:bg-white/20 disabled:text-white/60',
  /** Untuk permukaan hitam: garis putih tipis. */
  inverseSecondary:
    'bg-transparent text-white border border-white/35 hover:border-white disabled:text-white/50',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-[14px] gap-1.5',
  md: 'h-11 px-5 text-[15px] gap-2',
  lg: 'h-[52px] px-7 text-base gap-2',
};

const iconSizes: Record<ButtonSize, number> = { sm: 16, md: 18, lg: 20 };
