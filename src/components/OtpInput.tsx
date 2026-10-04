import { useId, useRef, useState, type ClipboardEvent, type KeyboardEvent } from 'react';
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
        <span className="mb-1.5 block text-sm font-semibold text-black">{label}</span>
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
              'h-12 w-11 rounded-xl border bg-white text-center text-lg font-bold text-black',
              'transition-all duration-150 focus:outline-none focus:ring-2',
              error
                ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                : d
                  ? 'border-neutral-300 bg-neutral-50 focus:border-black focus:ring-neutral-200'
                  : 'border-neutral-200 hover:border-neutral-300 focus:border-black focus:ring-neutral-200',
              'disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-400',
            ].join(' ')}
          />
        ))}
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
}
