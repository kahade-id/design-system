import type { ReactNode } from 'react';
import { Eyebrow } from './Eyebrow';

export interface SectionHeaderProps {
  title: ReactNode;
  eyebrow?: ReactNode;
  index?: string;
  description?: ReactNode;
  /** Aksi di sisi kanan/bawah (mis. TextLink "Lihat semua"). */
  action?: ReactNode;
  /**
   * `stack`  judul lalu deskripsi (default).
   * `split`  judul kiri, deskripsi + aksi kanan (desktop) — pola editorial.
   */
  layout?: 'stack' | 'split';
  /** Level heading. Default 2. */
  as?: 'h1' | 'h2' | 'h3';
  /** Ukuran visual judul. Default h2. */
  size?: 'h2' | 'h3';
  inverse?: boolean;
  /** id pada heading (untuk aria-labelledby / anchor). */
  id?: string;
  className?: string;
}

/**
 * Kepala seksi standar. Rata kiri. Dipakai di semua seksi halaman.
 */
export function SectionHeader({
  title,
  eyebrow,
  index,
  description,
  action,
  layout = 'stack',
  as: Heading = 'h2',
  size = 'h2',
  inverse = false,
  id,
  className = '',
}: SectionHeaderProps) {
  const titleCls = `${size === 'h2' ? 'text-h2' : 'text-h3'} ${inverse ? 'text-white' : 'text-fg'}`;
  const descCls = `text-body-lg ${inverse ? 'text-white/70' : 'text-fg-muted'}`;

  if (layout === 'split') {
    return (
      <div className={`grid gap-6 lg:grid-cols-12 lg:gap-12 ${className}`}>
        <div className="lg:col-span-6">
          {(eyebrow || index) && (
            <Eyebrow index={index} inverse={inverse} className="mb-5">
              {eyebrow}
            </Eyebrow>
          )}
          <Heading id={id} className={`${titleCls} max-w-[20ch]`}>{title}</Heading>
        </div>
        {(description || action) && (
          <div className="flex flex-col items-start gap-6 lg:col-span-5 lg:col-start-8 lg:justify-end">
            {description && <p className={descCls}>{description}</p>}
            {action}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      {(eyebrow || index) && (
        <Eyebrow index={index} inverse={inverse} className="mb-5">
          {eyebrow}
        </Eyebrow>
      )}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <Heading id={id} className={`${titleCls} max-w-[22ch]`}>{title}</Heading>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      {description && <p className={`mt-5 max-w-[40rem] ${descCls}`}>{description}</p>}
    </div>
  );
}
