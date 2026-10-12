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
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
  hint?: string;
  error?: string;
  /** Tombol clear. Default true. */
  clearable?: boolean;
  onClear?: () => void;
  /** `md` 48px (default), `lg` 56px untuk pencarian utama halaman. */
  size?: 'md' | 'lg';
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
      size = 'md',
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
            className="mb-2 block text-small font-semibold text-fg"
          >
            {label}
            {required && <span aria-hidden="true" className="text-critical"> *</span>}
          </label>
        )}
        <div className="relative">
          <span className={`pointer-events-none absolute top-1/2 -translate-y-1/2 ${size === 'lg' ? 'left-5' : 'left-4'}`}>
            <Icon icon={MagnifyingGlass} size={size === 'lg' ? 22 : 18} className="text-fg-muted" />
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
              'w-full rounded-full border bg-surface text-fg',
              size === 'lg' ? 'min-h-14 pr-14 pl-14 text-[1.0625rem]' : 'min-h-12 pr-12 pl-11 text-body',
              'placeholder:text-fg-subtle [&::-webkit-search-cancel-button]:hidden',
              'transition-[border-color,box-shadow] duration-150 focus:outline-none focus:ring-1',
              error
                ? 'border-critical focus:border-critical focus:ring-critical'
                : 'border-line-control hover:border-fg-muted focus:border-fg focus:ring-fg',
              'disabled:cursor-not-allowed disabled:bg-surface-2 disabled:text-fg-subtle',
            ].join(' ')}
            {...rest}
          />
          {clearable && String(value ?? '').length > 0 && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Hapus pencarian"
              className="absolute top-1/2 right-2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-fg-muted transition-colors hover:bg-surface-2 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg"
            >
              <Icon icon={X} size={16} />
            </button>
          )}
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
SearchField.displayName = 'SearchField';
