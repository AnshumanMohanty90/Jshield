import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "./primitives";

const TABS = [
  {
    key: "consent",
    title: "Customer consent",
    blurb: (
      <>
        Record every customer's permission, show proof at any time, and remove it in one click when they ask.
      </>
    ),
    points: [
      "One list of reasons you collect data, used everywhere",
      "Proof that cannot be changed later",
      "Permission removed in one click, with the history kept",
      "Works on websites, apps and offline forms",
    ],
    mock: { metric: "1,284", label: "Active consents", trend: "+12% this month", bars: [62, 78, 71, 88, 95, 82, 90] },
  },
  {
    key: "breach",
    title: "Breach response",
    blurb: (
      <>
        Spot a breach, judge how serious it is and report it within the legal time limit, with every step on record.
      </>
    ),
    points: [
      "Report an incident and route it by how serious it is",
      "Affected records and root cause tracked in one place",
      "Regulator and customer notices prepared inside the legal window",
      "Every step recorded, from detection to closure",
    ],
    mock: { metric: "71h", label: "left to report the breach", trend: "On track", bars: [30, 45, 60, 72, 55, 40, 35] },
  },
  {
    key: "record",
    title: "Data record",
    blurb: (
      <>
        Keep one live list of the personal data you hold, why you hold it and who you share it with.
      </>
    ),
    points: [
      "One live list of the personal data you hold and why",
      "How long you keep each record, and the reason you hold it",
      "Who you share it with, inside and outside India",
      "Exports ready for any auditor request",
    ],
    mock: { metric: "47", label: "records kept", trend: "3 due for review", bars: [40, 52, 48, 60, 64, 58, 66] },
  },
];

export default function ModuleShowcase() {
  const [active, setActive] = useState("consent");
  const tab = TABS.find((t) => t.key === active);

  return (
    <section id="solution" className="bg-slate-950 py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">What JShield does</span>
          <h2 className="mt-3 text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl text-balance">
            The three jobs that matter most under the law.
          </h2>
        </Reveal>

        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 border-b border-white/10">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={`-mb-px border-b-2 pb-3 text-sm font-medium transition ${
                active === t.key
                  ? "border-white text-white"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              {t.title}
            </button>
          ))}
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
            <p className="mt-2 text-pretty text-slate-400">{tab.blurb}</p>
            <ul className="mt-6">
              {tab.points.map((p) => (
                <li key={p} className="border-t border-white/10 py-3 text-sm text-slate-300">
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">{tab.mock.label}</div>
            <div className="mt-2 text-4xl font-bold text-white">{tab.mock.metric}</div>
            <p className="mt-1 text-sm text-slate-400">{tab.mock.trend}</p>
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
            <p className="mt-3 text-xs text-slate-500">Sample data</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}