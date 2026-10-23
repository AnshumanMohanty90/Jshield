import { Link } from "react-router-dom";
import { Reveal } from "./primitives";

export default function PriceSection() {
  return (
    <section className="bg-slate-900/50 py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="grid gap-6 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">Price</span>
            <h2 className="mt-3 font-bold leading-[1.1] tracking-tight text-white text-balance">
              Rs 12 lakh a year.
            </h2>
            <p className="mt-3 max-w-[68ch] text-[17px] leading-[1.6] text-slate-400 text-pretty">
              On its own, or added to any Jago plan. Free for the first 10 days.
            </p>
          </div>
          <div className="flex lg:justify-end">
            <Link
              to="/pricing"
              className="group inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:shadow-indigo-500/50"
            >
              See pricing
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}