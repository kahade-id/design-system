export type StatusTone = 'positive' | 'caution' | 'critical' | 'neutral';

export interface StatusDotProps {
  tone?: StatusTone;
  /** Label untuk screen reader (mis. "Operasional"). */
  label?: string;
  className?: string;
}

const toneCls: Record<StatusTone, string> = {
  positive: 'bg-positive',
  caution: 'bg-caution',
  critical: 'bg-critical',
  neutral: 'bg-line-control',
};

/** Titik status 8px. Statis — tanpa animasi berulang. */
export function StatusDot({ tone = 'neutral', label, className = '' }: StatusDotProps) {
  return (
    <span
      className={`inline-block h-2 w-2 shrink-0 rounded-full ${toneCls[tone]} ${className}`}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  );
}
