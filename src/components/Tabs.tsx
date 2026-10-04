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
  className?: string;
}

/**
 * Tabs gaya underline. Keyboard: panah kiri/kanan, Home, End.
 * Roving tabindex — hanya tab aktif yang bisa di-Tab.
 */
export function Tabs({ tabs, activeId, onChange, renderPanel, className = '' }: TabsProps) {
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
        aria-label="Tab"
        onKeyDown={onKeyDown}
        className="flex gap-1 overflow-x-auto border-b border-neutral-200"
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
              className={[
                'relative shrink-0 px-4 py-2.5 text-sm font-semibold whitespace-nowrap',
                'transition-all duration-150',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-inset',
                'disabled:cursor-not-allowed disabled:text-neutral-400',
                active ? 'text-black' : 'text-neutral-500 hover:bg-neutral-100 hover:text-black',
                "after:content-[''] after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:rounded-full after:transition-all after:duration-200",
                active ? 'after:scale-x-100 after:bg-black' : 'after:scale-x-0 after:bg-transparent',
              ].join(' ')}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {renderPanel && (
        <div
          role="tabpanel"
          id={panelId}
          aria-labelledby={`${baseId}-tab-${activeId}`}
          tabIndex={0}
          className="animate-fade-in pt-4 focus:outline-none"
        >
          {renderPanel(activeId)}
        </div>
      )}
    </div>
  );
}
