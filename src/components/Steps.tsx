import { Check } from '@phosphor-icons/react';
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
    <ol className={className} aria-label="Langkah">
      {steps.map((step, i) => {
        const done = i < current;
        const active = i === current;
        const isLast = i === steps.length - 1;
        return (
          <li key={step.label} className="relative flex gap-3.5">
            {/* Garis penghubung */}
            {!isLast && (
              <span
                aria-hidden="true"
                className={`absolute top-9 left-[17px] h-[calc(100%-2rem)] w-0.5 rounded-full ${done ? 'bg-black' : 'bg-neutral-200'}`}
              />
            )}
            <span
              aria-hidden="true"
              className={[
                'flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold',
                done
                  ? 'bg-black text-white'
                  : active
                    ? 'border-2 border-black bg-white text-black'
                    : 'border-2 border-neutral-200 bg-white text-neutral-400',
              ].join(' ')}
            >
              {done ? <Icon icon={Check} size={16} weight="bold" /> : i + 1}
            </span>
            <div className={`pb-7 ${isLast ? 'pb-0' : ''}`}>
              <p
                className={`text-sm font-semibold ${active || done ? 'text-black' : 'text-neutral-400'}`}
                aria-current={active ? 'step' : undefined}
              >
                {step.label}
              </p>
              {step.description && (
                <p className="mt-0.5 text-xs text-neutral-500">{step.description}</p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
