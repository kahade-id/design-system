import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import { Check } from '@phosphor-icons/react';
import { Icon } from '../icons/Icon';
import { FieldError } from './Input';

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
  label?: ReactNode;
  hint?: string;
  error?: string;
}

/**
 * Checkbox custom hitam-putih. Label bisa diklik.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ id: idProp, label, hint, error, className = '', ...rest }, ref) => {
    const autoId = useId();
    const id = idProp ?? autoId;
    const hintId = useId();
    const errorId = useId();
    return (
      <div className="w-full">
        <label
          htmlFor={id}
          className="flex cursor-pointer items-start gap-3 select-none"
        >
          <input
            ref={ref}
            id={id}
            type="checkbox"
            className="peer sr-only"
            aria-invalid={!!error}
            aria-describedby={error ? errorId : hint ? hintId : undefined}
            {...rest}
          />
          <span
            className={[
              'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2',
              'transition-colors duration-150',
              'peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-neutral-900 peer-focus-visible:ring-offset-2',
              error ? 'border-red-500' : 'border-neutral-300',
              'peer-checked:border-black peer-checked:bg-black peer-checked:text-white',
              'peer-disabled:opacity-40 peer-disabled:cursor-not-allowed',
              className,
            ].join(' ')}
          >
            <Icon icon={Check} size={14} weight="bold" />
          </span>
          {label && (
            <span className="text-sm text-black">
              {label}
              {hint && (
                <span id={hintId} className="mt-0.5 block text-xs text-neutral-500">
                  {hint}
                </span>
              )}
            </span>
          )}
        </label>
        {error && <FieldError id={errorId}>{error}</FieldError>}
      </div>
    );
  },
);
Checkbox.displayName = 'Checkbox';
