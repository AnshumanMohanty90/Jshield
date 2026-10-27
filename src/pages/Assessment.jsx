import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import LandingLayout from "@/components/landing/LandingLayout";
import LeadForm, { COMPANY_SIZES } from "@/components/landing/LeadForm";
import usePageTitle from "@/hooks/usePageTitle";
import { ANSWER_OPTIONS, PROFILE, PRESELECT_KEY, buildQuiz, computeResult } from "@/lib/assessmentQuestions";

const DEADLINE = new Date("2027-05-13T00:00:00");
const WEEK = 604800000;
const DAY = 86400000;

const PROGRESS_KEY = "jshield_assessment_progress";

// Saved progress lets a refresh, the browser Back button or a second tab resume
// the assessment at the same question with the answers kept.
function loadProgress() {
  try {
    const saved = JSON.parse(window.sessionStorage.getItem(PROGRESS_KEY));
    if (!saved || !["quiz", "report"].includes(saved.stage)) return null;
    if (typeof saved.idx !== "number" || saved.idx < 0) return null;
    if (!saved.profile || typeof saved.profile !== "object") return null;
    if (!saved.answers || typeof saved.answers !== "object") return null;
    return saved;
  } catch {
    return null;
  }
}

function useCountdown() {
  const [ms, setMs] = useState(() => DEADLINE.getTime() - Date.now());
  useEffect(() => {
    const id = setInterval(() => setMs(DEADLINE.getTime() - Date.now()), 30000);
    return () => clearInterval(id);
  }, []);
  return {
    weeks: Math.max(0, Math.floor(ms / WEEK)),
    days: Math.max(0, Math.floor((ms % WEEK) / DAY)),
  };
}

export default function Assessment() {
  usePageTitle("Readiness assessment | JShield", "Answer a short set of questions to see how ready your company is for data protection laws such as the DPDP Act and GDPR.");
  // Answer picked inline on the home page: open at the first question with it saved for Q20.
  const preselect = (() => {
    try {
      const v = window.sessionStorage.getItem(PRESELECT_KEY);
      if (v === null) return null;
      window.sessionStorage.removeItem(PRESELECT_KEY);
      const i = Number(v);
      return i >= 0 && i <= 3 ? i : null;
    } catch {
      return null;
    }
  })();

  const restored = (() => {
    if (preselect !== null) return { stage: "quiz", idx: 0, profile: {}, answers: { Q20: preselect } };
    const saved = loadProgress();
    if (!saved) return null;
    const done = PROFILE.every((p) => saved.profile[p.id] != null);
    if (saved.stage === "quiz") {
      const total = done ? PROFILE.length + buildQuiz(saved.profile).scored.length : PROFILE.length;
      return {
        stage: "quiz",
        idx: Math.min(saved.idx, total - 1),
        profile: saved.profile,
        answers: saved.answers,
      };
    }
    if (done && buildQuiz(saved.profile).scored.every((q) => saved.answers[q.id] != null)) {
      return { stage: "report", idx: PROFILE.length, profile: saved.profile, answers: saved.answers };
    }
    return null;
  })();

  const [stage, setStage] = useState(restored ? restored.stage : "intro");
  const [idx, setIdx] = useState(restored ? restored.idx : 0);
  const [profile, setProfile] = useState(restored ? restored.profile : {});
  const [answers, setAnswers] = useState(restored ? restored.answers : {});
  const [result, setResult] = useState(
    restored && restored.stage === "report" ? computeResult(restored.profile, restored.answers) : null
  );
  const [showHow, setShowHow] = useState(false);
  const { weeks, days } = useCountdown();

  useEffect(() => {
    if (stage !== "quiz" && stage !== "report") return;
    try {
      window.sessionStorage.setItem(PROGRESS_KEY, JSON.stringify({ stage, idx, profile, answers }));
    } catch {
      // Storage unavailable: the assessment still runs, it just does not resume.
    }
  }, [stage, idx, profile, answers]);

  const clearProgress = () => {
    try {
      window.sessionStorage.removeItem(PROGRESS_KEY);
    } catch {
      // Nothing to clear.
    }
  };

  const profileDone = PROFILE.every((p) => profile[p.id] != null);
  const scoredSteps = useMemo(
    () => (profileDone ? buildQuiz(profile).scored : []),
    [profileDone, profile]
  );
  const steps = useMemo(() => [...PROFILE, ...scoredSteps], [scoredSteps]);

  const current = steps[idx];
  const isProfile = current && current.id.startsWith("P");
  const scoredCount = steps.length - PROFILE.length;
  const scoredIndex = idx - PROFILE.length;
  const counter = isProfile
    ? `About you, ${idx + 1} of ${PROFILE.length}`
    : `Question ${scoredIndex + 1} of ${scoredCount}`;
  const progress = isProfile
    ? ((idx + 1) / PROFILE.length) * 100
    : ((scoredIndex + 1) / scoredCount) * 100;

  const start = () => {
    setStage("quiz");
    setIdx(0);
  };

  const choose = (optionIndex) => {
    if (isProfile) {
      setProfile({ ...profile, [current.id]: current.options[optionIndex] });
      setIdx(idx + 1);
    } else {
      const nextAnswers = { ...answers, [current.id]: optionIndex };
      setAnswers(nextAnswers);
      if (idx + 1 < steps.length) setIdx(idx + 1);
      else {
        setResult(computeResult(profile, nextAnswers));
        setStage("report");
      }
    }
  };

  const back = () => (idx > 0 ? setIdx(idx - 1) : setStage("intro"));

  const opts = current
    ? isProfile
      ? current.options.map((l) => ({ l }))
      : ANSWER_OPTIONS
    : [];
  const selected = current
    ? isProfile
      ? current.options.findIndex((l) => l === profile[current.id])
      : (answers[current.id] ?? -1)
    : -1;

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
              <span className="text-[16px] font-semibold text-indigo-300">
                Free DPDP readiness assessment
              </span>
              <h1 className="mt-3 font-bold leading-[1.1] tracking-tight text-white text-balance">
                See how ready your company is for the DPDP Act.
              </h1>
              <p className="mt-4 max-w-[68ch] text-[18px] leading-[1.6] text-slate-200 text-pretty">
                Answer four questions about your company, then short questions on each duty. Your score
                appears when you finish.
              </p>
              <button
                onClick={start}
                className="mt-8 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:shadow-indigo-500/50"
              >
                Start the assessment
              </button>
              <p className="mt-4 text-[16px] text-slate-200">Free. It takes about 4 minutes, and your score shows on screen.</p>
            </div>
          </motion.section>
        )}

        {stage === "quiz" && current && (
          <motion.section
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // Top padding clears the fixed announcement bar (56px) + header (64px) + 24px,
            // so the question counter row and progress bar are never hidden underneath.
            className="bg-slate-950 pb-8 pt-[144px]"
          >
            <div className="mx-auto max-w-2xl px-5 sm:px-8">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>{counter}</span>
                <button onClick={back} className="inline-flex min-h-[44px] items-center text-slate-300 hover:text-white">
                  Back
                </button>
              </div>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-sky-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <h2 className="question-heading mt-5 max-w-[60ch] tracking-tight text-white text-balance">
                {current.q}
              </h2>
              <div className="mt-5 space-y-2" role="radiogroup" aria-label={current.q}>
                {opts.map((o, i) => {
                  const isSelected = i === selected;
                  return (
                    <button
                      key={o.l}
                      type="button"
                      onClick={() => choose(i)}
                      role="radio"
                      aria-checked={isSelected}
                      className={`flex min-h-[48px] w-full items-center gap-3 rounded-lg px-5 text-left text-[18px] transition ${
                        isSelected ? "bg-indigo-500/20 text-white" : "text-slate-200 hover:bg-white/5"
                      }`}
                    >
                      <span
                        className={`flex h-5 w-5 flex-none items-center justify-center rounded-full border-2 transition ${
                          isSelected ? "border-indigo-500 bg-indigo-500 text-white" : "border-slate-600"
                        }`}
                      >
                        {isSelected && <Check className="h-3 w-3" />}
                      </span>
                      {o.l}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.section>
        )}

        {stage === "report" && result && (
          <motion.section
            key="report"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-slate-950 pb-16 pt-[144px]"
          >
            <div className="mx-auto max-w-3xl px-5 sm:px-8">
              <span className="text-[16px] font-semibold text-indigo-300">Your score</span>
              <p className={`mt-3 text-[24px] sm:text-[30px] font-bold leading-tight stat-figure ${result.band.tone}`}>
                {result.score} out of 100
              </p>
              <p className="mt-3 text-[20px] font-semibold text-white">{result.band.name}</p>
              <p className="mt-2 max-w-[68ch] text-[18px] leading-[1.6] text-slate-200 text-pretty">
                {result.capReason
                  ? `Your answers score ${result.score}, but a critical control is missing or only partly in place, so your band stays at ${result.band.name} until it is fixed.`
                  : result.band.desc}
              </p>

              <p className="mt-2 max-w-[68ch] text-[16px] leading-[1.6] text-slate-300 text-pretty">
                Answers are self-reported. An inquiry or audit will ask for evidence of each one.
              </p>
              <p className="mt-1 text-[16px] text-slate-300">An answer of Not sure counts as a gap.</p>

              {result.capReason && (
                <p className="mt-4 rounded-lg border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-sm leading-relaxed text-amber-200">
                  {result.capReason}
                </p>
              )}

              <div className="mt-8 space-y-5">
                {result.areas.map((a) => (
                  <div key={a.id}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <span className="text-[18px] font-medium text-slate-100">{a.name}</span>
                      <span className="text-[16px] text-slate-200">
                        {a.score} of 100, penalty up to Rs {a.penalty} crore
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-sky-500"
                        style={{ width: `${a.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {result.gaps.length > 0 && (
                <div className="mt-10 border-t border-white/10 pt-8">
                  <h3 className="text-white">
                    {result.gaps.length < 3 ? "Fix these gaps first." : "Fix these three gaps first."}
                  </h3>
                  <ol className="mt-4 space-y-4">
                    {result.gaps.map((g, i) => (
                      <li key={g.id} className="rounded-xl px-5 py-4 ring-1 ring-white/10">
                        <p className="text-[18px] font-medium leading-snug text-slate-100">
                          {i + 1}. {g.q}
                        </p>
                        <p className="mt-1.5 text-[16px] leading-[1.6] text-slate-200">{g.fix}</p>
                        <p className="mt-1 text-sm text-rose-300">Penalty up to Rs {g.penalty} crore</p>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              <p className="mt-8 text-[16px] text-slate-200">
                {weeks} weeks, {days} days until 13 May 2027, when the rules apply in full.
              </p>
              <p className="mt-3 text-sm text-slate-300">Indicative score, not legal advice.</p>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => setShowHow((v) => !v)}
                  aria-expanded={showHow}
                  className="inline-flex min-h-[44px] items-center text-sm font-semibold text-indigo-300 transition-colors hover:text-white"
                >
                  How we score
                </button>
                {showHow && (
                  <div className="mt-1 space-y-4 rounded-xl px-5 py-5 text-sm leading-[1.7] text-slate-200 ring-1 ring-white/10">
                    <p>
                      We weight each duty area by the penalty it carries. Your score is the weighted
                      average of your answers. Critical questions cap your band: Not yet or Not
                      sure caps it at Exposed, Partly at Developing. The consent record question
                      caps it at Developing, or at Progressing when it is only partly in place.
                    </p>
                    <ul className="space-y-1.5">
                      {result.areas.map((a) => (
                        <li key={a.id}>
                          {a.name}: weight {a.weight} of 100, penalty up to Rs {a.penalty} crore.
                        </li>
                      ))}
                    </ul>
                    <p>
                      Bands: 90 to 100 Strong, 75 to 89 Ready, 55 to 74 Progressing, 30 to 54
                      Developing, 0 to 29 Exposed.
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-10 border-t border-white/10 pt-8">
                <h3 className="text-white text-pretty">
                  {result.gaps.length === 0
                    ? "Keep your controls in order with a free 10-day trial."
                    : "Close these gaps with a free 10-day trial."}
                </h3>
                <div className="mt-6 max-w-xl rounded-2xl bg-white/[0.03] p-6 sm:p-8">
                  <LeadForm
                    intent="trial"
                    sourcePage="/assessment"
                    score={result.score}
                    onDone={clearProgress}
                    extra={{
                      readiness_band: result.band.name,
                      readiness_gaps: JSON.stringify(
                        result.gaps.map((g) => ({ question: g.q, fix: g.fix, penalty: g.penalty }))
                      ),
                      assessment_answers: JSON.stringify({ profile, answers }),
                    }}
                    fields={[
                      { name: "name", label: "Name" },
                      { name: "work_email", label: "Work email", type: "email" },
                      { name: "company", label: "Company" },
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
          </motion.section>
        )}
      </AnimatePresence>
    </LandingLayout>
  );
}