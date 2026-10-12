import type { ReactNode } from 'react';

export interface DescriptionItem {
  term: ReactNode;
  detail: ReactNode;
  key?: string;
}

export interface DescriptionListProps {
  items: DescriptionItem[];
  /** `inline` term kiri / detail kanan (≥640px). `stacked` term di atas detail. */
  layout?: 'inline' | 'stacked';
  className?: string;
}

/**
 * Pasangan istilah–keterangan berhairline. Untuk biaya, fakta perusahaan,
 * detail lowongan, ringkasan dokumen.
 */
export function DescriptionList({ items, layout = 'inline', className = '' }: DescriptionListProps) {
  return (
    <dl className={`not-prose border-t border-line ${className}`}>
      {items.map((item, i) => (
        <div
          key={item.key ?? i}
          className={
            layout === 'inline'
              ? 'grid gap-1 border-b border-line py-4 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-8 sm:py-5'
              : 'border-b border-line py-4 sm:py-5'
          }
        >
          <dt className="text-small font-semibold text-fg">{item.term}</dt>
          <dd className={`text-small text-fg-muted sm:text-body ${layout === 'stacked' ? 'mt-1' : ''}`}>
            {item.detail}
          </dd>
        </div>
      ))}
    </dl>
  );
}
