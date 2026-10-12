import type { ReactNode } from 'react';
import { Tray } from '@phosphor-icons/react/dist/ssr';
import type { Icon as PhosphorIcon } from '@phosphor-icons/react';
import { Icon } from '../icons/Icon';

export interface EmptyStateProps {
  icon?: PhosphorIcon;
  title: string;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
  /** Level heading judul (default h3). Pakai 1 untuk halaman 404 agar hierarki benar. */
  headingLevel?: 1 | 2 | 3;
  /** `center` (default) atau `start` (rata kiri, untuk halaman error). */
  align?: 'center' | 'start';
}

/**
 * Keadaan kosong yang jujur: ikon garis tipis, judul, penjelasan, satu aksi.
 */
export function EmptyState({
  icon = Tray,
  title,
  description,
  action,
  className = '',
  headingLevel = 3,
  align = 'center',
}: EmptyStateProps) {
  const Title = `h${headingLevel}` as 'h1' | 'h2' | 'h3';
  const center = align === 'center';
  return (
    <div className={`not-prose flex flex-col py-12 ${center ? 'items-center text-center' : 'items-start'} ${className}`}>
      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-fg-muted">
        <Icon icon={icon} size={22} />
      </span>
      <Title className={`mt-5 font-semibold text-fg ${headingLevel === 1 ? 'text-h3' : 'text-h4'}`}>
        {title}
      </Title>
      {description && (
        <p className="mt-2 max-w-sm text-small text-fg-muted">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
