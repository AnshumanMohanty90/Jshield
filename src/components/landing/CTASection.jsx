import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Section from "./Section";
import { Reveal } from "./primitives";
import { CtaPrimary, CtaSecondary } from "./Buttons";
import { ANSWER_OPTIONS, INLINE_QUESTION, PRESELECT_KEY } from "@/lib/assessmentQuestions";

export default function CTASection({ tone = false }) {
  const navigate = useNavigate();

  const pick = (i) => {
    try {
      window.sessionStorage.setItem(PRESELECT_KEY, String(i));
    } catch {
      // Storage unavailable: the assessment still opens at the first question.
    }
    navigate("/assessment");
  };

  return (
    <Section tone>
      <Reveal>
        <h2 className="text-white text-balance">See where you stand today.</h2>
        <p className="mt-4 max-w-[68ch] text-[17px] leading-[1.6] text-slate-300 text-pretty">
          Answer the questions and see your readiness score in about 5 minutes.
        </p>

        <div className="mt-8 max-w-2xl">
          <p className="text-[17px] leading-[1.6] text-slate-300">{INLINE_QUESTION.q}</p>
          <div className="mt-4 flex flex-col gap-1">
            {ANSWER_OPTIONS.map((o, i) => (
              <button
                key={o.l}
                type="button"
                onClick={() => pick(i)}
                className="row-hover group flex min-h-[44px] w-full items-center justify-between gap-4 px-4 py-3 text-left text-[17px] text-slate-300"
              >
                {o.l}
                <ArrowRight className="h-4 w-4 flex-none text-indigo-300 opacity-0 -translate-x-1 transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100" />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <CtaPrimary to="/assessment">Check your readiness</CtaPrimary>
          <CtaSecondary to="/trial">Start free trial</CtaSecondary>
        </div>
      </Reveal>
    </Section>
  );
}