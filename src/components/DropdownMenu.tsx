"use client";

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
  /** Label aksesibel pemicu (wajib bila pemicu hanya ikon). Default "Buka menu". */
  label?: string;
  className?: string;
}

/**
 * Menu dropdown: ESC untuk tutup, fokus kembali ke pemicu saat tutup.
 */
export function DropdownMenu({ trigger, items, align = 'right', label = 'Buka menu', className = '' }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  // Fokus kembali ke pemicu saat menu ditutup.
  useEffect(() => {
    if (wasOpen.current && !open) {
      triggerRef.current?.focus();
    }
    wasOpen.current = open;
  }, [open]);

  const toggle = () => setOpen((o) => !o);

  const openAndFocusFirst = () => {
    setOpen(true);
    // Fokus item pertama setelah menu ter-render.
    window.setTimeout(() => {
      menuRef.current?.querySelector<HTMLElement>('button[role="menuitem"]')?.focus();
    }, 30);
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <div
        ref={triggerRef}
        role="button"
        tabIndex={0}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={label}
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle();
          } else if (e.key === 'Escape') {
            setOpen(false);
          } else if (e.key === 'ArrowDown' && !open) {
            e.preventDefault();
            openAndFocusFirst();
          }
        }}
        className="inline-flex cursor-pointer rounded-full transition-transform duration-150 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg focus-visible:ring-offset-2"
      >
        {trigger}
      </div>
      {open && (
        <>
          {/* Overlay transparan: tutup saat klik di luar. tabIndex -1 agar tak masuk urutan Tab. */}
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={() => setOpen(false)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setOpen(false);
            }}
            className="fixed inset-0 z-40 cursor-default bg-transparent"
          />
          <div
            ref={menuRef}
            role="menu"
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                e.stopPropagation();
                setOpen(false);
                return;
              }
              // Navigasi antar item: panah atas/bawah, Home, End (pola WAI-APG).
              if (
                e.key === 'ArrowDown' ||
                e.key === 'ArrowUp' ||
                e.key === 'Home' ||
                e.key === 'End'
              ) {
                e.preventDefault();
                const items =
                  menuRef.current?.querySelectorAll<HTMLElement>(
                    'button[role="menuitem"]',
                  ) ?? [];
                if (items.length === 0) return;
                const current = Array.from(items).indexOf(
                  document.activeElement as HTMLElement,
                );
                let next: number;
                if (e.key === 'Home') next = 0;
                else if (e.key === 'End') next = items.length - 1;
                else if (e.key === 'ArrowDown')
                  next = (current + 1) % items.length;
                else next = (current - 1 + items.length) % items.length;
                items[next]?.focus();
              }
            }}
            className={[
              'animate-slide-down absolute z-50 mt-2 min-w-52 overflow-hidden rounded-control border border-line bg-surface p-1.5 shadow-lift',
              align === 'right' ? 'right-0' : 'left-0',
            ].join(' ')}
          >
            {items.map((item, idx) => (
              <button
                key={`${item.label}-${idx}`}
                type="button"
                role="menuitem"
                onClick={() => {
                  setOpen(false);
                  item.onClick();
                }}
                className={[
                  'flex min-h-10 w-full items-center gap-2.5 rounded-tag px-3 text-left text-small font-medium transition-colors duration-150',
                  'focus-visible:outline-none focus-visible:bg-surface-2',
                  'active:bg-surface-3',
                  item.danger
                    ? 'text-critical hover:bg-critical-soft'
                    : 'text-fg-2 hover:bg-surface-2',
                ].join(' ')}
              >
                {item.icon && (
                  <Icon icon={item.icon} size={17} className={item.danger ? 'text-critical' : 'text-fg-muted'} />
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
