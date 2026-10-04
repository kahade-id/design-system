import { useEffect, useRef, useState } from 'react';
import { Check, Copy } from '@phosphor-icons/react';
import { Icon } from '../icons/Icon';

export interface CopyButtonProps {
  /** Teks yang disalin ke clipboard. */
  text: string;
  label?: string;
  className?: string;
}

/**
 * Tombol salin ke clipboard dengan umpan balik visual.
 */
export function CopyButton({ text, label = 'Salin', className = '' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Bersihkan timer saat unmount agar tidak setState setelah dilepas.
  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback untuk konteks non-secure: textarea sementara.
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={[
        'inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        copied
          ? 'border-green-300 bg-green-50 text-green-700'
          : 'border-neutral-300 bg-white text-black hover:border-black hover:shadow-soft active:scale-[0.97]',
        className,
      ].join(' ')}
    >
      <Icon icon={copied ? Check : Copy} size={14} weight={copied ? 'bold' : 'regular'} />
      {copied ? 'Tersalin!' : label}
      {/* Pengumuman untuk screen reader (terpisah dari teks visual). */}
      <span className="sr-only" aria-live="polite">
        {copied ? 'Tersalin ke clipboard' : ''}
      </span>
    </button>
  );
}
