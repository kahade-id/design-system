import {
  useCallback,
  useEffect,
  useId,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { X } from '@phosphor-icons/react';
import { Icon } from '../icons/Icon';

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

/**
 * Modal sederhana: overlay blur, panel rounded-3xl, ESC & klik overlay untuk tutup.
 */
export function Modal({
  open,
  onClose,
  title,
  className = '',
  children,
  ...rest
}: ModalProps) {
  const titleId = useId();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
    >
      <button
        type="button"
        aria-label="Tutup"
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-default"
      />
      <div
        className={`relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-lift ${className}`}
        {...rest}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          {title ? (
            <h2 id={titleId} className="text-lg font-bold text-black">
              {title}
            </h2>
          ) : (
            <span />
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup dialog"
            className="rounded-full p-1.5 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
          >
            <Icon icon={X} size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
