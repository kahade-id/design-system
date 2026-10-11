"use client";

import { CaretLeft, CaretRight } from '@phosphor-icons/react/dist/ssr';
import { Icon } from '../icons/Icon';

export interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  className?: string;
  /** Jumlah nomor halaman yang tampil di sekitar halaman aktif */
  siblingCount?: number;
}

function pageRange(page: number, totalPages: number, siblingCount: number): (number | '…')[] {
  const pages = new Set<number>([1, totalPages, page]);
  for (let i = 1; i <= siblingCount; i++) {
    if (page - i >= 1) pages.add(page - i);
    if (page + i <= totalPages) pages.add(page + i);
  }
  const sorted = [...pages].sort((a, b) => a - b);
  const out: (number | '…')[] = [];
  let prev = 0;
  for (const p of sorted) {
    if (p - prev > 1) out.push('…');
    out.push(p);
    prev = p;
  }
  return out;
}

/**
 * Pagination: prev/next + nomor halaman.
 */
export function Pagination({
  page,
  totalPages,
  onChange,
  className = '',
  siblingCount = 1,
}: PaginationProps) {
  if (totalPages <= 1) return null;
  // Jepit ke rentang valid agar tidak merender tombol halaman yang tak ada.
  const safePage = Math.min(Math.max(1, page), totalPages);
  const items = pageRange(safePage, totalPages, siblingCount);

  const navBtn =
    'flex h-10 w-10 items-center justify-center rounded-full text-fg transition-colors hover:bg-surface-2 disabled:text-line-strong disabled:hover:bg-transparent disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg';

  return (
    <nav aria-label="Navigasi halaman" className={`flex items-center gap-1 ${className}`}>
      <button
        type="button"
        aria-label="Halaman sebelumnya"
        disabled={safePage <= 1}
        onClick={() => onChange(safePage - 1)}
        className={navBtn}
      >
        <Icon icon={CaretLeft} size={18} />
      </button>
      {items.map((item, i) =>
        item === '…' ? (
          <span key={`e${i}`} className="px-1 text-small text-fg-subtle">
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            aria-label={`Halaman ${item}`}
            aria-current={item === safePage ? 'page' : undefined}
            onClick={() => onChange(item)}
            className={[
              'h-10 min-w-10 rounded-full px-2 text-small font-semibold tabular-nums transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg',
              item === safePage ? 'bg-fg text-fg-inverse' : 'text-fg hover:bg-surface-2',
            ].join(' ')}
          >
            {item}
          </button>
        ),
      )}
      <button
        type="button"
        aria-label="Halaman berikutnya"
        disabled={safePage >= totalPages}
        onClick={() => onChange(safePage + 1)}
        className={navBtn}
      >
        <Icon icon={CaretRight} size={18} />
      </button>
    </nav>
  );
}
