import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, ArrowRight, RotateCcw } from "lucide-react";

const ITEMS = [
  "We maintain a living record of processing activities (ROPA).",
  "We capture and store verifiable consent records with timestamps.",
  "We fulfil data principal rights requests within statutory timelines.",
  "We have a documented 72-hour breach notification process.",
  "We have classified personal data across all systems and data flows.",
  "We have signed data processing agreements with every processor.",
  "We run a grievance redressal mechanism with SLA tracking.",
  "We have appointed, or have on-demand access to, a data protection officer.",
];

const VERDICTS = [
  { min: 75, tone: "emerald", label: "Audit-ready", desc: "You are ahead of most peers. Jaguard keeps you there, automatically." },
  { min: 50, tone: "sky", label: "On the right track", desc: "A few critical gaps remain. Jaguard closes them in weeks, not quarters." },
  { min: 25, tone: "amber", label: "Early stage", desc: "Prioritise consent, ROPA and breach response first." },
  { min: 0, tone: "rose", label: "Significant exposure", desc: "Build your DPDP roadmap with us, starting with a free assessment." },
];

const TONES = {
  emerald: { bar: "from-emerald-500 to-emerald-400", text: "text-emerald-600", chip: "bg-emerald-50 text-emerald-700" },
  sky: { bar: "from-sky-500 to-sky-400", text: "text-sky-600", chip: "bg-sky-50 text-sky-700" },
  amber: { bar: "from-amber-500 to-amber-400", text: "text-amber-600", chip: "bg-amber-50 text-amber-700" },
  rose: { bar: "from-rose-500 to-rose-400", text: "text-rose-600", chip: "bg-rose-50 text-rose-700" },
};

function verdictFor(score) {
  return VERDICTS.find((v) => score >= v.min);
}

export default function ReadinessQuiz() {
  const [checked, setChecked] = useState(() => new Array(ITEMS.length).fill(false));

  const score = useMemo(
    () => Math.round((checked.filter(Boolean).length / ITEMS.length) * 100),
    [checked]
  );
  const v = verdictFor(score);
  const tone = TONES[v.tone];

  const toggle = (i) => setChecked((p) => p.map((x, k) => (k === i ? !x : x)));
  const reset = () => setChecked(new Array(ITEMS.length).fill(false));

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600">Interactive</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            How DPDP-ready are you, really?
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Check the statements that hold true today. Your score updates live, with no email required.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          <div className="divide-y divide-slate-200 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-100 lg:col-span-3">
            {ITEMS.map((item, i) => {
              const on = checked[i];
              return (
                <button
                  key={i}
                  onClick={() => toggle(i)}
                  className={`flex w-full items-start gap-3 px-5 py-4 text-left transition ${
                    on ? "bg-indigo-50/60" : "hover:bg-slate-50"
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-md border-2 transition ${
                      on ? "border-indigo-500 bg-indigo-500 text-white" : "border-slate-300 text-transparent"
                    }`}
                  >
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className={`text-sm leading-snug ${on ? "text-slate-900" : "text-slate-700"}`}>{item}</span>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-xl bg-slate-50 p-6 shadow-sm ring-1 ring-slate-100 lg:sticky lg:top-24">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Your readiness score
                </span>
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-slate-600"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Reset
                </button>
              </div>
              <div className="mt-4 flex items-end gap-2">
                <motion.span
                  key={score}
                  initial={{ scale: 0.9, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`text-5xl font-bold tracking-tight ${tone.text}`}
                >
                  {score}
                </motion.span>
                <span className="mb-1.5 text-sm text-slate-400">/ 100</span>
              </div>
              <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${tone.bar}`}
                  animate={{ width: `${score}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <div className={`mt-4 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${tone.chip}`}>
                {v.label}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{v.desc}</p>
              <Link
                to="/register"
                className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:shadow-indigo-300"
              >
                See how Jaguard closes your gaps <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
              <p className="mt-3 text-center text-xs text-slate-400">
                {checked.filter(Boolean).length} of {ITEMS.length} obligations covered
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}