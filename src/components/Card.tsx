import type { HTMLAttributes, ReactNode } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/**
 * Kartu Kahade: rounded-2xl, border tipis, shadow lembut.
 */
export function Card({ className = '', children, ...rest }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-neutral-200 bg-white p-6 shadow-soft ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
