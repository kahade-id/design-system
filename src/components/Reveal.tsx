"use client";

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from 'react';

export interface RevealProps {
  children: ReactNode;
  /** Jeda (ms) — untuk stagger 60–80ms antar elemen. */
  delay?: number;
  as?: ElementType;
  className?: string;
}

/**
 * Reveal sekali saat masuk viewport: opacity + translateY 16px, 700ms.
 * Hanya transform/opacity. Otomatis nonaktif untuk prefers-reduced-motion
 * (lihat base.css). Jangan pakai pada elemen LCP (judul hero).
 */
export function Reveal({ children, delay = 0, as: Tag = 'div', className = '' }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-visible={visible}
      className={`kh-reveal ${className}`}
      style={delay ? ({ '--kh-reveal-delay': `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
