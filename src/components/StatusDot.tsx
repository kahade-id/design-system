export type StatusTone = 'positive' | 'caution' | 'critical' | 'neutral';

export interface StatusDotProps {
  tone?: StatusTone;
  /** Label untuk screen reader (mis. "Operasional"). */
  label?: string;
  /** Diameter: sm 8px (default), md 10px, lg 12px. */
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const toneCls: Record<StatusTone, string> = {
  positive: 'bg-positive',
  caution: 'bg-caution',
  critical: 'bg-critical',
  neutral: 'bg-line-control',
};

/** Titik status 8px. Statis — tanpa animasi berulang. */
const sizeCls = { sm: 'h-2 w-2', md: 'h-2.5 w-2.5', lg: 'h-3 w-3' } as const;

export function StatusDot({ tone = 'neutral', label, size = 'sm', className = '' }: StatusDotProps) {
  return (
    <span
      className={`inline-block shrink-0 rounded-full ${sizeCls[size]} ${toneCls[tone]} ${className}`}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  );
}
