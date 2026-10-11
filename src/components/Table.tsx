import type { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react';

/**
 * Komponen tabel presentasional minimal.
 */
export function Table({ className = '', ...rest }: HTMLAttributes<HTMLTableElement>) {
  return <table className={`not-prose w-full border-collapse text-small ${className}`} {...rest} />;
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
      className={`border-b border-fg py-3 pr-6 text-left text-caption font-semibold text-fg last:pr-0 ${className}`}
      {...rest}
    />
  );
}

export function TD({ className = '', ...rest }: TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className={`border-b border-line py-4 pr-6 align-top text-fg-2 last:pr-0 ${className}`} {...rest} />
  );
}
