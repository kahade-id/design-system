import { TrendDown, TrendUp } from '@phosphor-icons/react';
import { Icon } from '../icons/Icon';

export interface StatDelta {
  value: string;
  up: boolean;
}

export interface StatProps {
  label: string;
  value: string;
  delta?: StatDelta;
  hint?: string;
  className?: string;
}

/**
 * Kartu metrik/statistik.
 */
export function Stat({ label, value, delta, hint, className = '' }: StatProps) {
  return (
    <div
      className={`rounded-2xl border border-neutral-200 bg-white p-5 shadow-soft ${className}`}
    >
      <p className="text-sm text-neutral-500">{label}</p>
      <p className="mt-1 text-3xl font-extrabold tracking-tight text-black tabular-nums">
        {value}
      </p>
      {delta && (
        <p
          className={`mt-2 inline-flex items-center gap-1 text-xs font-semibold ${delta.up ? 'text-green-700' : 'text-red-600'}`}
        >
          <Icon icon={delta.up ? TrendUp : TrendDown} size={14} weight="bold" />
          {delta.value}
        </p>
      )}
      {hint && <p className="mt-1 text-xs text-neutral-400">{hint}</p>}
    </div>
  );
}
