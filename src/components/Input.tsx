import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react';

export interface FieldShellProps {
  id: string;
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

export function FieldShell({ id, label, hint, error, required, children }: FieldShellProps) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="mb-1.5 block text-sm font-semibold text-black"
        >
          {label}
          {required && <span className="text-red-600"> *</span>}
        </label>
      )}
      {children}
      {error ? (
        <p className="mt-1.5 text-xs text-red-600" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-neutral-500">{hint}</p>
      ) : null}
    </div>
  );
}

export const fieldClasses = (hasError: boolean) =>
  [
    'w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-black',
    'placeholder:text-neutral-400',
    'transition-colors duration-150',
    'focus:outline-none focus:ring-2',
    hasError
      ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
      : 'border-neutral-200 hover:border-neutral-300 focus:border-black focus:ring-neutral-200',
    'disabled:bg-neutral-50 disabled:text-neutral-400 disabled:cursor-not-allowed',
  ].join(' ');

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
}

/**
 * Input teks Kahade.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id: idProp, label, hint, error, required, className = '', ...rest }, ref) => {
    const autoId = useId();
    const id = idProp ?? autoId;
    return (
      <FieldShell id={id} label={label} hint={hint} error={error} required={required}>
        <input
          ref={ref}
          id={id}
          required={required}
          aria-invalid={!!error}
          className={`${fieldClasses(!!error)} ${className}`}
          {...rest}
        />
      </FieldShell>
    );
  },
);
Input.displayName = 'Input';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

/**
 * Textarea Kahade.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ id: idProp, label, hint, error, required, className = '', rows = 4, ...rest }, ref) => {
    const autoId = useId();
    const id = idProp ?? autoId;
    return (
      <FieldShell id={id} label={label} hint={hint} error={error} required={required}>
        <textarea
          ref={ref}
          id={id}
          rows={rows}
          required={required}
          aria-invalid={!!error}
          className={`${fieldClasses(!!error)} resize-y ${className}`}
          {...rest}
        />
      </FieldShell>
    );
  },
);
Textarea.displayName = 'Textarea';
