import { useEffect, useState } from "react";
import { Timer } from "lucide-react";

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
  const left =
    ms > 0
      ? `${weeks} ${weeks === 1 ? "week" : "weeks"}, ${days} ${days === 1 ? "day" : "days"} left`
      : "Deadline reached";

  return (
    <div className="border-b border-white/10 bg-slate-950">
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-center px-5 sm:px-8">
        <p className="flex items-center gap-2.5 text-[11px] uppercase tracking-widest">
          <Timer className="h-3.5 w-3.5 text-indigo-400" />
          <span className="hidden font-medium text-slate-400 sm:inline">DPDP readiness deadline</span>
          <span className="font-bold text-white">13 May 2027</span>
          <span className="animate-pulse rounded-full bg-indigo-500/20 px-2 py-0.5 font-bold text-indigo-200 ring-1 ring-indigo-400/30">
            {left}
          </span>
        </p>
      </div>
    </div>
  );
}