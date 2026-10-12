"use client";

import {
  forwardRef,
  useId,
  type SelectHTMLAttributes,
} from 'react';
import { CaretDown } from '@phosphor-icons/react/dist/ssr';
import { Icon } from '../icons/Icon';
import { FieldError } from './Input';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  error?: string;
  options: { value: string; label: string; disabled?: boolean }[];
  placeholder?: string;
}

/**
 * Select native yang di-style Kahade.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      id: idProp,
      label,
      hint,
      error,
      required,
      options,
      placeholder = 'Pilih…',
      className = '',
      children,
      ...rest
    },
    ref,
  ) => {
    const autoId = useId();
    const id = idProp ?? autoId;
    const hintId = useId();
    const errorId = useId();
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="mb-2 block text-small font-semibold text-fg">
            {label}
            {required && <span aria-hidden="true" className="text-critical"> *</span>}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={id}
            required={required}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : hint ? hintId : undefined}
            className={[
              'w-full min-h-12 appearance-none rounded-control border bg-surface py-3 pr-11 pl-4 text-body text-fg',
              'transition-[border-color,box-shadow] duration-150',
              'focus:outline-none focus:ring-1',
              error
                ? 'border-critical focus:border-critical focus:ring-critical'
                : 'border-line-control hover:border-fg-muted focus:border-fg focus:ring-fg',
              'disabled:border-line disabled:bg-surface-2 disabled:text-fg-subtle disabled:cursor-not-allowed',
              className,
            ].join(' ')}
            {...rest}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
            {children}
          </select>
          <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-fg-muted">
            <Icon icon={CaretDown} size={16} />
          </span>
        </div>
        {error ? (
          <FieldError id={errorId}>{error}</FieldError>
        ) : hint ? (
          <p id={hintId} className="mt-2 text-caption text-fg-muted">
            {hint}
          </p>
        ) : null}
      </div>
    );
  },
);
Select.displayName = 'Select';
