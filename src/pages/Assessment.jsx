import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import LandingLayout from "@/components/landing/LandingLayout";
import LeadForm, { COMPANY_SIZES } from "@/components/landing/LeadForm";
import usePageTitle from "@/hooks/usePageTitle";

const QUESTIONS = [
  { w: 2, q: "Have you mapped personal data across all systems and data flows?", opts: [{ l: "Not yet", s: 0 }, { l: "Partially", s: 1 }, { l: "Yes, fully", s: 2 }], rec: "Map and classify personal data across every system. Start in Data Discovery." },
  { w: 3, q: "Do you capture and store verifiable consent records with timestamps?", opts: [{ l: "No", s: 0 }, { l: "Some channels", s: 1 }, { l: "Yes, everywhere", s: 2 }], rec: "Stand up consent capture with proof that cannot be changed later in Consent Management." },
  { w: 3, q: "Can you answer customer requests to see or delete their data within the legal deadlines?", opts: [{ l: "No process", s: 0 }, { l: "Manual", s: 1 }, { l: "Automated", s: 2 }], rec: "Automate the handling of customer requests to see, correct or delete their data in Rights Requests." },
  { w: 3, q: "Do you have a documented 72-hour breach notification process?", opts: [{ l: "No", s: 0 }, { l: "Draft", s: 1 }, { l: "Yes, tested", s: 2 }], rec: "Codify your breach response and both-stage DPB + principal notification in Breach Response." },
  { w: 2, q: "Do you keep one live list of the personal data you hold and why you hold it?", opts: [{ l: "No", s: 0 }, { l: "Outdated", s: 1 }, { l: "Yes, current", s: 2 }], rec: "Keep your data record current with the reason, retention and sharing scope in the Data record module." },
  { w: 2, q: "Have you signed DPAs with all third-party processors?", opts: [{ l: "No", s: 0 }, { l: "Some", s: 1 }, { l: "All", s: 2 }], rec: "Track DPAs, localisation and processor risk in Vendor Risk." },
  { w: 2, q: "Do you run a grievance redressal mechanism with SLA tracking?", opts: [{ l: "No", s: 0 }, { l: "Informal", s: 1 }, { l: "Yes, tracked", s: 2 }], rec: "Route and track grievances within the 90-day SLA in Grievances." },
  { w: 1, q: "Do you have access to a Data Protection Officer?", opts: [{ l: "No", s: 0 }, { l: "Part-time", s: 1 }, { l: "Yes", s: 2 }], rec: "Appoint or source a DPO and set who can see and do what, with a record of every action, in the Command Center." },
  { w: 3, q: "Is every consent free, specific and informed (never bundled or pre-ticked)?", opts: [{ l: "Unsure", s: 0 }, { l: "Mostly", s: 1 }, { l: "Always", s: 2 }], rec: "Enforce granular, unbundled consent with clear notices in Consent Management." },
  { w: 2, q: "Do you handle children's data with verifiable parental consent?", opts: [{ l: "No", s: 0 }, { l: "Partially", s: 1 }, { l: "Yes", s: 2 }], rec: "Flag minors' data and verify parental consent before processing in Consent Management." },
  { w: 2, q: "Do you run DPIAs for high-risk or SDF processing?", opts: [{ l: "No", s: 0 }, { l: "Ad hoc", s: 1 }, { l: "Annually", s: 2 }], rec: "Run and review Data Protection Impact Assessments in the DPIA module." },
  { w: 3, q: "Are all seven DPDP Rule 6 security safeguards implemented?", opts: [{ l: "Few", s: 0 }, { l: "Most", s: 1 }, { l: "All", s: 2 }], rec: "Close control gaps in the Security Safeguards register: encryption, access control, masking, monitoring, log retention, incident response and processor safeguards." },
  { w: 2, q: "Do you track cross-border transfers and their destinations?", opts: [{ l: "No", s: 0 }, { l: "Partially", s: 1 }, { l: "Yes", s: 2 }], rec: "Record transfer destinations in your data record and vendor records to meet Section 16." },
  { w: 2, q: "Do you enforce retention periods and delete data on schedule?", opts: [{ l: "No", s: 0 }, { l: "Manual", s: 1 }, { l: "Automated", s: 2 }], rec: "Bind retention to erasure workflows so expired personal data is removed on schedule." },
];

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
  const [stage, setStage] = useState("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
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
            className="bg-slate-950 pb-12 pt-32 sm:pb-20 sm:pt-36"
          >
            <div className="mx-auto max-w-3xl px-5 sm:px-8">
              <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
                Free DPDP readiness assessment
              </span>
              <h1 className="mt-3 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl text-balance">
                Find out where you stand on DPDP, in three minutes.
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-slate-300 text-pretty">
                Answer fourteen questions across every duty in the law. Free. Your score appears as soon as you finish.
              </p>
              <button
                onClick={start}
                className="mt-8 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:shadow-indigo-500/50"
              >
                Start the assessment
              </button>
              <p className="mt-4 text-xs text-slate-500">14 questions · 3 minutes · score on screen</p>
            </div>
          </motion.section>
        )}

        {stage === "questions" && (
          <motion.section
            key="questions"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="bg-slate-950 py-12 sm:py-20"
          >
            <div className="mx-auto max-w-2xl px-5 sm:px-8">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Question {step + 1} of {total}</span>
                <button onClick={back} className="text-slate-400 hover:text-white">
                  Back
                </button>
              </div>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-sky-500 transition-all duration-300"
                  style={{ width: `${((step + 1) / total) * 100}%` }}
                />
              </div>

              <h2 className="mt-8 text-2xl font-bold tracking-tight text-white">
                {QUESTIONS[step].q}
              </h2>
              <div className="mt-6 divide-y divide-white/10 overflow-hidden rounded-xl ring-1 ring-white/10">
                {QUESTIONS[step].opts.map((o) => {
                  const selected = answers[step] === o.s;
                  return (
                    <button
                      key={o.l}
                      onClick={() => choose(o.s)}
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
            className="bg-slate-950 py-12 sm:py-20"
          >
            <div className="mx-auto max-w-3xl px-5 sm:px-8">
              {(() => {
                const t = tierFor(score);
                return (
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">Your score</span>
                    <div className="mt-3 flex items-end gap-3">
                      <span className={`text-6xl font-bold tracking-tight ${t.tone}`}>{score}</span>
                      <span className="mb-2 text-sm text-slate-500">/ 100</span>
                    </div>
                    <p className={`mt-3 text-sm font-semibold ${t.tone}`}>{t.label}</p>
                    <p className="mt-3 text-base leading-relaxed text-slate-400">{t.desc}</p>

                    <div className="mt-10 border-t border-white/10 pt-10">
                      <h3 className="text-xl font-bold text-white text-pretty">
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