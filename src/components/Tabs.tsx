import { useId, type ReactNode } from 'react';

export interface TabItem {
  id: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

/**
 * Tabs gaya underline. Keyboard accessible (button native).
 */
export function Tabs({ tabs, activeId, onChange, className = '' }: TabsProps) {
  const listId = useId();
  return (
    <div
      role="tablist"
      aria-labelledby={listId}
      className={`flex gap-1 overflow-x-auto border-b border-neutral-200 ${className}`}
    >
      {tabs.map((tab) => {
        const active = tab.id === activeId;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={active}
            disabled={tab.disabled}
            onClick={() => onChange(tab.id)}
            className={[
              'relative shrink-0 px-4 py-2.5 text-sm font-semibold whitespace-nowrap',
              'transition-colors duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-inset',
              'disabled:text-neutral-400 disabled:cursor-not-allowed',
              active ? 'text-black' : 'text-neutral-500 hover:text-black',
              "after:content-[''] after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:rounded-full after:transition-all after:duration-150",
              active ? 'after:bg-black' : 'after:bg-transparent',
            ].join(' ')}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
