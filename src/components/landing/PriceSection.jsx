import { Link } from "react-router-dom";
import Section from "./Section";
import { Reveal } from "./primitives";
import { primaryCtaClass, secondaryCtaClass } from "./Buttons";

export default function PriceSection() {
  return (
    <Section tone>
      <Reveal className="grid gap-6 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-[15px] font-semibold text-indigo-400">Price</p>
          <h2 className="mt-3 text-white text-balance">Pricing built around your data.</h2>
          <p className="mt-4 max-w-[68ch] text-[17px] leading-[1.6] text-slate-300 text-pretty">
            Priced on the size of your company and the systems that hold personal data. Free for the first 10 days.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
          <a
            href="/contact?intent=pricing"
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:shadow-indigo-500/50"
          >
            Get pricing
          </a>
          <a
            href="/trial"
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Start free trial
          </a>
        </div>
      </Reveal>
    </Section>
  );
}