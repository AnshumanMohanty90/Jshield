import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Play, ShieldCheck, Database, AlertTriangle, Cookie, FileText } from "lucide-react";

function Gauge() {
  const score = 92;
  const r = 52;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - score / 100);
  return (
    <div className="relative flex flex-col items-center">
      <svg width="140" height="140" viewBox="0 0 140 140">
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
        <span className="text-3xl font-bold text-white">{score}</span>
        <span className="text-[10px] uppercase tracking-widest text-slate-400">Score</span>
      </div>
    </div>
  );
}

function MockTile({ icon: Icon, label, tone }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
      <Icon className="h-4 w-4 text-indigo-300" />
      <span className="text-xs font-medium text-slate-200">{label}</span>
      <span className={`ml-auto h-1.5 w-1.5 rounded-full ${tone}`} />
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 pb-20 pt-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-indigo-600/25 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-sky-500/20 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-indigo-200"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> DPDP Act 2023 compliance, operationalized
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Turn DPDP compliance into a{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
                daily operational habit
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-5 max-w-xl text-lg leading-relaxed text-slate-300"
            >
              PrivGuard unifies data discovery, consent, vendor risk, breach response and ROPA into one command
              center — so your team stays audit-ready, every day.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Link
                to="/register"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:shadow-indigo-500/50"
              >
                Start free trial <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <Play className="h-4 w-4" /> Book a demo
              </Link>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-5 text-xs text-slate-500"
            >
              No credit card required · 14-day trial · Setup in under an hour
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-2 shadow-2xl shadow-indigo-900/40 backdrop-blur">
              <div className="flex items-center gap-1.5 px-3 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                <span className="ml-3 text-[11px] text-slate-500">privguard.app/dashboard</span>
              </div>
              <div className="grid grid-cols-3 gap-3 rounded-xl bg-slate-950/60 p-4">
                <div className="col-span-1 space-y-2">
                  {["Command", "Discovery", "Consents", "Cookies", "Vendors", "Breaches", "ROPA"].map((x, i) => (
                    <div
                      key={x}
                      className={`flex items-center gap-2 rounded-md px-2.5 py-1.5 text-[11px] ${
                        i === 0 ? "bg-indigo-500/20 text-white" : "text-slate-400"
                      }`}
                    >
                      <span className="h-2 w-2 rounded-sm bg-indigo-400/60" /> {x}
                    </div>
                  ))}
                </div>
                <div className="col-span-2 space-y-3">
                  <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-slate-500">Compliance Posture</div>
                      <div className="text-sm font-semibold text-white">Healthy</div>
                    </div>
                    <Gauge />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <MockTile icon={Database} label="Data Assets" tone="bg-emerald-400" />
                    <MockTile icon={ShieldCheck} label="Consents" tone="bg-emerald-400" />
                    <MockTile icon={AlertTriangle} label="Breaches" tone="bg-amber-400" />
                    <MockTile icon={Cookie} label="Cookies" tone="bg-emerald-400" />
                    <MockTile icon={FileText} label="ROPA" tone="bg-emerald-400" />
                    <MockTile icon={ShieldCheck} label="Vendors" tone="bg-amber-400" />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 hidden rounded-xl border border-white/10 bg-slate-900 px-4 py-3 shadow-xl sm:block">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <AlertTriangle className="h-4 w-4 text-amber-400" /> Breach SLA: 71h remaining
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}