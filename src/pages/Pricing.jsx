import { useState } from "react";
import { Link } from "react-router-dom";
import LandingLayout from "@/components/landing/LandingLayout";
import { Reveal } from "@/components/landing/primitives";
import { Check, ChevronDown, ArrowRight } from "lucide-react";

const INCLUDED = [
  "All nine compliance modules",
  "Unlimited users and data owners",
  "Proof that cannot be changed later for every consent",
  "Data record: what personal data you hold and why",
  "Breach tracking and reports to the regulator, inside the legal window",
  "Vendor contracts and risk scores",
  "Customer requests to see or delete their data, handled on deadline",
  "Audit-ready exports",
  "Email support",
];

const FAQ = [
  { q: "Is JShield aligned with the DPDP Act 2023?", a: "Yes. Every module maps to a duty in the law, from consent to breach reporting and customer requests to see or delete their data." },
  { q: "What is included in the trial?", a: "Everything. The full platform, all nine modules and every feature, with no limits, for ten days." },
  { q: "Do I need a credit card to start?", a: "No. The trial needs no credit card and there is nothing to pay during the trial." },
  { q: "How is the trial activated?", a: "Share your work email on the trial page and our team activates your trial personally, within one business day." },
  { q: "What happens after the ten-day trial?", a: "JShield costs Rs 12 lakh a year on its own, or added to any Jago plan. Talk to us when you are ready to roll it out across your company." },
  { q: "Can we export records for audits?", a: "Yes. Your data record, consent records and breach logs export as audit-ready documents in a single click." },
];

export default function Pricing() {
  const [open, setOpen] = useState(0);

  return (
    <LandingLayout>
      <section className="bg-slate-950 pb-10 pt-28">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">Pricing</span>
          <h1 className="mt-3 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl text-pretty">
            A free trial, then Rs 12 lakh a year.
          </h1>
          <p className="mt-4 text-lg text-slate-400 text-pretty">
            The full platform for ten days at no cost. After that, Rs 12 lakh a year on its own, or added to any Jago
            plan.
          </p>
        </div>
      </section>

      <section className="bg-slate-950 pb-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 shadow-2xl shadow-black/50">
              <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-sky-500 to-indigo-500" />

              <div className="px-8 py-10 text-center sm:px-12">
                <span className="inline-flex items-center rounded-full bg-indigo-500/15 px-3 py-1 text-xs font-semibold text-indigo-300">
                  10-day free trial
                </span>
                <div className="mt-5 flex items-end justify-center gap-2">
                  <span className="text-5xl font-bold tracking-tight text-white">Rs 12 lakh</span>
                  <span className="mb-1.5 text-sm text-slate-500">a year</span>
                </div>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-400">
                  Free for the first ten days. No credit card required. Your readiness score within the first hour.
                </p>
                <Link
                  to="/trial"
                  className="group mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:shadow-indigo-500/50"
                >
                  Start free trial <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </Link>
              </div>

              <div className="border-t border-white/10 px-8 py-8 sm:px-12">
                <h3 className="text-center text-xs font-semibold uppercase tracking-widest text-slate-500">
                  What is included
                </h3>
                <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {INCLUDED.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                        <Check className="h-3 w-3" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-900/30 px-8 py-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-base font-semibold text-white">Prefer it with Jago?</h3>
                <p className="mt-1 text-sm text-slate-400">
                  The same Rs 12 lakh a year on its own, or added to any Jago plan. Talk to us about what fits.
                </p>
              </div>
              <Link
                to="/contact"
                className="group inline-flex flex-none items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Talk to us <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-slate-900/50 py-16">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <h2 className="text-center text-2xl font-bold tracking-tight text-white text-pretty">
            Frequently asked questions
          </h2>
          <div className="mt-8">
            {FAQ.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={i} className="border-t border-white/10 last:border-b">
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-medium text-slate-100 transition hover:text-white"
                  >
                    {f.q}
                    <ChevronDown className={`h-4 w-4 flex-none text-slate-500 transition ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden text-sm leading-relaxed text-slate-400">{f.a}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </LandingLayout>
  );
}