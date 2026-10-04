import {
  useCallback,
  useEffect,
  useId,
  useRef,
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

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Modal: overlay blur + panel beranimasi, ESC & klik overlay untuk tutup,
 * focus trap (Tab berputar di dalam), fokus dikembalikan ke pemicu saat tutup.
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
  const panelRef = useRef<HTMLDivElement>(null);
  const prevFocusedRef = useRef<HTMLElement | null>(null);
  // Simpan onClose di ref agar identitasnya yang tidak stabil tidak me-restart effect
  // (listener + body overflow + focus timeout) di setiap render parent.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onCloseRef.current();
      return;
    }
    // Focus trap: Tab berputar di dalam panel.
    if (e.key === 'Tab') {
      const panel = panelRef.current;
      if (!panel) return;
      const focusables = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((el) => el.offsetParent !== null);
      if (focusables.length === 0) {
        e.preventDefault();
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    prevFocusedRef.current = document.activeElement as HTMLElement | null;
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    // Fokus awal: elemen fokusabel pertama, atau panel itu sendiri.
    const t = window.setTimeout(() => {
      const panel = panelRef.current;
      const first = panel?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
      (first ?? panel)?.focus();
    }, 30);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      // Kembalikan fokus ke pemicu.
      prevFocusedRef.current?.focus?.();
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  return (
    <div
      className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
    >
      {/* Overlay: div (bukan button) agar tak masuk urutan Tab — tutup via klik/ESC. */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/40 backdrop-blur-sm"
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        className={`animate-zoom-in relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-lift focus:outline-none ${className}`}
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
            className="rounded-full p-1.5 text-neutral-500 transition-all duration-150 hover:scale-105 hover:bg-neutral-100 hover:text-black active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
          >
            <Icon icon={X} size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
