import type { ElementType, HTMLAttributes, ReactNode } from 'react';

export interface ProseProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children: ReactNode;
}

/**
 * Tipografi konten panjang standar (legal, artikel, bantuan, karir).
 * Gaya di `styles/base.css` (.kh-prose). Lebar baca dibatasi pemanggil
 * (biasanya `max-w-reading`).
 */
export function Prose({ as: Tag = 'div', className = '', children, ...rest }: ProseProps) {
  return (
    <Tag className={`kh-prose ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
