import { useState } from "react";
import { useInView } from "./primitives";

// Horizontal stepper: a progress bar fills across the steps when the section
// scrolls into view; clicking a step shows its detail. Step one is open by default.
export default function Stepper({ steps, ariaLabel = "Steps", className = "mt-8" }) {
  const [active, setActive] = useState(0);
  const [trackRef, filled] = useInView(0.15);

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, steps.length - 1));
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    }
  };

  return (
    <div ref={trackRef} className={className}>
      <div role="tablist" aria-label={ariaLabel} onKeyDown={onKeyDown} className="relative flex">
        <div className="absolute inset-x-0 top-[19px] h-0.5 rounded-full bg-white/10" />
        <div
          className="absolute left-0 top-[19px] h-0.5 rounded-full bg-indigo-400 transition-[width] duration-1000 ease-out"
          style={{ width: filled ? "100%" : "0%" }}
        />
        {steps.map((s, i) => {
          const isActive = i === active;
          return (
            <button
              key={s.title}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(i)}
              className="relative z-10 flex min-h-[44px] min-w-0 flex-1 flex-col items-center gap-2 px-1"
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors duration-150 ${
                  isActive
                    ? "border-indigo-400 bg-indigo-500 text-white"
                    : i < active
                      ? "border-indigo-400/60 bg-slate-950 text-indigo-300"
                      : "border-white/15 bg-slate-950 text-slate-400"
                }`}
              >
                {i + 1}
              </span>
              <span
                className={`min-w-0 text-center text-xs leading-snug sm:text-sm ${
                  isActive ? "text-white" : "text-slate-400"
                }`}
              >
                {s.title}
              </span>
            </button>
          );
        })}
      </div>
      <div role="tabpanel" className="mt-8">
        <h3 className="text-white">{steps[active].title}</h3>
        <p className="mt-2 max-w-[68ch] text-[17px] leading-[1.6] text-slate-300">{steps[active].desc}</p>
      </div>
    </div>
  );
}