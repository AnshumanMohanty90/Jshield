import { Database, ShieldCheck, AlertTriangle, Cookie, FileText } from "lucide-react";
import { CtaPrimary, CtaSecondary } from "./Buttons";

function Gauge() {
  const score = 92;
  const r = 52;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - score / 100);
  return (
    <div className="relative flex flex-col items-center">
      <svg width="132" height="132" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
        <circle
          cx="70"
          cy="70"
          r={r}
          fill="none"
          stroke="url(#hg)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          transform="rotate(-90 70 70)"
        />
        <defs>
          <linearGradient id="hg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[24px] font-bold leading-tight text-white stat-figure">{score}</span>
        <span className="text-[12px] text-slate-300">Score</span>
      </div>
    </div>
  );
}

const NAV_ITEMS = ["Command", "Discovery", "Consents", "Cookies", "Vendors", "Breaches", "Data record"];

const STATUS_ROWS = [
  { icon: Database, label: "Data assets", tone: "bg-emerald-400" },
  { icon: ShieldCheck, label: "Consents", tone: "bg-emerald-400" },
  { icon: AlertTriangle, label: "Breaches", tone: "bg-amber-400" },
  { icon: Cookie, label: "Cookies", tone: "bg-emerald-400" },
  { icon: FileText, label: "Data record", tone: "bg-emerald-400" },
  { icon: ShieldCheck, label: "Vendors", tone: "bg-amber-400" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 pb-14 pt-32 lg:pb-[88px] lg:pt-36">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="text-[16px] font-semibold text-indigo-300">
              DPDP Act compliance, with GDPR and SOC 2
            </span>
            <h1 className="mt-3 font-bold leading-[1.1] tracking-tight text-white text-balance">
              Get ready for the DPDP Act in 30 days.
            </h1>
            <p className="mt-3 max-w-[68ch] text-[18px] leading-[1.6] text-slate-200 text-pretty">
              Record customer consent, find the personal data you hold and report breaches on time, with proof for any
              audit.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <CtaPrimary to="/assessment">Check your readiness</CtaPrimary>
              <CtaSecondary to="/trial">Start free trial</CtaSecondary>
            </div>
            <p className="mt-4 text-[16px] font-semibold text-white">Free readiness check. It takes about 4 minutes and shows your score at the end.</p>
            <p className="mt-2 text-sm text-slate-300">Covers the main duties in the DPDP Act and DPDP Rules 2025. Controls shared with GDPR and SOC 2 are tracked once.</p>
          </div>

          <div className="relative">
            <div className="rounded-2xl bg-slate-900/70 p-2 shadow-2xl shadow-indigo-900/40 ring-1 ring-white/10 backdrop-blur">
              <div className="flex items-center gap-1.5 px-3 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                <span className="ml-3 text-[12px] text-slate-300">app.jshield.ai</span>
              </div>
              <div className="grid grid-cols-3 overflow-hidden rounded-xl bg-slate-950/60">
                <div className="col-span-1 border-r border-white/5">
                  {NAV_ITEMS.map((x, i) => (
                    <div
                      key={x}
                      className={`flex items-center gap-2 px-3 py-2 text-[12px] ${
                        i === 0 ? "bg-indigo-500/20 text-white" : "text-slate-300"
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-sm bg-indigo-400/60" /> {x}
                    </div>
                  ))}
                </div>
                <div className="col-span-2">
                  <div className="flex items-center justify-between px-4 py-3">
                    <div>
                      <div className="text-[12px] text-slate-300">Readiness</div>
                      <div className="text-sm font-semibold text-white">Healthy</div>
                    </div>
                    <Gauge />
                  </div>
                  <div>
                    {STATUS_ROWS.map((r) => {
                      const Icon = r.icon;
                      return (
                        <div key={r.label} className="flex items-center gap-2.5 px-4 py-2.5 text-[12px] text-slate-200">
                          <Icon className="h-3.5 w-3.5 text-indigo-300" />
                          <span>{r.label}</span>
                          <span className={`ml-auto h-1.5 w-1.5 rounded-full ${r.tone}`} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <p className="px-3 pb-2 pt-1 text-[12px] text-slate-300">Sample data</p>
            </div>
            <div className="absolute -bottom-4 -right-4 hidden rounded-xl bg-slate-900 px-4 py-3 shadow-xl ring-1 ring-white/10 sm:block">
              <div className="text-xs text-slate-200">71 hours left to report a breach</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}