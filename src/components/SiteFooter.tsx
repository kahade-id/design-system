import type { ElementType, ReactNode } from 'react';
import { Logo } from './Logo';
import {
  COMPANY,
  FOOTER_COLUMNS,
  SITES,
  localizeHref,
  type KahadeSite,
} from '../ecosystem';

export interface SiteFooterProps {
  /** Situs yang sedang dirender. */
  site: KahadeSite;
  /** Slot di bawah deskripsi brand (mis. tombol unduh aplikasi). */
  children?: ReactNode;
  /** Catatan tambahan di baris bawah (mis. disclaimer dokumen). */
  note?: ReactNode;
  /** Komponen link internal (mis. `Link` dari next/link). Default `<a>`. */
  linkAs?: ElementType;
}

const SITE_ORDER: KahadeSite[] = ['home', 'bantuan', 'artikel', 'karir', 'legal', 'status', 'investor'];

/**
 * Footer global ekosistem Kahade — identik di semua situs.
 * Tautan bersumber dari `ecosystem.ts`; tautan milik situs sendiri otomatis
 * menjadi path relatif.
 */
export function SiteFooter({ site, children, note, linkAs: LinkTag = 'a' }: SiteFooterProps) {
  const year = new Date().getFullYear();

  const renderLink = (href: string, label: string, className: string) => {
    const local = localizeHref(href, site);
    const Tag: ElementType = local.startsWith('/') ? LinkTag : 'a';
    return (
      <Tag href={local} className={className}>
        {label}
      </Tag>
    );
  };

  return (
    <footer className="border-t border-line bg-surface-2 text-fg">
      <div className="mx-auto w-full max-w-[calc(var(--container-page)+2.5rem)] px-5 pt-14 pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:max-w-[calc(var(--container-page)+4rem)] sm:px-8 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            {(() => {
              const home = localizeHref(`${SITES.home.origin}/`, site);
              const HomeTag: ElementType = home.startsWith('/') ? LinkTag : 'a';
              return (
                <HomeTag
                  href={home}
                  aria-label="Kahade — beranda"
                  className="-m-2 inline-flex min-h-11 items-center rounded-tag p-2"
                >
                  <Logo size={30} tone="ink" title="" />
                </HomeTag>
              );
            })()}
            <p className="mt-5 max-w-[22rem] text-small text-fg-muted">
              Jual beli semudah scroll media sosial, dengan perlindungan di setiap
              transaksi.
            </p>
            {children && <div className="mt-6">{children}</div>}
          </div>

          <nav aria-label="Navigasi footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-span-8">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <h2 className="text-small font-semibold text-fg">{col.title}</h2>
                <ul className="mt-3">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      {renderLink(
                        l.href,
                        l.label,
                        'inline-flex min-h-11 items-center text-small text-fg-muted transition-colors duration-150 hover:text-fg lg:min-h-9',
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-line-strong pt-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="text-caption text-fg-muted">
            <p>
              © {year} {COMPANY.name}. Hak cipta dilindungi.
            </p>
            {note && <p className="mt-1">{note}</p>}
          </div>
          <ul aria-label="Situs Kahade" className="flex flex-wrap gap-x-5 gap-y-1">
            {SITE_ORDER.map((s) => {
              const current = s === site;
              const label = s === 'home' ? 'kahade.id' : SITES[s].label;
              return (
                <li key={s}>
                  {current ? (
                    <span aria-current="true" className="inline-flex min-h-9 items-center text-caption font-semibold text-fg">
                      {label}
                    </span>
                  ) : (
                    <a
                      href={`${SITES[s].origin}/`}
                      className="inline-flex min-h-9 items-center text-caption text-fg-muted transition-colors hover:text-fg"
                    >
                      {label}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
}
