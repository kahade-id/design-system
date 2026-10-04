import type { ReactNode } from 'react';

export interface TooltipProps {
  /** Teks tooltip */
  label: string;
  children: ReactNode;
  className?: string;
}

/**
 * Tooltip CSS-only (group-hover), posisi atas.
 */
export function Tooltip({ label, children, className = '' }: TooltipProps) {
  return (
    <span className={`group relative inline-flex ${className}`}>
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 rounded-lg bg-black px-2 py-1 text-xs font-medium whitespace-nowrap text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        {label}
      </span>
    </span>
  );
}
