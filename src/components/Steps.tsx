import { Check } from '@phosphor-icons/react/dist/ssr';
import { Icon } from '../icons/Icon';

export interface StepItem {
  label: string;
  description?: string;
}

export interface StepsProps {
  steps: StepItem[];
  /** Index langkah aktif (0-based). */
  current: number;
  className?: string;
}

/**
 * Indikator langkah (stepper) vertikal.
 */
export function Steps({ steps, current, className = '' }: StepsProps) {
  return (
    <ol className={`not-prose ${className}`} aria-label="Langkah">
      {steps.map((step, i) => {
        const done = i < current;
        const active = i === current;
        const isLast = i === steps.length - 1;
        return (
          <li key={`${i}-${step.label}`} className="relative flex gap-3.5">
            {/* Garis penghubung */}
            {!isLast && (
              <span
                aria-hidden="true"
                className={`absolute top-9 left-[15px] h-[calc(100%-2.25rem)] w-px ${done ? 'bg-fg' : 'bg-line-strong'}`}
              />
            )}
            <span
              aria-hidden="true"
              className={[
                'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-caption font-semibold tabular-nums',
                'transition-all duration-200',
                done
                  ? 'bg-fg text-fg-inverse'
                  : active
                    ? 'border-2 border-fg bg-surface text-fg ring-4 ring-surface-2'
                    : 'border border-line-strong bg-surface text-fg-subtle',
              ].join(' ')}
            >
              {done ? <Icon icon={Check} size={16} weight="bold" /> : i + 1}
            </span>
            <div className={`pb-7 ${isLast ? 'pb-0' : ''}`}>
              <p
                className={`pt-1 text-small font-semibold ${active || done ? 'text-fg' : 'text-fg-muted'}`}
                aria-current={active ? 'step' : undefined}
              >
                {step.label}
              </p>
              {step.description && (
                <p className="mt-0.5 text-small text-fg-muted">{step.description}</p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
