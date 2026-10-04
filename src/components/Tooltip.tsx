import { useId, type ReactNode, isValidElement, cloneElement, type ReactElement } from 'react';

export interface TooltipProps {
  /** Teks tooltip */
  label: string;
  children: ReactNode;
  className?: string;
}

/**
 * Tooltip: fade + geser halus saat hover/fokus. Pemicu dikaitkan via aria-describedby.
 */
export function Tooltip({ label, children, className = '' }: TooltipProps) {
  const tooltipId = useId();
  const trigger =
    isValidElement(children) &&
    (children as ReactElement<{ 'aria-describedby'?: string }>).props[
      'aria-describedby'
    ] === undefined
      ? cloneElement(children as ReactElement<Record<string, unknown>>, {
          'aria-describedby': tooltipId,
        })
      : children;

  return (
    <span className={`group relative inline-flex ${className}`}>
      {trigger}
      <span
        id={tooltipId}
        role="tooltip"
        className="animate-fade-in pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-max max-w-64 -translate-x-1/2 translate-y-1 rounded-lg bg-black px-2.5 py-1.5 text-center text-xs font-medium whitespace-normal text-white opacity-0 transition-all duration-150 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
      >
        {label}
      </span>
    </span>
  );
}
