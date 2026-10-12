import { TrendDown, TrendUp } from '@phosphor-icons/react/dist/ssr';
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
 * Angka kunci: garis atas tebal, nilai besar tabular, label kecil.
 * HANYA untuk angka yang benar dan bersumber.
 */
export function Stat({ label, value, delta, hint, className = '' }: StatProps) {
  return (
    <div className={`border-t-2 border-fg pt-4 ${className}`}>
      <p className="text-small text-fg-muted">{label}</p>
      <p className="mt-2 text-[2rem] leading-none font-bold tracking-[-0.03em] text-fg tabular-nums sm:text-[2.5rem]">
        {value}
      </p>
      {delta && (
        <p
          className={`mt-3 inline-flex items-center gap-1 text-caption font-semibold ${delta.up ? 'text-positive' : 'text-critical'}`}
        >
          <Icon icon={delta.up ? TrendUp : TrendDown} size={14} weight="bold" />
          {delta.value}
        </p>
      )}
      {hint && <p className="mt-2 text-caption text-fg-subtle">{hint}</p>}
    </div>
  );
}
