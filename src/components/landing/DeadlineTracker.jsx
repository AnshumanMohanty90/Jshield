import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DEADLINE = new Date("2027-05-13T00:00:00+05:30");
const pad = (n) => String(n).padStart(2, "0");

function parts(ms) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    mins: Math.floor((s % 3600) / 60),
    secs: s % 60,
  };
}

// One unit of the live countdown. The number re-mounts on change so it can slide in.
function Unit({ value, label, width = "w-9" }) {
  return (
    <span className="inline-flex items-baseline gap-1">
      <span
        className={`deadline-digit inline-flex ${width} justify-center overflow-hidden rounded-md bg-white/[0.08] px-1.5 py-0.5 font-semibold tabular-nums text-white`}
      >
        <span key={value} className="deadline-tick">
          {value}
        </span>
      </span>
      <span className="text-[12px] text-slate-400">{label}</span>
    </span>
  );
}

export default function DeadlineTracker() {
  const [ms, setMs] = useState(() => DEADLINE.getTime() - Date.now());

  useEffect(() => {
    const id = setInterval(() => setMs(DEADLINE.getTime() - Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const p = parts(ms);
  const done = ms <= 0;

  return (
    <div className="deadline-band">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-center gap-4 px-5 sm:justify-between sm:px-8">
        <p className="hidden text-[14px] text-slate-200 md:block">
          <span className="font-semibold text-white">13 May 2027:</span> India's data protection rules apply in full.
        </p>

        {done ? (
          <p className="text-[14px] font-semibold text-white">The DPDP Rules now apply in full.</p>
        ) : (
          <p
            className="flex items-center gap-2 text-[14px] sm:gap-3"
            aria-label={`${p.days} days, ${p.hours} hours and ${p.mins} minutes to 13 May 2027`}
          >
            <span className="font-medium text-amber-300 md:hidden">13 May 2027</span>
            <Unit value={p.days} label="days" width="w-11" />
            <Unit value={pad(p.hours)} label="hrs" />
            <Unit value={pad(p.mins)} label="min" />
            <span className="hidden sm:inline-flex" aria-hidden="true">
              <Unit value={pad(p.secs)} label="sec" />
            </span>
          </p>
        )}

        <Link
          to="/assessment"
          className="hidden min-h-[36px] items-center rounded-lg px-3 text-[14px] font-semibold text-amber-300 transition-colors hover:bg-white/5 hover:text-amber-200 lg:inline-flex"
        >
          Check where you stand
        </Link>
      </div>
    </div>
  );
}
