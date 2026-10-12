import type { AnchorHTMLAttributes, ElementType, ReactNode } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { Icon } from '../icons/Icon';

export interface TextLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  /** Ikon arah. `external` = panah serong (situs lain). */
  arrow?: 'right' | 'left' | 'external' | 'none';
  inverse?: boolean;
  as?: ElementType;
  children: ReactNode;
}

/**
 * Tautan teks dengan panah — untuk "Lihat semua", "Kembali", tautan lintas situs.
 */
export function TextLink({
  href,
  arrow = 'right',
  inverse = false,
  as: Tag = 'a',
  className = '',
  children,
  ...rest
}: TextLinkProps) {
  const icon = arrow === 'left' ? ArrowLeft : arrow === 'external' ? ArrowUpRight : ArrowRight;
  return (
    <Tag
      href={href}
      className={[
        'group inline-flex min-h-11 items-center gap-1.5 text-small font-semibold sm:text-body',
        inverse ? 'text-white' : 'text-fg',
        'rounded-tag decoration-1 underline-offset-[5px] hover:underline',
        className,
      ].join(' ')}
      {...rest}
    >
      {arrow === 'left' && (
        <span className="transition-transform duration-200 group-hover:-translate-x-0.5">
          <Icon icon={icon} size={18} />
        </span>
      )}
      <span>{children}</span>
      {arrow !== 'left' && arrow !== 'none' && (
        <span className="transition-transform duration-200 group-hover:translate-x-0.5">
          <Icon icon={icon} size={18} />
        </span>
      )}
    </Tag>
  );
}
