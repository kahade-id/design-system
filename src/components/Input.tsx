"use client";

import {
  cloneElement,
  forwardRef,
  isValidElement,
  useId,
  type InputHTMLAttributes,
  type ReactElement,
  type ReactNode,
  type TextareaHTMLAttributes,
} from 'react';
import { WarningCircle } from '@phosphor-icons/react/dist/ssr';
import { Icon } from '../icons/Icon';

export interface FieldShellProps {
  id: string;
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

/**
 * Pesan error field yang seragam: ikon + teks merah.
 */
export function FieldError({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <p id={id} role="alert" className="mt-1.5 flex items-center gap-1.5 text-sm text-red-600">
      <Icon icon={WarningCircle} size={16} className="shrink-0" />
      <span>{children}</span>
    </p>
  );
}

export function FieldShell({ id, label, hint, error, required, children }: FieldShellProps) {
  const hintId = useId();
  const errorId = useId();
  const describedBy =
    [error ? errorId : null, !error && hint ? hintId : null]
      .filter(Boolean)
      .join(' ') || undefined;

  // Teruskan aria-describedby ke field di dalamnya (bila belum diisi manual).
  const child =
    isValidElement(children) &&
    (children as ReactElement<{ 'aria-describedby'?: string }>).props[
      'aria-describedby'
    ] === undefined
      ? cloneElement(children as ReactElement<Record<string, unknown>>, {
          'aria-describedby': describedBy,
        })
      : children;

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
      {child}
      {error ? (
        <FieldError id={errorId}>{error}</FieldError>
      ) : hint ? (
        <p id={hintId} className="mt-1.5 text-xs text-neutral-500">
          {hint}
        </p>
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
