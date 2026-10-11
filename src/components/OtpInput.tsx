"use client";

import { useEffect, useId, useRef, useState, type ClipboardEvent, type KeyboardEvent } from 'react';
import { FieldError } from './Input';

export interface OtpInputProps {
  /** Jumlah kotak. Default 6. */
  length?: number;
  /** Dipanggil saat semua kotak terisi. */
  onComplete?: (code: string) => void;
  label?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  className?: string;
}

/**
 * Input kode OTP — N kotak digit dengan auto-advance & paste.
 */
export function OtpInput({
  length = 6,
  onComplete,
  label,
  hint,
  error,
  disabled,
  autoFocus,
  className = '',
}: OtpInputProps) {
  const autoId = useId();
  const hintId = useId();
  const errorId = useId();
  const [digits, setDigits] = useState<string[]>(() => Array(length).fill(''));
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  // Sinkronkan ulang bila jumlah kotak berubah setelah mount.
  useEffect(() => {
    setDigits(Array(length).fill(''));
  }, [length]);

  const focusBox = (i: number) => refs.current[i]?.focus();

  const commit = (next: string[]) => {
    setDigits(next);
    const code = next.join('');
    if (code.length === length && next.every((d) => d !== '')) {
      onComplete?.(code);
    }
  };

  const setDigit = (i: number, ch: string) => {
    if (!/^[0-9]?$/.test(ch)) return;
    const next = [...digits];
    next[i] = ch;
    commit(next);
    if (ch && i < length - 1) focusBox(i + 1);
  };

  const onKeyDown = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      focusBox(i - 1);
    }
  };

  const onPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    if (!text) return;
    const next = Array(length).fill('');
    text.split('').forEach((ch, i) => {
      next[i] = ch;
    });
    commit(next);
    focusBox(Math.min(text.length, length - 1));
  };

  return (
    <div className={className}>
      {label && (
        <span className="mb-2 block text-small font-semibold text-fg">{label}</span>
      )}
      <div
        className="flex gap-2"
        role="group"
        aria-label={label ?? 'Kode OTP'}
        aria-describedby={error ? errorId : hint ? hintId : undefined}
      >
        {digits.map((d, i) => (
          <input
            key={`${autoId}-${i}`}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            autoComplete={i === 0 ? 'one-time-code' : 'off'}
            autoFocus={autoFocus && i === 0}
            maxLength={1}
            value={d}
            disabled={disabled}
            aria-label={`Digit ${i + 1} dari ${length}`}
            aria-invalid={!!error}
            onChange={(e) => setDigit(i, e.target.value.replace(/\D/g, '').slice(-1))}
            onKeyDown={(e) => onKeyDown(i, e)}
            onPaste={onPaste}
            className={[
              'h-14 w-12 rounded-control border bg-surface text-center text-h4 tabular-nums text-fg',
              'transition-[border-color,box-shadow] duration-150 focus:outline-none focus:ring-1',
              error
                ? 'border-critical focus:border-critical focus:ring-critical'
                : d
                  ? 'border-fg focus:ring-fg'
                  : 'border-line-control hover:border-fg-muted focus:border-fg focus:ring-fg',
              'disabled:cursor-not-allowed disabled:bg-surface-2 disabled:text-fg-subtle',
            ].join(' ')}
          />
        ))}
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
}
