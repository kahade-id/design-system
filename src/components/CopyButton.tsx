"use client";

import { useEffect, useRef, useState } from 'react';
import { Check, Copy, X } from '@phosphor-icons/react/dist/ssr';
import { Icon } from '../icons/Icon';

export interface CopyButtonProps {
  /** Teks yang disalin ke clipboard. */
  text: string;
  label?: string;
  /** `md` 44px (default, target sentuh), `sm` 36px untuk baris padat. */
  size?: 'sm' | 'md';
  className?: string;
}

/**
 * Tombol salin ke clipboard dengan umpan balik visual.
 */
export function CopyButton({ text, label = 'Salin', size = 'md', className = '' }: CopyButtonProps) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Bersihkan timer saat unmount agar tidak setState setelah dilepas.
  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const flash = (s: 'copied' | 'failed') => {
    setState(s);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setState('idle'), 2000);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      flash('copied');
    } catch {
      try {
        // Fallback untuk konteks non-secure: textarea sementara.
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        flash('copied');
      } catch {
        flash('failed');
      }
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={[
        size === 'md'
          ? 'inline-flex h-11 items-center gap-2 rounded-full border px-4 text-small font-semibold transition-colors duration-150'
          : 'inline-flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-caption font-semibold transition-colors duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        state === 'copied'
          ? 'border-green-300 bg-positive-soft text-green-800'
          : state === 'failed'
            ? 'border-red-300 bg-critical-soft text-critical'
            : 'border-line-strong bg-surface text-fg hover:border-fg active:scale-[0.98]',
        className,
      ].join(' ')}
    >
      <Icon
        icon={state === 'failed' ? X : state === 'copied' ? Check : Copy}
        size={14}
        weight={state === 'idle' ? 'regular' : 'bold'}
      />
      {state === 'copied' ? 'Tersalin!' : state === 'failed' ? 'Gagal menyalin' : label}
      {/* Pengumuman untuk screen reader (terpisah dari teks visual). */}
      <span className="sr-only" aria-live="polite">
        {state === 'copied'
          ? 'Tersalin ke clipboard'
          : state === 'failed'
            ? 'Gagal menyalin ke clipboard'
            : ''}
      </span>
    </button>
  );
}
