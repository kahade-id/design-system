"use client";

import { forwardRef, useId, type InputHTMLAttributes } from 'react';
import { FieldShell } from './Input';

export interface PhoneInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'prefix'> {
  label?: string;
  hint?: string;
  error?: string;
  /** Kode negara. Default "+62". */
  countryCode?: string;
}

/**
 * Input nomor HP dengan prefix kode negara tetap.
 */
export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      id: idProp,
      label,
      hint,
      error,
      required,
      countryCode = '+62',
      onChange,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const autoId = useId();
    const id = idProp ?? autoId;

    return (
      <FieldShell id={id} label={label} hint={hint} error={error} required={required}>
        <div
          className={[
            'flex min-h-12 overflow-hidden rounded-control border bg-surface transition-[border-color,box-shadow] duration-150 focus-within:ring-1',
            error
              ? 'border-critical focus-within:border-critical focus-within:ring-critical'
              : 'border-line-control hover:border-fg-muted focus-within:border-fg focus-within:ring-fg',
            'has-disabled:opacity-60',
          ].join(' ')}
        >
          <span
            aria-hidden="true"
            className="flex items-center border-r border-line bg-surface-2 px-4 text-body font-semibold text-fg-muted select-none"
          >
            {countryCode}
          </span>
          {/* Diumumkan ke screen reader karena prefix visual disembunyikan. */}
          <span className="sr-only">Kode negara {countryCode}. </span>
          <input
            ref={ref}
            id={id}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required={required}
            aria-invalid={!!error}
            onChange={(e) => {
              // Hanya digit — prefix ditangani terpisah.
              e.target.value = e.target.value.replace(/\D/g, '');
              onChange?.(e);
            }}
            className={`w-full bg-transparent px-4 py-3 text-body text-fg placeholder:text-fg-subtle focus:outline-none disabled:cursor-not-allowed disabled:text-fg-subtle ${className}`}
            {...rest}
          />
        </div>
      </FieldShell>
    );
  },
);
PhoneInput.displayName = 'PhoneInput';
