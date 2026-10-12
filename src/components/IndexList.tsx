import type { ElementType, ReactNode } from 'react';
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { Icon } from '../icons/Icon';

export interface IndexItem {
  title: ReactNode;
  href?: string;
  description?: ReactNode;
  /** Info kanan, mis. tanggal berlaku, lokasi, durasi baca. */
  meta?: ReactNode;
  /** Nomor urut, mis. "01". */
  index?: string;
  /** Konten di depan judul (mis. ikon kecil, avatar). */
  leading?: ReactNode;
  /** Tautan ke situs lain → ikon panah serong. */
  external?: boolean;
  key?: string;
}

export interface IndexListProps {
  items: IndexItem[];
  /** `md` judul 18px (daftar padat), `lg` judul 20–24px (indeks utama). */
  size?: 'md' | 'lg';
  /** Komponen link (mis. `Link` dari next/link). Default `<a>`. */
  linkAs?: ElementType;
  /** Elemen heading judul baris; default `h3`. Pakai `span` bila tak perlu outline. */
  titleAs?: 'h2' | 'h3' | 'h4' | 'span';
  className?: string;
  'aria-label'?: string;
}

/**
 * Daftar indeks berhairline — pengganti grid kartu ber-ikon.
 * Satu baris = satu tujuan. Seluruh baris bisa diklik; panah bergeser saat hover.
 */
export function IndexList({
  items,
  size = 'md',
  linkAs: LinkTag = 'a',
  titleAs: TitleTag = 'h3',
  className = '',
  'aria-label': ariaLabel,
}: IndexListProps) {
  const titleCls = size === 'lg' ? 'text-h3' : 'text-h4';
  const pad = size === 'lg' ? 'py-6 sm:py-8' : 'py-5 sm:py-6';

  return (
    <ul className={`not-prose border-t border-line ${className}`} aria-label={ariaLabel}>
      {items.map((item, i) => {
        const inner = (
          <>
            {item.index && (
              <span className="w-8 shrink-0 pt-[0.2em] text-small tabular-nums text-fg-subtle sm:w-12">
                {item.index}
              </span>
            )}
            {item.leading && <span className="shrink-0 pt-0.5">{item.leading}</span>}
            <div className="min-w-0 flex-1">
              <TitleTag
                className={`block ${titleCls} text-fg ${item.href ? 'decoration-1 underline-offset-[5px] group-hover:underline' : ''}`}
              >
                {item.title}
              </TitleTag>
              {item.description && (
                <p className="mt-1.5 max-w-[62ch] text-small text-fg-muted sm:text-body">
                  {item.description}
                </p>
              )}
              {item.meta && (
                <p className="mt-3 text-caption text-fg-subtle md:hidden">{item.meta}</p>
              )}
            </div>
            {item.meta && (
              <span className="hidden shrink-0 pt-[0.35em] text-caption whitespace-nowrap text-fg-subtle md:block">
                {item.meta}
              </span>
            )}
            {item.href && (
              <span className="shrink-0 pt-[0.2em] text-fg transition-transform duration-200 ease-out group-hover:translate-x-1">
                <Icon icon={item.external ? ArrowUpRight : ArrowRight} size={20} />
              </span>
            )}
          </>
        );
        const rowCls = `group flex items-start gap-4 sm:gap-8 ${pad}`;
        return (
          <li key={item.key ?? (item.href || i)} className="border-b border-line">
            {item.href ? (
              <LinkTag href={item.href} className={`${rowCls} rounded-tag`}>
                {inner}
              </LinkTag>
            ) : (
              <div className={rowCls}>{inner}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
