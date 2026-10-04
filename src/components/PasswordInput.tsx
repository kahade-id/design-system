import { forwardRef, useId, useState, type InputHTMLAttributes } from 'react';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import { Icon } from '../icons/Icon';
import { FieldShell, fieldClasses } from './Input';

export interface PasswordInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  hint?: string;
  error?: string;
}

/**
 * Input kata sandi dengan tombol intip.
 */
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ id: idProp, label, hint, error, required, className = '', ...rest }, ref) => {
    const autoId = useId();
    const id = idProp ?? autoId;
    const [visible, setVisible] = useState(false);

    return (
      <FieldShell id={id} label={label} hint={hint} error={error} required={required}>
        <div className="relative">
          <input
            ref={ref}
            id={id}
            type={visible ? 'text' : 'password'}
            required={required}
            aria-invalid={!!error}
            className={`${fieldClasses(!!error)} pr-12 ${className}`}
            {...rest}
          />
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
            aria-pressed={visible}
            className="absolute top-1/2 right-3 -translate-y-1/2 rounded-lg p-1.5 text-neutral-400 transition hover:bg-neutral-100 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
          >
            <Icon icon={visible ? EyeSlash : Eye} size={18} />
          </button>
        </div>
      </FieldShell>
    );
  },
);
PasswordInput.displayName = 'PasswordInput';
