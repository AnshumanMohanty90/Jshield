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
  const left =
    ms > 0
      ? `${weeks} ${weeks === 1 ? "week" : "weeks"}, ${days} ${days === 1 ? "day" : "days"} to go`
      : "Deadline reached";

  return (
    <div className="border-b border-white/10 bg-slate-950">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-center px-5 sm:px-8">
        <p className="text-xs font-medium text-slate-300 sm:text-[13px]">
          <span className="whitespace-nowrap font-bold text-red-400">13 May 2027:</span>{" "}
          <span className="hidden sm:inline">India's new data protection rules apply in full. </span>
          <span className="whitespace-nowrap font-bold text-red-300">{left}</span>
        </p>
      </div>
    </div>
  );
}