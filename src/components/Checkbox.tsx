"use client";

import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import { Check } from '@phosphor-icons/react/dist/ssr';
import { Icon } from '../icons/Icon';
import { FieldError } from './Input';

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
  label?: ReactNode;
  hint?: string;
  error?: string;
}

/**
 * Checkbox custom hitam-putih. Label bisa diklik.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ id: idProp, label, hint, error, className = '', ...rest }, ref) => {
    const autoId = useId();
    const id = idProp ?? autoId;
    const hintId = useId();
    const errorId = useId();
    return (
      <div className="w-full">
        <label
          htmlFor={id}
          className="flex cursor-pointer items-start gap-3 select-none"
        >
          <input
            ref={ref}
            id={id}
            type="checkbox"
            className="peer sr-only"
            aria-invalid={!!error}
            aria-describedby={error ? errorId : hint ? hintId : undefined}
            {...rest}
          />
          <span
            className={[
              'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] border-[1.5px]',
              'transition-colors duration-150 text-transparent',
              'peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-fg peer-focus-visible:ring-offset-2',
              error ? 'border-critical' : 'border-line-control',
              'peer-checked:border-fg peer-checked:bg-fg peer-checked:text-white',
              'peer-disabled:opacity-40 peer-disabled:cursor-not-allowed',
              className,
            ].join(' ')}
          >
            <Icon icon={Check} size={14} weight="bold" />
          </span>
          {label && (
            <span className="text-small text-fg">
              {label}
              {hint && (
                <span id={hintId} className="mt-0.5 block text-caption text-fg-muted">
                  {hint}
                </span>
              )}
            </span>
          )}
        </label>
        {error && <FieldError id={errorId}>{error}</FieldError>}
      </div>
    );
  },
);
Checkbox.displayName = 'Checkbox';
