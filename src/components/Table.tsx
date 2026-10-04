import type { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react';

/**
 * Komponen tabel presentasional minimal.
 */
export function Table({ className = '', ...rest }: HTMLAttributes<HTMLTableElement>) {
  return <table className={`w-full border-collapse text-sm ${className}`} {...rest} />;
}

export function THead({ className = '', ...rest }: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={className} {...rest} />;
}

export function TBody({ className = '', ...rest }: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={className} {...rest} />;
}

export function TR({ className = '', ...rest }: HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={className} {...rest} />;
}

export function TH({ className = '', ...rest }: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={`border-b border-neutral-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-neutral-500 ${className}`}
      {...rest}
    />
  );
}

export function TD({ className = '', ...rest }: TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className={`border-b border-neutral-100 px-4 py-3 text-black ${className}`} {...rest} />
  );
}
