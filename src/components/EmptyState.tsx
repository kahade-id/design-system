import type { ReactNode } from 'react';
import { Tray } from '@phosphor-icons/react';
import type { Icon as PhosphorIcon } from '@phosphor-icons/react';
import { Icon } from '../icons/Icon';

export interface EmptyStateProps {
  icon?: PhosphorIcon;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
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
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center py-12 text-center ${className}`}>
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 text-neutral-300">
        <Icon icon={icon} size={32} />
      </span>
      <h3 className="mt-4 text-base font-bold text-black">{title}</h3>
      {description && (
        <p className="mt-1.5 max-w-sm text-sm text-neutral-500">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
