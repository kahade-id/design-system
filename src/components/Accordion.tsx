"use client";

import { useEffect, useId, useState, type ReactNode } from 'react';
import { Plus } from '@phosphor-icons/react/dist/ssr';
import { Icon } from '../icons/Icon';

export interface AccordionItemData {
  id: string;
  title: ReactNode;
  content: ReactNode;
  defaultOpen?: boolean;
}

export interface AccordionProps {
  items: AccordionItemData[];
  /** `md` judul 16px (padat), `lg` judul 18–20px (FAQ halaman). */
  size?: 'md' | 'lg';
  /** Tombol dibungkus heading (pola WAI-APG). Default 3. */
  headingLevel?: 2 | 3 | 4;
  className?: string;
}

function AccordionItem({
  item,
  size,
  headingLevel,
}: {
  item: AccordionItemData;
  size: 'md' | 'lg';
  headingLevel: 2 | 3 | 4;
}) {
  const [open, setOpen] = useState(!!item.defaultOpen);
  const buttonId = useId();

  // Tautan langsung ke pertanyaan (#id) membuka item tersebut.
  useEffect(() => {
    const sync = () => {
      if (window.location.hash === `#${item.id}`) setOpen(true);
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, [item.id]);
  const panelId = useId();
  const Heading = `h${headingLevel}` as 'h2' | 'h3' | 'h4';

  return (
    <div id={item.id} className="border-b border-line">
      <Heading className="m-0">
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className={[
            'group flex w-full items-start justify-between gap-6 text-left',
            size === 'lg' ? 'py-5 sm:py-6' : 'py-4',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg focus-visible:ring-offset-2 rounded-tag',
          ].join(' ')}
        >
          <span
            className={`font-semibold text-fg ${size === 'lg' ? 'text-body sm:text-[1.125rem] sm:leading-[1.4]' : 'text-small sm:text-body'}`}
          >
            {item.title}
          </span>
          <span
            aria-hidden="true"
            className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line-strong text-fg transition-[transform,background-color,border-color,color] duration-300 ease-out group-hover:border-fg ${open ? 'rotate-45 border-fg bg-fg text-white' : ''}`}
          >
            <Icon icon={Plus} size={14} weight="bold" />
          </span>
        </button>
      </Heading>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
        inert={!open}
      >
        <div className="overflow-hidden">
          <div
            className={`max-w-[65ch] pr-10 text-fg-muted ${size === 'lg' ? 'pb-6 text-body leading-relaxed' : 'pb-4 text-small'}`}
          >
            {item.content}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Accordion berhairline — FAQ, detail yang bisa dilipat.
 */
export function Accordion({ items, size = 'md', headingLevel = 3, className = '' }: AccordionProps) {
  return (
    <div className={`not-prose border-t border-line ${className}`}>
      {items.map((item) => (
        <AccordionItem key={item.id} item={item} size={size} headingLevel={headingLevel} />
      ))}
    </div>
  );
}
