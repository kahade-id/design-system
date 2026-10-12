import type { ElementType, HTMLAttributes, ReactNode } from 'react';

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  /** Lebar maksimum konten. Default `page` (1200px). */
  size?: 'page' | 'narrow' | 'reading';
  as?: ElementType;
  children: ReactNode;
}

const sizeClasses = {
  page: 'max-w-[calc(var(--container-page)+2.5rem)] sm:max-w-[calc(var(--container-page)+4rem)]',
  narrow: 'max-w-[calc(var(--container-narrow)+2.5rem)] sm:max-w-[calc(var(--container-narrow)+4rem)]',
  reading: 'max-w-[calc(var(--container-reading)+2.5rem)] sm:max-w-[calc(var(--container-reading)+4rem)]',
} as const;

/**
 * Wadah horizontal standar: gutter 20px (mobile) / 32px (≥640px),
 * lebar konten maksimum 1200px. Semua halaman memakai ini agar tepi kiri
 * konten sejajar di seluruh ekosistem.
 */
export function Container({
  size = 'page',
  as: Tag = 'div',
  className = '',
  children,
  ...rest
}: ContainerProps) {
  return (
    <Tag
      className={`mx-auto w-full px-5 sm:px-8 ${sizeClasses[size]} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export type SectionTone = 'default' | 'muted' | 'inverse';
export type SectionSpacing = 'sm' | 'md' | 'lg' | 'none';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  tone?: SectionTone;
  /** Ritme vertikal. Default `md` (64 → 112px). */
  spacing?: SectionSpacing;
  /** Garis hairline di atas seksi. */
  divider?: boolean;
  /** Bungkus isi dengan Container. Default true. */
  contained?: boolean;
  containerSize?: ContainerProps['size'];
  as?: ElementType;
  children: ReactNode;
}

const toneClasses: Record<SectionTone, string> = {
  default: 'bg-surface text-fg',
  muted: 'bg-surface-2 text-fg',
  inverse: 'bg-surface-inverse text-fg-inverse',
};

const spacingClasses: Record<SectionSpacing, string> = {
  none: '',
  sm: 'py-12 sm:py-16',
  md: 'py-16 sm:py-20 lg:py-28',
  lg: 'py-20 sm:py-28 lg:py-36',
};

/**
 * Seksi halaman dengan ritme vertikal & tone permukaan standar.
 */
export function Section({
  tone = 'default',
  spacing = 'md',
  divider = false,
  contained = true,
  containerSize = 'page',
  as: Tag = 'section',
  className = '',
  children,
  ...rest
}: SectionProps) {
  return (
    <Tag
      className={[
        toneClasses[tone],
        spacingClasses[spacing],
        divider ? 'border-t border-line' : '',
        className,
      ].join(' ')}
      {...rest}
    >
      {contained ? <Container size={containerSize}>{children}</Container> : children}
    </Tag>
  );
}
