import { Link } from "react-router-dom";
import { Reveal } from "./primitives";

export default function CTASection() {
  return (
    <section className="bg-slate-950 py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl text-balance">
            See where you stand today.
          </h2>
          <p className="mt-3 max-w-xl text-lg text-slate-400 text-pretty">
            Answer 14 questions and see your readiness score in 3 minutes.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/assessment"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:shadow-indigo-500/50"
            >
              Check your readiness
            </Link>
            <Link
              to="/trial"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Start free trial
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}