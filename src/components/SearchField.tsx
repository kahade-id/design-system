"use client";

import {
  forwardRef,
  useId,
  useState,
  type InputHTMLAttributes,
} from 'react';
import { MagnifyingGlass, X } from '@phosphor-icons/react/dist/ssr';
import { Icon } from '../icons/Icon';
import { FieldError } from './Input';

export interface SearchFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  hint?: string;
  error?: string;
  /** Tombol clear. Default true. */
  clearable?: boolean;
  onClear?: () => void;
}

/**
 * Kolom pencarian dengan ikon kaca pembesar & tombol hapus.
 */
export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  (
    {
      id: idProp,
      label,
      hint,
      error,
      required,
      clearable = true,
      value: valueProp,
      defaultValue,
      onChange,
      onClear,
      className = '',
      placeholder = 'Cari…',
      ...rest
    },
    ref,
  ) => {
    const autoId = useId();
    const id = idProp ?? autoId;
    const hintId = useId();
    const errorId = useId();
    const [inner, setInner] = useState(defaultValue?.toString() ?? '');
    const isControlled = valueProp !== undefined;
    const value = isControlled ? valueProp : inner;

    const handleClear = () => {
      if (!isControlled) setInner('');
      onClear?.();
    };

    return (
      <div className={`w-full ${className}`}>
        {label && (
          <label
            htmlFor={id}
            className="mb-1.5 block text-sm font-semibold text-black"
          >
            {label}
            {required && <span className="text-red-600"> *</span>}
          </label>
        )}
        <div className="relative">
          <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2">
            <Icon icon={MagnifyingGlass} size={18} className="text-neutral-400" />
          </span>
          <input
            ref={ref}
            id={id}
            type="search"
            role="searchbox"
            value={value}
            onChange={(e) => {
              if (!isControlled) setInner(e.target.value);
              onChange?.(e);
            }}
            placeholder={placeholder}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : hint ? hintId : undefined}
            className={[
              'w-full rounded-full border bg-white py-2.5 pr-11 pl-11 text-sm text-black',
              'placeholder:text-neutral-400 [&::-webkit-search-cancel-button]:hidden',
              'transition-colors duration-150 focus:outline-none focus:ring-2',
              error
                ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                : 'border-neutral-200 hover:border-neutral-300 focus:border-black focus:ring-neutral-200',
              'disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-400',
            ].join(' ')}
            {...rest}
          />
          {clearable && String(value ?? '').length > 0 && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Hapus pencarian"
              className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 text-neutral-400 transition hover:bg-neutral-100 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
            >
              <Icon icon={X} size={16} />
            </button>
          )}
        </div>
        {error ? (
          <FieldError id={errorId}>{error}</FieldError>
        ) : hint ? (
          <p id={hintId} className="mt-1.5 text-xs text-neutral-500">
            {hint}
          </p>
        ) : null}
      </div>
    );
  },
);
SearchField.displayName = 'SearchField';
