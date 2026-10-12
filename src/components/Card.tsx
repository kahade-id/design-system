import type { HTMLAttributes, ReactNode } from 'react';

export type CardVariant = 'outline' | 'muted' | 'elevated';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /**
   * `outline`  permukaan putih + hairline (default).
   * `muted`    permukaan mist tanpa garis — untuk kelompok konten sekunder.
   * `elevated` putih + bayangan lembut — hanya untuk lapisan di atas konten.
   */
  variant?: CardVariant;
  /** Bila true: umpan balik hover (untuk kartu yang seluruhnya bisa diklik). */
  interactive?: boolean;
}

const variantClasses: Record<CardVariant, string> = {
  outline: 'border border-line bg-surface',
  muted: 'bg-surface-2',
  elevated: 'border border-line bg-surface shadow-soft',
};

/**
 * Panel Kahade. Gunakan seperlunya — untuk daftar tujuan, pakai `IndexList`.
 */
export function Card({
  variant = 'outline',
  interactive = false,
  className = '',
  children,
  ...rest
}: CardProps) {
  return (
    <div
      className={[
        'not-prose rounded-panel p-6',
        variantClasses[variant],
        interactive &&
          'cursor-pointer transition-[border-color,box-shadow] duration-200 hover:border-line-strong hover:shadow-soft',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </div>
  );
}
