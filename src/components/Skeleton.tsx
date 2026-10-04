import type { HTMLAttributes } from 'react';
import { CircleNotch } from '@phosphor-icons/react';
import { Icon } from '../icons/Icon';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Lebar: mis. "w-32", "w-full". Default w-full. */
  width?: string;
  /** Tinggi: mis. "h-4", "h-10". Default h-4. */
  height?: string;
  circle?: boolean;
}

/**
 * Block shimmer untuk loading state (gradient sweep, bukan pulse).
 */
export function Skeleton({
  width = 'w-full',
  height = 'h-4',
  circle = false,
  className = '',
  ...rest
}: SkeletonProps) {
  return (
    <div
      aria-hidden
      className={`animate-shimmer ${circle ? 'rounded-full' : 'rounded-lg'} ${width} ${height} ${className}`}
      {...rest}
    />
  );
}

export interface SpinnerProps {
  size?: number;
  className?: string;
  label?: string;
}

/**
 * Spinner putar (border-less, ikon Phosphor).
 */
export function Spinner({ size = 20, className = '', label = 'Memuat…' }: SpinnerProps) {
  return (
    <span role="status" aria-label={label} className={`inline-flex ${className}`}>
      <Icon icon={CircleNotch} size={size} className="animate-spin" />
    </span>
  );
}
