import type { HTMLAttributes, ReactNode } from 'react';

export interface EyebrowProps extends HTMLAttributes<HTMLParagraphElement> {
  /** Nomor urut seksi, mis. "01". Tampil redup dengan tabular-nums. */
  index?: string;
  /** Untuk permukaan gelap. */
  inverse?: boolean;
  children?: ReactNode;
}

/**
 * Label kecil di atas judul seksi. Bukan huruf kapital semua — kalimat biasa,
 * semibold 14px, dengan nomor urut opsional: "01 — Keamanan".
 */
export function Eyebrow({ index, inverse = false, className = '', children, ...rest }: EyebrowProps) {
  return (
    <p
      className={`flex items-center gap-3 text-eyebrow ${inverse ? 'text-white' : 'text-fg'} ${className}`}
      {...rest}
    >
      {index && (
        <>
          <span className={`tabular-nums ${inverse ? 'text-white/60' : 'text-fg-subtle'}`}>{index}</span>
          {children && (
            <span aria-hidden="true" className={`h-px w-6 ${inverse ? 'bg-white/30' : 'bg-line-strong'}`} />
          )}
        </>
      )}
      {children && <span>{children}</span>}
    </p>
  );
}
