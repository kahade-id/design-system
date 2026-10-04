import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';

export interface RadioProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
  label?: ReactNode;
  hint?: string;
}

/**
 * Radio custom hitam-putih. Label bisa diklik.
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ id: idProp, label, hint, className = '', ...rest }, ref) => {
    const autoId = useId();
    const id = idProp ?? autoId;
    return (
      <label
        htmlFor={id}
        className="flex cursor-pointer items-start gap-3 select-none"
      >
        <input ref={ref} id={id} type="radio" className="peer sr-only" {...rest} />
        <span
          className={[
            'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-neutral-300',
            'transition-colors duration-150',
            'peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-neutral-900 peer-focus-visible:ring-offset-2',
            'peer-checked:border-black',
            'peer-disabled:opacity-40 peer-disabled:cursor-not-allowed',
            "after:content-[''] after:h-2.5 after:w-2.5 after:rounded-full after:bg-black after:scale-0 after:transition-transform after:duration-150",
            'peer-checked:after:scale-100',
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
Radio.displayName = 'Radio';
