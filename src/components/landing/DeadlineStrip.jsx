import { Link } from "react-router-dom";

const WEEKS = [
  { week: "Week 1", label: "Discover" },
  { week: "Week 2", label: "Consent" },
  { week: "Week 3", label: "Safeguards" },
  { week: "Week 4", label: "Audit-ready" },
];

export default function DeadlineStrip() {
  return (
    <Link
      to="/assessment"
      title="A preparation sequence recommended by Jaguard. Official DPDP obligation dates follow the notified commencement schedule."
      className="block border-b border-white/10 bg-slate-900"
    >
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <span className="flex items-center gap-2 text-[11px] font-medium text-slate-200">
          <span className="h-1.5 w-1.5 flex-none rounded-full bg-emerald-400" />
          DPDP readiness countdown: 30 days to audit-ready posture
        </span>
        <span className="hidden items-center gap-3 text-[11px] text-slate-400 md:flex">
          {WEEKS.map((w, i) => (
            <span key={w.week} className="flex items-center gap-3">
              <span>
                <span className="font-semibold text-slate-200">{w.week}</span> {w.label}
              </span>
              {i < WEEKS.length - 1 && <span className="text-slate-700">·</span>}
            </span>
          ))}
        </span>
      </div>
    </Link>
  );
}