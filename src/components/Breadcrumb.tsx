import { Fragment } from 'react';
import { CaretRight } from '@phosphor-icons/react';
import { Icon } from '../icons/Icon';

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
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <Fragment key={`${item.label}-${i}`}>
              {i > 0 && (
                <li aria-hidden="true" className="flex">
                  <Icon icon={CaretRight} size={14} className="text-neutral-300" />
                </li>
              )}
              <li>
                {isLast || !item.href ? (
                  <span
                    aria-current={isLast ? 'page' : undefined}
                    className={isLast ? 'font-semibold text-black' : 'text-neutral-500'}
                  >
                    {item.label}
                  </span>
                ) : (
                  <a
                    href={item.href}
                    className="text-neutral-500 transition hover:text-black hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded"
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
