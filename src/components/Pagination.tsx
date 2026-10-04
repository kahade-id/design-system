import { CaretLeft, CaretRight } from '@phosphor-icons/react';
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
  const items = pageRange(page, totalPages, siblingCount);

  const navBtn =
    'flex h-9 w-9 items-center justify-center rounded-full text-black transition-colors hover:bg-neutral-100 disabled:text-neutral-300 disabled:hover:bg-transparent disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black';

  return (
    <nav aria-label="Navigasi halaman" className={`flex items-center gap-1 ${className}`}>
      <button
        type="button"
        aria-label="Halaman sebelumnya"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className={navBtn}
      >
        <Icon icon={CaretLeft} size={18} />
      </button>
      {items.map((item, i) =>
        item === '…' ? (
          <span key={`e${i}`} className="px-1 text-sm text-neutral-400">
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            aria-label={`Halaman ${item}`}
            aria-current={item === page ? 'page' : undefined}
            onClick={() => onChange(item)}
            className={[
              'h-9 min-w-9 rounded-full px-2 text-sm font-semibold transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black',
              item === page ? 'bg-black text-white' : 'text-black hover:bg-neutral-100',
            ].join(' ')}
          >
            {item}
          </button>
        ),
      )}
      <button
        type="button"
        aria-label="Halaman berikutnya"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
        className={navBtn}
      >
        <Icon icon={CaretRight} size={18} />
      </button>
    </nav>
  );
}
