import { useEffect, useState } from "react";

const DEADLINE = new Date("2027-05-13T00:00:00");
const WEEK = 604800000;
const DAY = 86400000;

export default function DeadlineTracker() {
  const [ms, setMs] = useState(() => DEADLINE.getTime() - Date.now());

  useEffect(() => {
    const id = setInterval(() => setMs(DEADLINE.getTime() - Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const weeks = Math.max(0, Math.floor(ms / WEEK));
  const days = Math.max(0, Math.floor((ms % WEEK) / DAY));
  const left = ms > 0 ? `${weeks} week${weeks === 1 ? "" : "s"}, ${days} day${days === 1 ? "" : "s"} left` : "Deadline reached";

  return (
    <div className="border-b border-white/10 bg-slate-950">
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-between gap-3 px-5 sm:px-8">
        <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-widest text-slate-400">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-indigo-400" />
          </span>
          DPDP readiness deadline · 13 May 2027
        </p>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-white">{left}</p>
      </div>
    </div>
  );
}