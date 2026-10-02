import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, AlertTriangle, FileText, Check } from "lucide-react";
import { Reveal } from "./primitives";

const TABS = [
  {
    key: "consent",
    icon: ShieldCheck,
    title: "Consent Management",
    blurb: "Capture, prove and withdraw consent with cryptographic artifacts on every record.",
    points: [
      "Purpose-based consent catalogs",
      "Tamper-proof consent hashes",
      "One-click withdrawal with full audit trail",
      "Multi-channel capture across web, app and offline",
    ],
    mock: { metric: "1,284", label: "Active consents", trend: "+12% this month", bars: [62, 78, 71, 88, 95, 82, 90] },
  },
  {
    key: "breach",
    icon: AlertTriangle,
    title: "Breach Response",
    blurb: "Run the full incident lifecycle inside the 72-hour notification window.",
    points: [
      "Severity-based incident routing",
      "Root-cause and affected record tracking",
      "One-click regulator notification",
      "Containment through resolution playbook",
    ],
    mock: { metric: "71h", label: "to DPB notification", trend: "SLA on track", bars: [30, 45, 60, 72, 55, 40, 35] },
  },
  {
    key: "ropa",
    icon: FileText,
    title: "Records of Processing",
    blurb: "Keep records of processing audit-ready with legal basis, retention and ownership on every activity.",
    points: [
      "Auto-generated processing inventory",
      "Legal basis and retention tagging",
      "Owner assignment and review cycles",
      "Export-ready for audits",
    ],
    mock: { metric: "47", label: "processing activities", trend: "3 due for review", bars: [40, 52, 48, 60, 64, 58, 66] },
  },
];

export default function ModuleShowcase() {
  const [active, setActive] = useState("consent");
  const tab = TABS.find((t) => t.key === active);

  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600">Product</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Built for the moments that matter</h2>
          <p className="mt-4 text-lg text-slate-600">Three workflows that decide whether you are compliant or exposed.</p>
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-2">
          {TABS.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                  active === t.key
                    ? "bg-slate-900 text-white"
                    : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100"
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
          className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-12"
        >
          <div>
            <h3 className="text-xl font-semibold text-slate-900">{tab.title}</h3>
            <p className="mt-2 text-slate-600">{tab.blurb}</p>
            <ul className="mt-6 space-y-3">
              {tab.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <Check className="h-3 w-3" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-slate-950 p-6 shadow-lg shadow-slate-300/50">
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