import { Fragment } from 'react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Navigasi breadcrumb.
 */
export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <nav aria-label="Navigasi breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-small">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <Fragment key={`${item.label}-${i}`}>
              {i > 0 && (
                <li aria-hidden="true" className="flex">
                  <span className="text-line-control">/</span>
                </li>
              )}
              <li>
                {isLast || !item.href ? (
                  <span
                    aria-current={isLast ? 'page' : undefined}
                    className={isLast ? 'font-medium text-fg' : 'text-fg-muted'}
                  >
                    {item.label}
                  </span>
                ) : (
                  <a
                    href={item.href}
                    className="inline-flex min-h-6 items-center rounded-tag text-fg-muted underline-offset-4 transition-colors hover:text-fg hover:underline"
                  >
                    {item.label}
                  </a>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
