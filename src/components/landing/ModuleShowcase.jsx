import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, AlertTriangle, FileText, Check } from "lucide-react";
import { Reveal } from "./primitives";

const TABS = [
  {
    key: "consent",
    icon: ShieldCheck,
    title: "Consent Management",
    blurb:
      "Solves consent governance end to end: every permission captured against a declared purpose, proven with a tamper-evident record, and withdrawable in a single action.",
    points: [
      "A central catalog of purposes every channel captures consent against",
      "Tamper-proof hashes that prove each consent in an audit",
      "Withdrawal handled in one action, with the full trail preserved",
      "Capture across web, app, API and offline channels",
    ],
    mock: { metric: "1,284", label: "Active consents", trend: "+12% this month", bars: [62, 78, 71, 88, 95, 82, 90] },
  },
  {
    key: "breach",
    icon: AlertTriangle,
    title: "Breach Response",
    blurb:
      "Solves the 72-hour problem: detection, investigation, containment and Board notification run as one workflow, so nothing is improvised under pressure.",
    points: [
      "Incident intake with severity-based routing",
      "Affected records and root cause tracked in one place",
      "Board notification prepared inside the 72-hour window",
      "Containment through resolution as a single workflow",
    ],
    mock: { metric: "71h", label: "to DPB notification", trend: "SLA on track", bars: [30, 45, 60, 72, 55, 40, 35] },
  },
  {
    key: "ropa",
    icon: FileText,
    title: "Records of Processing",
    blurb:
      "Solves the audit question: every processing activity documented with legal basis, retention and ownership, maintained continuously instead of rebuilt annually.",
    points: [
      "A processing inventory that keeps itself current",
      "Legal basis and retention attached to every activity",
      "Owners and review cycles so records never go stale",
      "Exports shaped for regulator and auditor requests",
    ],
    mock: { metric: "47", label: "processing activities", trend: "3 due for review", bars: [40, 52, 48, 60, 64, 58, 66] },
  },
];

export default function ModuleShowcase() {
  const [active, setActive] = useState("consent");
  const tab = TABS.find((t) => t.key === active);

  return (
    <section id="solution" className="bg-slate-950 py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">Proof over paperwork</span>
          <h2 className="mt-3 text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl text-balance">
            Solutions for the obligations that decide your exposure
          </h2>
          <p className="mt-3 text-lg text-slate-400">
            Three workflows where proof matters most, solved as product rather than paperwork.
          </p>
        </Reveal>

        <div className="mt-8 flex flex-wrap gap-2">
          {TABS.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                  active === t.key
                    ? "bg-white text-slate-900"
                    : "bg-white/5 text-slate-300 ring-1 ring-white/10 hover:bg-white/10"
                }`}
              >
                <Icon className="h-4 w-4" /> {t.title}
              </button>
            );
          })}
        </div>

        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-10"
        >
          <div>
            <h3 className="text-xl font-semibold text-white">{tab.title}</h3>
            <p className="mt-2 text-slate-400">{tab.blurb}</p>
            <ul className="mt-6 space-y-3">
              {tab.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                    <Check className="h-3 w-3" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-slate-900 p-6 ring-1 ring-white/10 shadow-lg shadow-black/40">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-widest text-slate-500">{tab.mock.label}</div>
                <div className="mt-1 text-4xl font-bold text-white">{tab.mock.metric}</div>
              </div>
              <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-medium text-emerald-400">
                {tab.mock.trend}
              </span>
            </div>
            <div className="mt-6 flex h-32 items-end gap-2">
              {tab.mock.bars.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="flex-1 rounded-t-md bg-gradient-to-t from-indigo-600 to-sky-400"
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}