import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import LandingLayout from "@/components/landing/LandingLayout";
import LeadForm, { COMPANY_SIZES } from "@/components/landing/LeadForm";
import usePageTitle from "@/hooks/usePageTitle";
import { QUESTIONS, PRESELECT_KEY } from "@/lib/assessmentQuestions";

const TIERS = [
  { min: 75, label: "Audit-ready", desc: "Most duties are in place. Start a free trial to close what is left before 13 May 2027.", tone: "text-emerald-400", chip: "bg-emerald-500/15 text-emerald-300" },
  { min: 50, label: "On the right track", desc: "You have a base to build on. Start a free trial to close the gaps that matter most.", tone: "text-sky-400", chip: "bg-sky-500/15 text-sky-300" },
  { min: 25, label: "Early stage", desc: "Most duties are not yet in place. Start a free trial to see where to begin.", tone: "text-amber-400", chip: "bg-amber-500/15 text-amber-300" },
  { min: 0, label: "Significant exposure", desc: "Most duties are not yet in place. Start a free trial to build your first controls.", tone: "text-rose-400", chip: "bg-rose-500/15 text-rose-300" },
];

function tierFor(score) {
  return TIERS.find((t) => score >= t.min);
}

export default function Assessment() {
  usePageTitle("Readiness assessment | JShield");
  // Answer picked inline on the home page: open at question one with it selected.
  const preselect = (() => {
    try {
      const v = window.sessionStorage.getItem(PRESELECT_KEY);
      if (v === null) return null;
      window.sessionStorage.removeItem(PRESELECT_KEY);
      return Number(v);
    } catch {
      return null;
    }
  })();
  const [stage, setStage] = useState(preselect !== null ? "questions" : "intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(preselect !== null ? [preselect] : []);
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
      setStage("report");
    }
  };

  const back = () => {
    if (step > 0) setStep(step - 1);
    else setStage("intro");
  };

  return (
    <LandingLayout>
      <AnimatePresence mode="wait">
        {stage === "intro" && (
          <motion.section
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-slate-950 pb-10 pt-32 sm:pb-16 sm:pt-36"
          >
            <div className="mx-auto max-w-3xl px-5 sm:px-8">
              <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
                Free DPDP readiness assessment
              </span>
              <h1 className="mt-3 font-bold leading-[1.1] tracking-tight text-white text-balance">
                Find out where you stand on DPDP, in three minutes.
              </h1>
              <p className="mt-4 max-w-[68ch] text-[17px] leading-[1.6] text-slate-200 text-pretty">
                Answer fourteen questions across every duty in the law. Free. Your score appears as soon as you finish.
              </p>
              <button
                onClick={start}
                className="mt-8 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:shadow-indigo-500/50"
              >
                Start the assessment
              </button>
              <p className="mt-4 text-xs text-slate-400">14 questions · 3 minutes · score on screen</p>
            </div>
          </motion.section>
        )}

        {stage === "questions" && (
          <motion.section
            key="questions"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            // Top padding clears the fixed announcement bar (56px) + header (64px) + 24px,
            // so the question counter row and progress bar are never hidden underneath.
            className="bg-slate-950 pt-[144px] pb-10 sm:pb-16"
          >
            <div className="mx-auto max-w-2xl px-5 sm:px-8">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Question {step + 1} of {total}</span>
                <button onClick={back} className="inline-flex min-h-[44px] items-center text-slate-400 hover:text-white">
                  Back
                </button>
              </div>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-sky-500 transition-all duration-300"
                  style={{ width: `${((step + 1) / total) * 100}%` }}
                />
              </div>

              <h2 className="mt-8 font-bold leading-[1.15] tracking-tight text-white text-balance">
                {QUESTIONS[step].q}
              </h2>
              <div
                className="mt-6 divide-y divide-white/10 overflow-hidden rounded-xl ring-1 ring-white/10"
                role="radiogroup"
                aria-label={QUESTIONS[step].q}
              >
                {QUESTIONS[step].opts.map((o) => {
                  const selected = answers[step] === o.s;
                  return (
                    <button
                      key={o.l}
                      onClick={() => choose(o.s)}
                      role="radio"
                      aria-checked={selected}
                      className={`flex w-full items-center gap-3 px-5 py-4 text-left text-sm transition ${
                        selected ? "bg-indigo-500/15 text-white" : "hover:bg-white/5 text-slate-300"
                      }`}
                    >
                      <span
                        className={`flex h-6 w-6 flex-none items-center justify-center rounded-full border-2 transition ${
                          selected ? "border-indigo-500 bg-indigo-500 text-white" : "border-slate-600"
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

        {stage === "report" && (
          <motion.section
            key="report"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="bg-slate-950 py-10 sm:py-16"
          >
            <div className="mx-auto max-w-3xl px-5 sm:px-8">
              {(() => {
                const t = tierFor(score);
                return (
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">Your score</span>
                    <div className="mt-3 flex items-end gap-3">
                      <span className={`text-6xl font-bold tracking-tight ${t.tone}`}>{score}</span>
                      <span className="mb-2 text-sm text-slate-400">/ 100</span>
                    </div>
                    <p className="mt-3 text-sm text-slate-400">{t.label}</p>
                    <p className="mt-3 max-w-[68ch] text-[17px] leading-[1.6] text-slate-400">{t.desc}</p>

                    <div className="mt-10 border-t border-white/10 pt-10">
                      <h3 className="font-bold text-white text-pretty">
                        Close these gaps with a free 10-day trial.
                      </h3>
                      <div className="mt-6 max-w-xl">
                        <LeadForm
                          intent="trial"
                          sourcePage="/assessment"
                          score={score}
                          fields={[
                            { name: "name", label: "Name", placeholder: "Priya Sharma" },
                            { name: "work_email", label: "Work email", type: "email", placeholder: "you@company.com" },
                            { name: "company", label: "Company", placeholder: "Acme Pvt Ltd" },
                            {
                              name: "company_size",
                              label: "Company size",
                              type: "select",
                              options: COMPANY_SIZES,
                              placeholder: "Select company size",
                            },
                          ]}
                          submitLabel="Start free trial"
                          thankYou="Thank you. Your trial request is in. We will email your login details to you."
                        />
                      </div>
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