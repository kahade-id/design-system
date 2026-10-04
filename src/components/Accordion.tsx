import { useId, useState, type ReactNode } from 'react';
import { CaretDown } from '@phosphor-icons/react';
import { Icon } from '../icons/Icon';

export interface AccordionItemData {
  id: string;
  title: ReactNode;
  content: ReactNode;
  defaultOpen?: boolean;
}

export interface AccordionProps {
  items: AccordionItemData[];
  className?: string;
}

function AccordionItem({ item }: { item: AccordionItemData }) {
  const [open, setOpen] = useState(!!item.defaultOpen);
  const buttonId = useId();
  const panelId = useId();

  return (
    <div className="border-b border-neutral-200 last:border-b-0">
      <button
        type="button"
        id={buttonId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-inset"
      >
        <span className="text-sm font-semibold text-black">{item.title}</span>
        <span
          className={`shrink-0 text-neutral-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <Icon icon={CaretDown} size={18} />
        </span>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`grid transition-all duration-200 ease-in-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <div className="pb-4 text-sm text-neutral-600">{item.content}</div>
        </div>
      </div>
    </div>
  );
}

/**
 * Accordion dengan animasi tinggi via grid-template-rows trick.
 */
export function Accordion({ items, className = '' }: AccordionProps) {
  return (
    <div className={className}>
      {items.map((item) => (
        <AccordionItem key={item.id} item={item} />
      ))}
    </div>
  );
}
