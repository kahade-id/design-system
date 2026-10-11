"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from 'react';
import { List, X, ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { Icon } from '../icons/Icon';
import { Logo } from './Logo';
import { buttonClasses } from './Button';
import { SITES, localizeHref, type KahadeSite } from '../ecosystem';

export interface SiteNavItem {
  label: string;
  href: string;
}

export interface SiteHeaderCta {
  label: string;
  href: string;
}

export interface SiteHeaderProps {
  /** Situs yang sedang dirender — menentukan label produk & tautan ekosistem. */
  site: KahadeSite;
  /** Navigasi utama situs (maks. 5 item agar tetap tenang). */
  nav?: SiteNavItem[];
  /** Path saat ini (dari usePathname) untuk menandai item aktif. */
  pathname?: string;
  /** Tombol utama di kanan. */
  cta?: SiteHeaderCta;
  /** Slot tambahan di kanan desktop sebelum CTA (mis. tombol unduh). */
  actions?: ReactNode;
  /** Slot di bagian bawah menu seluler (mis. tombol unduh aplikasi). */
  mobileFooter?: ReactNode;
  /** Komponen link internal (mis. `Link` dari next/link). Default `<a>`. */
  linkAs?: ElementType;
}

function isActive(href: string, pathname?: string): boolean {
  if (!pathname || !href.startsWith('/') || href.includes('#')) return false;
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

const ECOSYSTEM_ORDER: KahadeSite[] = [
  'home',
  'bantuan',
  'artikel',
  'karir',
  'legal',
  'status',
  'investor',
];

/**
 * Header global ekosistem Kahade.
 *
 * - Mark (hitam) selalu menuju kahade.id; label produk menuju beranda situs.
 * - Tinggi 64px, menempel, latar putih semi-buram + hairline saat digulir.
 * - Item aktif ditandai garis 2px di tepi bawah header.
 * - Seluler: lembar menu penuh, Esc menutup, fokus dikelola, scroll terkunci.
 */
export function SiteHeader({
  site,
  nav = [],
  pathname,
  cta,
  actions,
  mobileFooter,
  linkAs: LinkTag = 'a',
}: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const sheetId = useId();
  const info = SITES[site];
  const homeOrigin = SITES.home.origin;

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Tutup menu saat rute berubah.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Tutup bila viewport melebar ke desktop.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = window.setTimeout(() => {
      sheetRef.current?.querySelector<HTMLElement>('a, button')?.focus();
    }, 20);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      // Fokus berputar di antara tombol menu dan isi lembar.
      if (e.key === 'Tab') {
        const els = [
          toggleRef.current,
          ...Array.from(sheetRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []),
        ].filter((el): el is HTMLElement => !!el);
        if (els.length === 0) return;
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const isHome = site === 'home';
  const CtaTag: ElementType = cta?.href.startsWith('/') ? LinkTag : 'a';
  const markHref = isHome ? '/' : `${homeOrigin}/`;
  const MarkTag: ElementType = isHome ? LinkTag : 'a';

  return (
    <header
      data-scrolled={scrolled || open}
      className="sticky top-0 z-40 border-b border-transparent bg-white/90 backdrop-blur-xl transition-colors duration-200 supports-[backdrop-filter]:bg-white/80 data-[scrolled=true]:border-line"
    >
      <div className="mx-auto flex h-16 w-full max-w-[calc(var(--container-page)+2.5rem)] items-center gap-6 px-5 sm:max-w-[calc(var(--container-page)+4rem)] sm:px-8 lg:gap-10">
        {/* Lockup: mark → kahade.id, label → beranda situs */}
        <div className="flex shrink-0 items-center gap-3">
          <MarkTag
            href={markHref}
            aria-label={isHome ? 'Kahade — beranda' : 'Kahade — ke kahade.id'}
            className="-m-2 inline-flex min-h-11 min-w-11 items-center justify-center rounded-tag p-2"
          >
            <Logo size={26} tone="ink" title="" />
          </MarkTag>
          {info.label && (
            <>
              <span aria-hidden="true" className="h-5 w-px bg-line-strong" />
              <LinkTag
                href="/"
                className="inline-flex min-h-11 items-center rounded-tag text-[15px] font-semibold tracking-[-0.01em] text-fg"
              >
                {info.label}
              </LinkTag>
            </>
          )}
        </div>

        {/* Nav desktop */}
        {nav.length > 0 && (
          <nav aria-label="Navigasi utama" className="hidden h-full lg:block">
            <ul className="flex h-full items-center gap-7">
              {nav.map((item) => {
                const active = isActive(item.href, pathname);
                return (
                  <li key={item.href} className="h-full">
                    <LinkTag
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={[
                        'relative inline-flex h-full items-center text-[15px] font-medium transition-colors duration-150',
                        "after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:content-['']",
                        active
                          ? 'text-fg after:bg-fg'
                          : 'text-fg-muted after:bg-transparent hover:text-fg',
                      ].join(' ')}
                    >
                      {item.label}
                    </LinkTag>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}

        <div className="ml-auto flex items-center gap-2">
          {actions && <div className="hidden items-center gap-2 lg:flex">{actions}</div>}
          {cta && (
            <CtaTag href={cta.href} className={buttonClasses('primary', 'sm', 'hidden sm:inline-flex')}>
              {cta.label}
            </CtaTag>
          )}
          {(nav.length > 0 || mobileFooter) && (
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={open}
              aria-controls={sheetId}
              aria-label={open ? 'Tutup menu' : 'Buka menu'}
              onClick={() => setOpen((v) => !v)}
              className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-fg transition-colors hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg lg:hidden"
            >
              <Icon icon={open ? X : List} size={24} />
            </button>
          )}
        </div>
      </div>

      {/* Lembar menu seluler */}
      <div
        id={sheetId}
        ref={sheetRef}
        hidden={!open}
        className="animate-sheet-in fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto overscroll-contain bg-white lg:hidden"
      >
        <div className="flex min-h-full flex-col px-5 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-8">
          {nav.length > 0 && (
            <nav aria-label="Navigasi seluler">
              <ul>
                {nav.map((item) => {
                  const active = isActive(item.href, pathname);
                  return (
                    <li key={item.href} className="border-b border-line">
                      <LinkTag
                        href={item.href}
                        onClick={close}
                        aria-current={active ? 'page' : undefined}
                        className={`flex min-h-14 items-center text-[22px] font-semibold tracking-[-0.02em] ${active ? 'text-fg' : 'text-fg-2'}`}
                      >
                        {item.label}
                      </LinkTag>
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}

          <div className="mt-10">
            <p className="text-caption font-semibold text-fg-subtle">Kahade</p>
            <ul className="mt-2 grid grid-cols-2 gap-x-6">
              {ECOSYSTEM_ORDER.filter((s) => s !== site).map((s) => (
                <li key={s}>
                  <a
                    href={localizeHref(`${SITES[s].origin}/`, site)}
                    className="flex min-h-11 items-center gap-1 text-small font-medium text-fg-muted hover:text-fg"
                  >
                    {s === 'home' ? 'kahade.id' : SITES[s].label}
                    <Icon icon={ArrowUpRight} size={14} className="text-fg-subtle" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto flex flex-col gap-3 pt-10">
            {mobileFooter}
            {cta && (
              <CtaTag href={cta.href} onClick={close} className={buttonClasses('primary', 'lg', 'w-full')}>
                {cta.label}
              </CtaTag>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
