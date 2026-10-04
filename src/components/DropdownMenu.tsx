import { useState, type ReactNode } from 'react';
import type { Icon as PhosphorIcon } from '@phosphor-icons/react';
import { Icon } from '../icons/Icon';

export interface DropdownMenuItem {
  label: string;
  icon?: PhosphorIcon;
  onClick: () => void;
  danger?: boolean;
}

export interface DropdownMenuProps {
  /** Elemen pemicu (mis. Button ghost dengan ikon DotsThree). */
  trigger: ReactNode;
  items: DropdownMenuItem[];
  /** Perataan menu. Default "right". */
  align?: 'left' | 'right';
  className?: string;
}

/**
 * Menu dropdown sederhana.
 */
export function DropdownMenu({ trigger, items, align = 'right', className = '' }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`relative inline-block ${className}`}>
      <div onClick={() => setOpen((o) => !o)}>{trigger}</div>
      {open && (
        <>
          {/* Overlay transparan: tutup saat klik di luar */}
          <button
            type="button"
            aria-label="Tutup menu"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default bg-transparent"
          />
          <div
            role="menu"
            className={[
              'absolute z-50 mt-2 min-w-48 overflow-hidden rounded-2xl border border-neutral-200 bg-white py-1.5 shadow-lift',
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
                  'flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm font-medium transition',
                  'focus-visible:outline-none focus-visible:bg-neutral-100',
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
