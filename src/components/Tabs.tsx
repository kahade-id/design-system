"use client";

import { useId, useRef, type KeyboardEvent, type ReactNode } from 'react';

export interface TabItem {
  id: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  /** Render panel untuk tab aktif (role="tabpanel"). Opsional. */
  renderPanel?: (activeId: string) => ReactNode;
  /** `underline` (default) atau `segmented` (pil di atas mist). */
  variant?: 'underline' | 'segmented';
  /** Label aksesibel daftar tab. */
  label?: string;
  className?: string;
}

/**
 * Tabs gaya underline. Keyboard: panah kiri/kanan, Home, End.
 * Roving tabindex — hanya tab aktif yang bisa di-Tab.
 */
export function Tabs({
  tabs,
  activeId,
  onChange,
  renderPanel,
  variant = 'underline',
  label = 'Tab',
  className = '',
}: TabsProps) {
  const segmented = variant === 'segmented';
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const enabledIndexes = tabs
    .map((t, i) => (t.disabled ? -1 : i))
    .filter((i) => i >= 0);

  const focusTab = (index: number) => {
    const tab = tabs[index];
    if (!tab || tab.disabled) return;
    onChange(tab.id);
    tabRefs.current[index]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = tabs.findIndex((t) => t.id === activeId);
    const pos = enabledIndexes.indexOf(currentIndex);
    if (pos === -1) return;
    let next: number | null = null;
    if (e.key === 'ArrowRight') next = enabledIndexes[(pos + 1) % enabledIndexes.length];
    else if (e.key === 'ArrowLeft')
      next = enabledIndexes[(pos - 1 + enabledIndexes.length) % enabledIndexes.length];
    else if (e.key === 'Home') next = enabledIndexes[0];
    else if (e.key === 'End') next = enabledIndexes[enabledIndexes.length - 1];
    if (next !== null && next !== undefined) {
      e.preventDefault();
      focusTab(next);
    }
  };

  const panelId = `${baseId}-panel`;

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label={label}
        onKeyDown={onKeyDown}
        className={
          segmented
            ? 'inline-flex max-w-full gap-1 overflow-x-auto rounded-full bg-surface-2 p-1'
            : 'flex gap-6 overflow-x-auto border-b border-line'
        }
      >
        {tabs.map((tab, i) => {
          const active = tab.id === activeId;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${tab.id}`}
              aria-selected={active}
              aria-controls={renderPanel ? panelId : undefined}
              tabIndex={active ? 0 : -1}
              disabled={tab.disabled}
              onClick={() => onChange(tab.id)}
              className={
                segmented
                  ? [
                      'h-10 shrink-0 rounded-full px-5 text-small font-semibold whitespace-nowrap',
                      'transition-[background-color,color,box-shadow] duration-200',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg focus-visible:ring-inset',
                      'disabled:cursor-not-allowed disabled:text-fg-subtle',
                      active ? 'bg-surface text-fg shadow-soft' : 'text-fg-muted hover:text-fg',
                    ].join(' ')
                  : [
                      'relative min-h-11 shrink-0 pb-3 pt-2 text-small font-semibold whitespace-nowrap',
                      'transition-colors duration-150',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg focus-visible:ring-inset',
                      'disabled:cursor-not-allowed disabled:text-fg-subtle',
                      active ? 'text-fg' : 'text-fg-muted hover:text-fg',
                      "after:content-[''] after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:transition-transform after:duration-200",
                      active ? 'after:scale-x-100 after:bg-fg' : 'after:scale-x-0 after:bg-transparent',
                    ].join(' ')
              }
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {renderPanel && (
        <div
          key={activeId}
          role="tabpanel"
          id={panelId}
          aria-labelledby={`${baseId}-tab-${activeId}`}
          tabIndex={0}
          className="animate-fade-in pt-6 focus:outline-none"
        >
          {renderPanel(activeId)}
        </div>
      )}
    </div>
  );
}
