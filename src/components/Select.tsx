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
          <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-black">
            {label}
            {required && <span className="text-red-600"> *</span>}
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
              'w-full appearance-none rounded-xl border bg-white pl-4 pr-10 py-2.5 text-sm text-black',
              'transition-colors duration-150',
              'focus:outline-none focus:ring-2',
              error
                ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                : 'border-neutral-200 hover:border-neutral-300 focus:border-black focus:ring-neutral-200',
              'disabled:bg-neutral-50 disabled:text-neutral-400 disabled:cursor-not-allowed',
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
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-neutral-500">
            <Icon icon={CaretDown} size={16} />
          </span>
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
Select.displayName = 'Select';
