import type { HTMLAttributes, ReactNode } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Bila true: hover lift + shadow (untuk kartu yang bisa diklik). */
  interactive?: boolean;
}

/**
 * Kartu Kahade: rounded-2xl, border tipis, shadow lembut.
 */
export function Card({ interactive = false, className = '', children, ...rest }: CardProps) {
  return (
    <div
      className={[
        'rounded-2xl border border-neutral-200 bg-white p-6 shadow-soft',
        interactive &&
          'cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift active:translate-y-0 active:scale-[0.99]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </div>
  );
}
