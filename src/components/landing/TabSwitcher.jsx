import { useEffect, useRef, useState } from "react";

// Keyboard-operable tab switcher with a brand-blue bar under the active tab.
// autoMs > 0 enables auto-advance, paused on hover/focus and stopped for good
// once the user selects a tab themselves (click or arrow keys).
export default function TabSwitcher({ id, items, activeKey, onChange, autoMs = 0, ariaLabel = "Switcher" }) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const stoppedRef = useRef(false);
  const activeIndex = items.findIndex((i) => i.key === activeKey);

  useEffect(() => {
    if (!autoMs || stoppedRef.current || hovered || focused) return undefined;
    const timer = setInterval(() => {
      onChange(items[(activeIndex + 1) % items.length].key, false);
    }, autoMs);
    return () => clearInterval(timer);
  }, [autoMs, hovered, focused, activeIndex, items, onChange]);

  const select = (key, manual) => {
    if (manual) stoppedRef.current = true;
    onChange(key, manual);
  };

  const onKeyDown = (e) => {
    let dir = 0;
    if (e.key === "ArrowRight") dir = 1;
    else if (e.key === "ArrowLeft") dir = -1;
    else return;
    e.preventDefault();
    const next = (activeIndex + dir + items.length) % items.length;
    select(items[next].key, true);
    document.getElementById(`${id}-tab-${next}`)?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className="mt-6 flex flex-wrap gap-x-2 gap-y-1"
    >
      {items.map((it, i) => {
        const active = i === activeIndex;
        return (
          <button
            key={it.key}
            id={`${id}-tab-${i}`}
            type="button"
            role="tab"
            aria-selected={active}
            aria-controls={`${id}-panel`}
            tabIndex={active ? 0 : -1}
            onClick={() => select(it.key, true)}
            className={`relative min-h-[44px] px-3 pb-3 pt-2 text-sm font-medium transition-colors duration-150 ${
              active ? "text-white" : "text-slate-300 hover:text-slate-200"
            }`}
          >
            {it.label}
            <span
              aria-hidden="true"
              className={`absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-indigo-400 transition-opacity duration-150 ${
                active ? "opacity-100" : "opacity-0"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}