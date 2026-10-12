"use client";

import { useEffect, useState } from 'react';
import { CaretDown } from '@phosphor-icons/react/dist/ssr';
import { Icon } from '../icons/Icon';

export interface TocItem {
  id: string;
  label: string;
  /** 2 = seksi utama, 3 = sub-seksi (menjorok). */
  level?: 2 | 3;
}

export interface TocProps {
  items: TocItem[];
  /** Judul kecil daftar isi. */
  title?: string;
  /**
   * `sidebar` daftar menempel dengan penanda seksi aktif (desktop).
   * `disclosure` ringkas, bisa dibuka-tutup (mobile).
   */
  variant?: 'sidebar' | 'disclosure';
  className?: string;
}

/** Seksi aktif = judul terakhir yang sudah melewati sepertiga atas viewport. */
function useActiveId(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(ids[0] ?? null);
  const key = ids.join('|');

  useEffect(() => {
    const list = key ? key.split('|') : [];
    if (list.length === 0) return;
    let frame = 0;
    const compute = () => {
      frame = 0;
      const line = window.innerHeight * 0.33;
      let current: string | null = list[0];
      for (const id of list) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - line <= 0) current = id;
        else break;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [key]);

  return active;
}

/**
 * Daftar isi dokumen. Sidebar menandai seksi yang sedang dibaca.
 */
export function Toc({ items, title = 'Di halaman ini', variant = 'sidebar', className = '' }: TocProps) {
  const active = useActiveId(items.map((i) => i.id));

  if (variant === 'disclosure') {
    return (
      <details
        className={`not-prose group rounded-control border border-line bg-surface ${className}`}
      >
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-4 text-small font-semibold text-fg [&::-webkit-details-marker]:hidden">
          {title}
          <span className="text-fg-muted transition-transform duration-200 group-open:rotate-180">
            <Icon icon={CaretDown} size={16} />
          </span>
        </summary>
        <nav aria-label={title} className="border-t border-line px-2 py-2">
          <ol>
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`flex min-h-11 items-center rounded-tag px-2 text-small text-fg-muted hover:bg-surface-2 hover:text-fg ${item.level === 3 ? 'pl-6' : ''}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </details>
    );
  }

  return (
    <nav aria-label={title} className={`not-prose ${className}`}>
      <p className="mb-4 text-caption font-semibold text-fg">{title}</p>
      <ol className="border-l border-line">
        {items.map((item) => {
          const isActive = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? 'location' : undefined}
                className={[
                  '-ml-px flex border-l-2 py-1.5 text-small leading-snug transition-colors duration-150',
                  item.level === 3 ? 'pl-7' : 'pl-4',
                  isActive
                    ? 'border-fg font-semibold text-fg'
                    : 'border-transparent text-fg-muted hover:border-line-strong hover:text-fg',
                ].join(' ')}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
