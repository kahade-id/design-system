import type { ReactNode } from 'react';
import { Container } from './Container';
import { Eyebrow } from './Eyebrow';

export interface PageHeaderMeta {
  label: string;
  value: ReactNode;
}

export interface PageHeaderProps {
  title: ReactNode;
  /** Label kecil di atas judul. */
  eyebrow?: ReactNode;
  eyebrowIndex?: string;
  /** Paragraf pembuka (1–2 kalimat). */
  lede?: ReactNode;
  /** Slot di atas eyebrow — biasanya Breadcrumb atau tautan kembali. */
  breadcrumb?: ReactNode;
  /** Tombol/aksi di bawah lede. */
  actions?: ReactNode;
  /** Baris meta (mis. "Berlaku sejak", "Versi") — tampil sebagai strip berhairline. */
  meta?: PageHeaderMeta[];
  /** Konten kolom kanan di desktop (mis. kolom pencarian, ilustrasi produk). */
  aside?: ReactNode;
  /** `display` untuk beranda situs, `h1` untuk halaman dalam. */
  size?: 'display' | 'h1' | 'h2';
  /** Hairline di bawah header. Default true. */
  divider?: boolean;
  /** Lebar wadah — samakan dengan isi halaman. Default `page`. */
  containerSize?: 'page' | 'narrow' | 'reading';
  className?: string;
  children?: ReactNode;
}

const titleSize = {
  display: 'text-display',
  h1: 'text-h1',
  h2: 'text-h2',
} as const;

/**
 * Kepala halaman standar ekosistem: rata kiri, tipografi besar, lede,
 * aksi, dan strip meta. Satu-satunya pola pembuka halaman yang dipakai.
 */
export function PageHeader({
  title,
  eyebrow,
  eyebrowIndex,
  lede,
  breadcrumb,
  actions,
  meta,
  aside,
  size = 'h1',
  divider = true,
  containerSize = 'page',
  className = '',
  children,
}: PageHeaderProps) {
  const body = (
    <div className="min-w-0">
      {breadcrumb && <div className="mb-8 sm:mb-10">{breadcrumb}</div>}
      {eyebrow && (
        <Eyebrow index={eyebrowIndex} className="mb-5">
          {eyebrow}
        </Eyebrow>
      )}
      <h1 className={`${titleSize[size]} max-w-[18ch] text-fg`}>{title}</h1>
      {lede && (
        <p className="mt-5 max-w-[40rem] text-lead text-fg-muted sm:mt-6">{lede}</p>
      )}
      {actions && <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10">{actions}</div>}
      {children}
    </div>
  );

  return (
    <header className={`${divider ? 'border-b border-line' : ''} ${className}`}>
      <Container size={containerSize} className="pt-10 pb-12 sm:pt-14 sm:pb-16 lg:pt-20 lg:pb-20">
        {aside ? (
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-7">{body}</div>
            <div className="lg:col-span-5">{aside}</div>
          </div>
        ) : (
          body
        )}
        {meta && meta.length > 0 && (
          <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-line pt-6 sm:mt-14 sm:flex sm:flex-wrap sm:gap-x-12">
            {meta.map((m) => (
              <div key={m.label} className="min-w-0">
                <dt className="text-caption text-fg-subtle">{m.label}</dt>
                <dd className="mt-1 text-small font-semibold text-fg tabular-nums">{m.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </Container>
    </header>
  );
}
