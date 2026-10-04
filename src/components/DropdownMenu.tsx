import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { Icon as PhosphorIcon } from '@phosphor-icons/react';
import { Icon } from '../icons/Icon';

export interface DropdownMenuItem {
  label: string;
  icon?: PhosphorIcon;
  onClick: () => void;
  danger?: boolean;
}

export interface DropdownMenuProps {
  /** Elemen pemicu (sebaiknya elemen non-interaktif, mis. ikon). */
  trigger: ReactNode;
  items: DropdownMenuItem[];
  /** Perataan menu. Default "right". */
  align?: 'left' | 'right';
  className?: string;
}

/**
 * Menu dropdown: ESC untuk tutup, fokus kembali ke pemicu saat tutup.
 */
export function DropdownMenu({ trigger, items, align = 'right', className = '' }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  // Fokus kembali ke pemicu saat menu ditutup.
  useEffect(() => {
    if (wasOpen.current && !open) {
      triggerRef.current?.focus();
    }
    wasOpen.current = open;
  }, [open]);

  const toggle = () => setOpen((o) => !o);

  return (
    <div className={`relative inline-block ${className}`}>
      <div
        ref={triggerRef}
        role="button"
        tabIndex={0}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle();
          } else if (e.key === 'Escape') {
            setOpen(false);
          } else if (e.key === 'ArrowDown' && !open) {
            e.preventDefault();
            setOpen(true);
          }
        }}
        className="inline-flex cursor-pointer rounded-full transition-transform duration-150 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
      >
        {trigger}
      </div>
      {open && (
        <>
          {/* Overlay transparan: tutup saat klik di luar */}
          <button
            type="button"
            aria-label="Tutup menu"
            onClick={() => setOpen(false)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setOpen(false);
            }}
            className="fixed inset-0 z-40 cursor-default bg-transparent"
          />
          <div
            role="menu"
            className={[
              'animate-slide-down absolute z-50 mt-2 min-w-48 overflow-hidden rounded-2xl border border-neutral-200 bg-white py-1.5 shadow-lift',
              align === 'right' ? 'right-0' : 'left-0',
            ].join(' ')}
          >
            {items.map((item) => (
              <button
                key={item.label}
                type="button"
                role="menuitem"
                onClick={() => {
                  setOpen(false);
                  item.onClick();
                }}
                className={[
                  'flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm font-medium transition-all duration-150',
                  'focus-visible:outline-none focus-visible:bg-neutral-100',
                  'active:bg-neutral-200',
                  item.danger
                    ? 'text-red-600 hover:bg-red-50'
                    : 'text-neutral-800 hover:bg-neutral-100',
                ].join(' ')}
              >
                {item.icon && (
                  <Icon icon={item.icon} size={17} className={item.danger ? 'text-red-500' : 'text-neutral-400'} />
                )}
                {item.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
