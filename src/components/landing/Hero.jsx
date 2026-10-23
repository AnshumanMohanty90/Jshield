import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ClipboardCheck, ShieldCheck, Database, AlertTriangle, Cookie, FileText } from "lucide-react";

function Gauge() {
  const score = 92;
  const r = 52;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - score / 100);
  return (
    <div className="relative flex flex-col items-center">
      <svg width="132" height="132" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
        <motion.circle
          cx="70"
          cy="70"
          r={r}
          fill="none"
          stroke="url(#hg)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.4 }}
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
        <span className="text-2xl font-bold text-white">{score}</span>
        <span className="text-[9px] uppercase tracking-widest text-slate-400">Score</span>
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
    <section className="relative overflow-hidden bg-slate-950 pb-12 pt-28">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.02 }}
              className="text-xs font-semibold uppercase tracking-widest text-indigo-400"
            >
              JShield, part of Jago AI
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-3 text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl text-pretty"
            >
              Get ready for India's data protection law{" "}
              <span className="whitespace-nowrap bg-gradient-to-r from-indigo-400 to-sky-300 bg-clip-text italic text-transparent">
                in 30 days.
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-3 max-w-xl text-lg leading-relaxed text-slate-300"
            >
              One place to record customer consent, find the personal data you hold and report breaches on time, with
              proof ready for any audit.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mt-6 flex flex-col gap-3 sm:flex-row"
            >
              <Link
                to="/assessment"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:shadow-indigo-500/50"
              >
                <ClipboardCheck className="h-4 w-4" /> Check your readiness
              </Link>
              <Link
                to="/trial"
                className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Start free trial <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="mt-4 text-xs leading-relaxed text-slate-500"
            >
              Built from the text of India's DPDP Act, Europe's GDPR and the US SOC 2 security standard
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-2xl bg-slate-900/70 p-2 shadow-2xl shadow-indigo-900/40 ring-1 ring-white/10 backdrop-blur">
              <div className="flex items-center gap-1.5 px-3 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                <span className="ml-3 text-[11px] text-slate-500">jshield.app/dashboard</span>
              </div>
              <div className="grid grid-cols-3 overflow-hidden rounded-xl bg-slate-950/60">
                <div className="col-span-1 divide-y divide-white/5 border-r border-white/5">
                  {NAV_ITEMS.map((x, i) => (
                    <div
                      key={x}
                      className={`flex items-center gap-2 px-3 py-2 text-[11px] ${
                        i === 0 ? "bg-indigo-500/20 text-white" : "text-slate-400"
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-sm bg-indigo-400/60" /> {x}
                    </div>
                  ))}
                </div>
                <div className="col-span-2">
                  <div className="flex items-center justify-between px-4 py-4">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-slate-500">Compliance posture</div>
                      <div className="text-sm font-semibold text-white">Healthy</div>
                    </div>
                    <Gauge />
                  </div>
                  <div className="divide-y divide-white/5 border-t border-white/5">
                    {STATUS_ROWS.map((r) => {
                      const Icon = r.icon;
                      return (
                        <div key={r.label} className="flex items-center gap-2.5 px-4 py-2.5 text-[11px] text-slate-300">
                          <Icon className="h-3.5 w-3.5 text-indigo-300" />
                          <span>{r.label}</span>
                          <span className={`ml-auto h-1.5 w-1.5 rounded-full ${r.tone}`} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <p className="px-3 pb-2 pt-1 text-[10px] text-slate-500">Sample data</p>
            </div>
            <div className="absolute -bottom-4 -right-4 hidden rounded-xl bg-slate-900 px-4 py-3 shadow-xl ring-1 ring-white/10 sm:block">
              <div className="text-xs text-slate-300">71h left in the breach reporting window</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}