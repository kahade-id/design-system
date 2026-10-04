"use client";

import { useState, type ReactNode } from 'react';
import { Info, Megaphone, X } from '@phosphor-icons/react/dist/ssr';
import { Icon } from '../icons/Icon';

type BannerVariant = 'info' | 'brand';

export interface BannerAction {
  label: string;
  onClick: () => void;
}

export interface BannerProps {
  variant?: BannerVariant;
  message: ReactNode;
  action?: BannerAction;
  /** Bisa ditutup. Default true. */
  dismissible?: boolean;
  className?: string;
}

const variantClasses: Record<BannerVariant, string> = {
  info: 'bg-black text-white',
  /** Kuning brand — untuk pengumuman brand/promo resmi. */
  brand: 'bg-brand text-black',
};

/**
 * Strip pengumuman full-width.
 */
export function Banner({
  variant = 'info',
  message,
  action,
  dismissible = true,
  className = '',
}: BannerProps) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div
      role="status"
      className={`flex items-center justify-center gap-3 px-4 py-2.5 text-sm ${variantClasses[variant]} ${className}`}
    >
      <Icon
        icon={variant === 'brand' ? Megaphone : Info}
        size={17}
        className={variant === 'brand' ? 'text-black' : 'text-white'}
      />
      <p className="font-medium">{message}</p>
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className={[
            'rounded-full px-3 py-1 text-xs font-bold transition-all duration-150',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
            variant === 'brand'
              ? 'bg-black text-white hover:bg-neutral-800 focus-visible:ring-neutral-900'
              : 'bg-white text-black hover:bg-neutral-200 focus-visible:ring-white',
          ].join(' ')}
        >
          {action.label}
        </button>
      )}
      {dismissible && (
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Tutup pengumuman"
          className={`rounded-full p-1 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 ${
            variant === 'brand'
              ? 'hover:bg-black/10 focus-visible:ring-neutral-900'
              : 'hover:bg-white/20 focus-visible:ring-white'
          }`}
        >
          <Icon icon={X} size={15} />
        </button>
      )}
    </div>
  );
}
