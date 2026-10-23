import { Reveal } from "./primitives";
import { CtaPrimary, CtaSecondary } from "./Buttons";

export default function CTASection() {
  return (
    <section className="bg-slate-950 py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <h2 className="font-bold leading-[1.1] tracking-tight text-white text-balance">
            See where you stand today.
          </h2>
          <p className="mt-3 max-w-[68ch] text-[17px] leading-[1.6] text-slate-400 text-pretty">
            Answer 14 questions and see your readiness score in 3 minutes.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <CtaPrimary to="/assessment">Check your readiness</CtaPrimary>
            <CtaSecondary to="/trial">Start free trial</CtaSecondary>
          </div>
        </Reveal>
      </div>
    </section>
  );
}