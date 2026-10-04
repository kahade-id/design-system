import { forwardRef, useId, type InputHTMLAttributes } from 'react';
import { FieldShell, fieldClasses } from './Input';

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
            'flex overflow-hidden rounded-xl border bg-white transition-colors duration-150 focus-within:ring-2',
            error
              ? 'border-red-500 focus-within:border-red-500 focus-within:ring-red-100'
              : 'border-neutral-200 hover:border-neutral-300 focus-within:border-black focus-within:ring-neutral-200',
          ].join(' ')}
        >
          <span
            aria-hidden="true"
            className="flex items-center bg-neutral-100 px-4 text-sm font-semibold text-neutral-600 select-none"
          >
            {countryCode}
          </span>
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
            className={`w-full bg-transparent px-4 py-2.5 text-sm text-black placeholder:text-neutral-400 focus:outline-none disabled:cursor-not-allowed disabled:text-neutral-400 ${className}`}
            {...rest}
          />
        </div>
      </FieldShell>
    );
  },
);
PhoneInput.displayName = 'PhoneInput';
