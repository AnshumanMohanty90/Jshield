import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  ClipboardCheck,
  Loader2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import LandingLayout from "@/components/landing/LandingLayout";
import { base44 } from "@/api/base44Client";

const QUESTIONS = [
  { w: 2, q: "Have you mapped personal data across all systems and data flows?", opts: [{ l: "Not yet", s: 0 }, { l: "Partially", s: 1 }, { l: "Yes, fully", s: 2 }], rec: "Map and classify personal data across every system. Start in Data Discovery." },
  { w: 3, q: "Do you capture and store verifiable consent records with timestamps?", opts: [{ l: "No", s: 0 }, { l: "Some channels", s: 1 }, { l: "Yes, everywhere", s: 2 }], rec: "Stand up purpose-based consent capture with tamper-proof records in Consent Management." },
  { w: 3, q: "Can you fulfil data principal rights requests within statutory timelines?", opts: [{ l: "No process", s: 0 }, { l: "Manual", s: 1 }, { l: "Automated", s: 2 }], rec: "Automate access, correction and erasure workflows in Data Principal Rights." },
  { w: 3, q: "Do you have a documented 72-hour breach notification process?", opts: [{ l: "No", s: 0 }, { l: "Draft", s: 1 }, { l: "Yes, tested", s: 2 }], rec: "Codify your breach response and both-stage DPB + principal notification in Breach Response." },
  { w: 2, q: "Do you maintain a living Record of Processing Activities (ROPA)?", opts: [{ l: "No", s: 0 }, { l: "Outdated", s: 1 }, { l: "Yes, current", s: 2 }], rec: "Keep your ROPA audit-ready with legal basis, retention and transfer scope in ROPA." },
  { w: 2, q: "Have you signed DPAs with all third-party processors?", opts: [{ l: "No", s: 0 }, { l: "Some", s: 1 }, { l: "All", s: 2 }], rec: "Track DPAs, localisation and processor risk in Vendor Risk." },
  { w: 2, q: "Do you run a grievance redressal mechanism with SLA tracking?", opts: [{ l: "No", s: 0 }, { l: "Informal", s: 1 }, { l: "Yes, tracked", s: 2 }], rec: "Route and track grievances within the 90-day SLA in Grievances." },
  { w: 1, q: "Do you have access to a Data Protection Officer?", opts: [{ l: "No", s: 0 }, { l: "Part-time", s: 1 }, { l: "Yes", s: 2 }], rec: "Appoint or source a DPO and centralise governance in the Command Center." },
  { w: 3, q: "Is every consent free, specific and informed (never bundled or pre-ticked)?", opts: [{ l: "Unsure", s: 0 }, { l: "Mostly", s: 1 }, { l: "Always", s: 2 }], rec: "Enforce granular, unbundled consent with clear notices in Consent Management." },
  { w: 2, q: "Do you handle children's data with verifiable parental consent?", opts: [{ l: "No", s: 0 }, { l: "Partially", s: 1 }, { l: "Yes", s: 2 }], rec: "Flag minors' data and verify parental consent before processing in Consent Management." },
  { w: 2, q: "Do you run DPIAs for high-risk or SDF processing?", opts: [{ l: "No", s: 0 }, { l: "Ad hoc", s: 1 }, { l: "Annually", s: 2 }], rec: "Run and review Data Protection Impact Assessments in the DPIA module." },
  { w: 3, q: "Are all seven DPDP Rule 6 security safeguards implemented?", opts: [{ l: "Few", s: 0 }, { l: "Most", s: 1 }, { l: "All", s: 2 }], rec: "Close control gaps in the Security Safeguards register — encryption, access, masking, monitoring, logs, IR and DPAs." },
  { w: 2, q: "Do you track cross-border transfers and their destinations?", opts: [{ l: "No", s: 0 }, { l: "Partially", s: 1 }, { l: "Yes", s: 2 }], rec: "Record transfer destinations on ROPA and vendor records to meet Section 16." },
  { w: 2, q: "Do you enforce retention periods and delete data on schedule?", opts: [{ l: "No", s: 0 }, { l: "Manual", s: 1 }, { l: "Automated", s: 2 }], rec: "Bind retention to erasure workflows so expired personal data is removed on schedule." },
];

const TIERS = [
  { min: 75, label: "Audit-ready", desc: "You are ahead of most peers. Jaguard keeps you there, automatically.", tone: "text-emerald-600", chip: "bg-emerald-50 text-emerald-700" },
  { min: 50, label: "On the right track", desc: "A few critical gaps remain. Jaguard closes them in weeks, not quarters.", tone: "text-sky-600", chip: "bg-sky-50 text-sky-700" },
  { min: 25, label: "Early stage", desc: "Prioritise the fundamentals first. We will show you where to start.", tone: "text-amber-600", chip: "bg-amber-50 text-amber-700" },
  { min: 0, label: "Significant exposure", desc: "Let us build your DPDP roadmap together, starting with a free assessment call.", tone: "text-rose-600", chip: "bg-rose-50 text-rose-700" },
];

function tierFor(score) {
  return TIERS.find((t) => score >= t.min);
}

export default function Assessment() {
  const [stage, setStage] = useState("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [form, setForm] = useState({ work_email: "", company_name: "", designation: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [score, setScore] = useState(0);

  const total = QUESTIONS.length;
  const calcScore = (arr) => {
    const totalW = QUESTIONS.reduce((s, q) => s + q.w, 0);
    const got = QUESTIONS.reduce((s, q, i) => s + q.w * ((arr[i] ?? 0) / 2), 0);
    return Math.round((got / totalW) * 100);
  };

  const start = () => {
    setStage("questions");
    setStep(0);
    setAnswers([]);
  };

  const choose = (s) => {
    const next = [...answers];
    next[step] = s;
    setAnswers(next);
    if (step < total - 1) setStep(step + 1);
    else {
      setScore(calcScore(next));
      setStage("capture");
    }
  };

  const back = () => {
    if (step > 0) setStep(step - 1);
    else setStage("intro");
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.work_email.trim() || !form.company_name.trim() || !form.designation.trim()) {
      setError("Please fill in all fields to receive your report.");
      return;
    }
    setSubmitting(true);
    const t = tierFor(score);
    const summary = QUESTIONS.map((q, i) => (answers[i] < 2 ? q.rec : null))
      .filter(Boolean)
      .join(" | ");
    try {
      await base44.functions.invoke("submitAssessment", {
        ...form,
        score,
        tier: t.label,
        summary,
      });
    } catch (err) {
      // The report is shown regardless; lead capture is best-effort.
    }
    setSubmitting(false);
    setStage("report");
  };

  const gaps = QUESTIONS.map((q, i) => ({ q, score: answers[i] }))
    .filter((x) => x.score < 2)
    .sort((a, b) => a.score - b.score);

  return (
    <LandingLayout>
      <AnimatePresence mode="wait">
        {stage === "intro" && (
          <motion.section
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-slate-950 pb-16 pt-24"
          >
            <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-indigo-200">
                <Sparkles className="h-3.5 w-3.5" /> Free DPDP readiness assessment
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl text-balance">
                Find out where you stand on DPDP, in three minutes.
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-slate-300">
                Answer fourteen questions across every DPDP obligation. Get a readiness score, a prioritised action list,
                and the exact modules that close your gaps. No signup, no credit card.
              </p>
              <button
                onClick={start}
                className="group mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:shadow-indigo-500/50"
              >
                Start the assessment <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </button>
              <p className="mt-4 text-xs text-slate-500">14 questions · 3 minutes · instant report</p>
            </div>
          </motion.section>
        )}

        {stage === "questions" && (
          <motion.section
            key="questions"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="bg-white py-16"
          >
            <div className="mx-auto max-w-2xl px-5 sm:px-8">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Question {step + 1} of {total}</span>
                <button onClick={back} className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800">
                  <ArrowLeft className="h-3.5 w-3.5" /> Back
                </button>
              </div>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-sky-500 transition-all duration-300"
                  style={{ width: `${((step + 1) / total) * 100}%` }}
                />
              </div>

              <h2 className="mt-8 text-2xl font-bold tracking-tight text-slate-900">
                {QUESTIONS[step].q}
              </h2>
              <div className="mt-6 divide-y divide-slate-200 overflow-hidden rounded-xl ring-1 ring-slate-100">
                {QUESTIONS[step].opts.map((o) => {
                  const selected = answers[step] === o.s;
                  return (
                    <button
                      key={o.l}
                      onClick={() => choose(o.s)}
                      className={`flex w-full items-center gap-3 px-5 py-4 text-left text-sm transition ${
                        selected ? "bg-indigo-50 text-slate-900" : "hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <span
                        className={`flex h-6 w-6 flex-none items-center justify-center rounded-full border-2 transition ${
                          selected ? "border-indigo-500 bg-indigo-500 text-white" : "border-slate-300"
                        }`}
                      >
                        {selected && <Check className="h-3.5 w-3.5" />}
                      </span>
                      {o.l}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.section>
        )}

        {stage === "capture" && (
          <motion.section
            key="capture"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="bg-white py-16"
          >
            <div className="mx-auto max-w-md px-5 sm:px-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                <ClipboardCheck className="h-3.5 w-3.5" /> Almost there
              </span>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
                Where should we send your report?
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Your score is ready. Enter your work details and we will generate your prioritised DPDP action plan.
              </p>

              {error && (
                <div className="mt-4 rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>
              )}

              <form onSubmit={submit} className="mt-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Work email</label>
                  <input
                    type="email"
                    value={form.work_email}
                    onChange={(e) => setForm({ ...form, work_email: e.target.value })}
                    placeholder="you@company.com"
                    className="h-11 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Company name</label>
                  <input
                    type="text"
                    value={form.company_name}
                    onChange={(e) => setForm({ ...form, company_name: e.target.value })}
                    placeholder="Acme Pvt Ltd"
                    className="h-11 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Designation</label>
                  <input
                    type="text"
                    value={form.designation}
                    onChange={(e) => setForm({ ...form, designation: e.target.value })}
                    placeholder="Data Protection Officer"
                    className="h-11 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:shadow-indigo-300 disabled:opacity-70"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Generating report...
                    </>
                  ) : (
                    <>
                      Get my report <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-slate-400">
                  We will email your report. No spam, ever.
                </p>
              </form>
            </div>
          </motion.section>
        )}

        {stage === "report" && (
          <motion.section
            key="report"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="bg-slate-50 py-16"
          >
            <div className="mx-auto max-w-3xl px-5 sm:px-8">
              {(() => {
                const t = tierFor(score);
                return (
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600">Your report</span>
                    <div className="mt-3 flex items-end gap-3">
                      <span className={`text-6xl font-bold tracking-tight ${t.tone}`}>{score}</span>
                      <span className="mb-2 text-sm text-slate-400">/ 100</span>
                    </div>
                    <div className={`mt-3 inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${t.chip}`}>
                      {t.label}
                    </div>
                    <p className="mt-3 text-base leading-relaxed text-slate-600">{t.desc}</p>

                    <div className="mt-10">
                      <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-400">
                        Prioritised actions
                      </h3>
                      {gaps.length === 0 ? (
                        <p className="mt-3 text-sm text-slate-600">
                          You have no critical gaps. Jaguard will keep your program audit-ready as obligations evolve.
                        </p>
                      ) : (
                        <ol className="mt-4 space-y-3">
                          {gaps.map((g, i) => (
                            <li key={i} className="flex items-start gap-3 border-t border-slate-200 pt-3">
                              <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                                {i + 1}
                              </span>
                              <div>
                                <p className="text-sm font-medium text-slate-900">{g.q.q}</p>
                                <p className="mt-0.5 text-sm text-slate-600">{g.q.rec}</p>
                              </div>
                            </li>
                          ))}
                        </ol>
                      )}
                    </div>

                    <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                      <Link
                        to="/register"
                        className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:shadow-indigo-300"
                      >
                        Start your 10-day trial <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                      </Link>
                      <Link
                        to="/contact"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                      >
                        <ShieldCheck className="h-4 w-4" /> Book a demo
                      </Link>
                    </div>
                  </div>
                );
              })()}
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </LandingLayout>
  );
}