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
      ? `${weeks} ${weeks === 1 ? "week" : "weeks"}, ${days} ${days === 1 ? "day" : "days"} to comply`
      : "Deadline reached";

  return (
    <div className="border-b border-white/10 bg-indigo-950/40">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-center px-5 sm:px-8">
        <p className="flex items-center gap-3 text-xs uppercase tracking-widest sm:text-[13px]">
          <Timer className="h-4 w-4 flex-none text-indigo-400" />
          <span className="hidden font-medium text-slate-300 sm:inline">Full DPDP enforcement begins</span>
          <span className="font-bold text-white">13 May 2027</span>
          <span className="animate-pulse rounded-full bg-indigo-500/20 px-3 py-1 font-bold text-indigo-200 ring-1 ring-indigo-400/30">
            {left}
          </span>
        </p>
      </div>
    </div>
  );
}