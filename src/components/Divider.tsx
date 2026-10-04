export interface DividerProps {
  label?: string;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

/**
 * Garis pemisah, opsional dengan label tengah.
 */
export function Divider({ label, orientation = 'horizontal', className = '' }: DividerProps) {
  if (orientation === 'vertical') {
    return (
      <span
        aria-hidden="true"
        role="separator"
        aria-orientation="vertical"
        className={`inline-block w-px self-stretch bg-neutral-200 ${className}`}
      />
    );
  }
  if (!label) {
    return <hr className={`border-0 border-t border-neutral-200 ${className}`} />;
  }
  return (
    <div className={`flex items-center gap-3 ${className}`} role="separator">
      <span aria-hidden="true" className="h-px flex-1 bg-neutral-200" />
      <span className="text-xs font-medium text-neutral-400 whitespace-nowrap">{label}</span>
      <span aria-hidden="true" className="h-px flex-1 bg-neutral-200" />
    </div>
  );
}
