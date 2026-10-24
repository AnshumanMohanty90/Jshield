import { useState } from "react";
import { ChevronDown } from "lucide-react";

// One line visible per item, click to open. The first item is open by default.
export default function Accordion({ items, className = "mt-6" }) {
  const [open, setOpen] = useState(0);

  return (
    <div className={className}>
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.title} className="row-hover">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex min-h-[44px] w-full items-center justify-between gap-4 py-4 text-left"
            >
              <h3 className="text-white">{it.title}</h3>
              <ChevronDown
                className={`h-4 w-4 flex-none text-slate-400 transition-transform duration-150 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden">
                <p className="pb-4 text-[18px] leading-[1.6] text-slate-300">{it.desc}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}