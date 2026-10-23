import { useState } from "react";
import { Link } from "react-router-dom";
import LandingLayout from "@/components/landing/LandingLayout";
import { Reveal } from "@/components/landing/primitives";
import { ChevronDown } from "lucide-react";
import usePageTitle from "@/hooks/usePageTitle";

const INCLUDED = [
  "Every JShield module",
  "No per-user charges",
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
  { q: "What is included in the trial?", a: "Everything. The full platform, every JShield module and every feature, with no limits, for ten days." },
  { q: "Do I need a credit card to start?", a: "No. The trial needs no credit card and there is nothing to pay during the trial." },
  { q: "How is the trial activated?", a: "Share your work email on the trial page and activate your trial." },
  { q: "What happens after the ten-day trial?", a: "JShield costs Rs 12 lakh a year on its own, or added to any Jago plan." },
  { q: "Can we export records for audits?", a: "Yes. Your data record, consent records and breach logs export as audit-ready documents in a single click." },
];

export default function Pricing() {
  usePageTitle("Pricing | JShield");
  const [open, setOpen] = useState(0);

  return (
    <LandingLayout>
      <section className="bg-slate-950 pb-12 pt-32 sm:pb-20 sm:pt-36">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">Pricing</span>
          <h1 className="mt-3 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl text-balance">
            A free trial, then Rs 12 lakh a year.
          </h1>
          <p className="mt-4 text-lg text-slate-400 text-pretty">
            The full platform for ten days at no cost. After that, Rs 12 lakh a year on its own, or added to any Jago
            plan.
          </p>
        </div>
      </section>

      <section className="bg-slate-950 py-12 sm:py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400">10-day free trial</p>
            <div className="mt-4 flex flex-wrap items-baseline gap-x-3">
              <span className="text-5xl font-bold tracking-tight text-white">Rs 12 lakh</span>
              <span className="text-sm text-slate-500">a year</span>
            </div>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-400">
              Free for the first ten days. No payment details needed.
            </p>
            <Link
              to="/trial"
              className="mt-7 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:shadow-indigo-500/50"
            >
              Start free trial
            </Link>
          </Reveal>

          <Reveal delay={0.08} className="mt-10 border-t border-white/10 pt-8">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500">What is included</h2>
            <ul className="mt-4 grid gap-x-8 sm:grid-cols-2">
              {INCLUDED.map((f) => (
                <li key={f} className="border-t border-white/10 py-3 text-sm text-slate-300">
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.12} className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-base font-semibold text-white">Prefer it with Jago?</h2>
              <p className="mt-1 text-sm text-slate-400">
                The same Rs 12 lakh a year on its own, or added to any Jago plan.
              </p>
            </div>
            <Link
              to="/trial"
              className="inline-flex flex-none items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Start free trial
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-slate-900/50 py-12 sm:py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl text-balance">
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