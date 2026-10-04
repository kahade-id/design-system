import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';

export interface SwitchProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
  label?: ReactNode;
  hint?: string;
}

/**
 * Switch (toggle) hitam-putih. Label bisa diklik.
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ id: idProp, label, hint, className = '', ...rest }, ref) => {
    const autoId = useId();
    const id = idProp ?? autoId;
    return (
      <label
        htmlFor={id}
        className="flex cursor-pointer items-start gap-3 select-none"
      >
        <input ref={ref} id={id} type="checkbox" className="peer sr-only" {...rest} />
        <span
          className={[
            'relative mt-0.5 h-6 w-11 shrink-0 rounded-full bg-neutral-200',
            'transition-colors duration-200',
            'peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-black peer-focus-visible:ring-offset-2',
            'peer-checked:bg-black',
            'peer-disabled:opacity-40 peer-disabled:cursor-not-allowed',
            "after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition-transform after:duration-200",
            'peer-checked:after:translate-x-5',
            className,
          ].join(' ')}
        />
        {label && (
          <span className="text-sm text-black">
            {label}
            {hint && (
              <span className="mt-0.5 block text-xs text-neutral-500">{hint}</span>
            )}
          </span>
        )}
      </label>
    );
  },
);
Switch.displayName = 'Switch';
