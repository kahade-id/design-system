import type { HTMLAttributes, ReactNode } from 'react';

export interface KbdProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

/** Tombol keyboard / kode singkat. */
export function Kbd({ className = '', children, ...rest }: KbdProps) {
  return (
    <kbd
      className={`inline-flex h-6 min-w-6 items-center justify-center rounded-tag border border-line-strong bg-surface px-1.5 font-sans text-caption font-semibold text-fg-2 ${className}`}
      {...rest}
    >
      {children}
    </kbd>
  );
}
