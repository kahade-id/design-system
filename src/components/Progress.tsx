import type { HTMLAttributes } from 'react';

type ProgressSize = 'sm' | 'md';

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  /** 0–100. */
  value: number;
  size?: ProgressSize;
  label?: string;
}

const sizeClasses: Record<ProgressSize, string> = {
  sm: 'h-1.5',
  md: 'h-2.5',
};

/**
 * Bilah progres.
 */
export function Progress({
  value,
  size = 'md',
  label,
  className = '',
  ...rest
}: ProgressProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div className={className} {...rest}>
      {label && (
        <div className="mb-1.5 flex items-center justify-between text-xs">
          <span className="font-medium text-neutral-600">{label}</span>
          <span className="font-semibold text-black tabular-nums">
            {Math.round(clamped)}%
          </span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={Math.round(clamped)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? 'Progres'}
        className={`w-full overflow-hidden rounded-full bg-neutral-100 ${sizeClasses[size]}`}
      >
        <div
          className="h-full rounded-full bg-black transition-[width] duration-300"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
