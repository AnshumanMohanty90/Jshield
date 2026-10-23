import { Link } from "react-router-dom";
import { Reveal } from "./primitives";
import { primaryCtaClass, secondaryCtaClass } from "./Buttons";

export default function PriceSection() {
  return (
    <section className="bg-slate-900/50 py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="grid gap-6 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">Price</span>
            <h2 className="mt-3 font-bold leading-[1.1] tracking-tight text-white text-balance">
              Pricing built around your data.
            </h2>
            <p className="mt-3 max-w-[68ch] text-[17px] leading-[1.6] text-slate-400 text-pretty">
              Priced on the size of your company and the systems that hold personal data. Free for the first 10 days.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Link to="/contact?intent=pricing" className={primaryCtaClass}>
              Get pricing
            </Link>
            <Link to="/trial" className={secondaryCtaClass}>
              Start free trial
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}