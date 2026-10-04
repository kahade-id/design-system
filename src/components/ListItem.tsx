import type { ReactNode } from 'react';
import { CaretRight } from '@phosphor-icons/react/dist/ssr';
import { Icon } from '../icons/Icon';

export interface ListItemProps {
  leading?: ReactNode;
  title: string;
  description?: string;
  trailing?: ReactNode;
  /** Jika diisi, baris menjadi tombol dengan chevron otomatis (bila trailing kosong). */
  onClick?: () => void;
  className?: string;
}

/**
 * Baris list serbaguna.
 */
export function ListItem({
  leading,
  title,
  description,
  trailing,
  onClick,
  className = '',
}: ListItemProps) {
  const showChevron = !!onClick && !trailing;
  const inner = (
    <>
      {leading && <span className="shrink-0">{leading}</span>}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold text-black">{title}</span>
        {description && (
          <span className="mt-0.5 block truncate text-xs text-neutral-500">{description}</span>
        )}
      </span>
      {trailing && <span className="shrink-0">{trailing}</span>}
      {showChevron && (
        <Icon icon={CaretRight} size={16} className="shrink-0 text-neutral-300" />
      )}
    </>
  );

  const classes = [
    'flex w-full items-center gap-3 px-4 py-3.5 text-left',
    className,
  ].join(' ');

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${classes} cursor-pointer transition hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-neutral-900 active:bg-neutral-100`}
      >
        {inner}
      </button>
    );
  }
  return <div className={classes}>{inner}</div>;
}
