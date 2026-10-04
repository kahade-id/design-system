import type { ReactNode } from 'react';
import { Tray } from '@phosphor-icons/react/dist/ssr';
import type { Icon as PhosphorIcon } from '@phosphor-icons/react';
import { Icon } from '../icons/Icon';

export interface EmptyStateProps {
  icon?: PhosphorIcon;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
  /** Level heading judul (default h3). Pakai 1 untuk halaman 404 agar hierarki benar. */
  headingLevel?: 1 | 2 | 3;
}

/**
 * Empty state: ikon besar netral, judul, deskripsi, slot aksi.
 */
export function EmptyState({
  icon = Tray,
  title,
  description,
  action,
  className = '',
  headingLevel = 3,
}: EmptyStateProps) {
  const Title = `h${headingLevel}` as 'h1' | 'h2' | 'h3';
  return (
    <div className={`flex flex-col items-center py-12 text-center ${className}`}>
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 text-neutral-300">
        <Icon icon={icon} size={32} />
      </span>
      <Title className="mt-4 text-base font-bold text-black">{title}</Title>
      {description && (
        <p className="mt-1.5 max-w-sm text-sm text-neutral-500">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
