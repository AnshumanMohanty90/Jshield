import { useState } from "react";
import LandingLayout from "@/components/landing/LandingLayout";
import PageHero from "@/components/landing/PageHero";
import Section from "@/components/landing/Section";
import CTASection from "@/components/landing/CTASection";
import { Reveal } from "@/components/landing/primitives";
import { CtaPrimary, CtaSecondary } from "@/components/landing/Buttons";
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
  { q: "What happens after the ten-day trial?", a: "We send you a quote based on your company size and systems. JShield is also available as part of any Jago plan." },
  { q: "Can we export records for audits?", a: "Yes. Your data record, consent records and breach logs export as audit-ready documents in a single click." },
];

export default function Pricing() {
  usePageTitle("Pricing | JShield");
  const [open, setOpen] = useState(0);

  return (
    <LandingLayout>
      <PageHero
        eyebrow="Pricing"
        title="A free trial, then pricing built around your company."
        subtitle="The full platform for ten days at no cost. After that, a quote based on your company size and systems."
      />

      <Section tone narrow>
        <Reveal>
          <p className="text-[15px] font-semibold text-indigo-400">10-day free trial</p>
          <div className="mt-4 flex flex-wrap items-baseline gap-x-3">
            <span className="text-5xl font-bold tracking-tight text-white">Custom pricing</span>
          </div>
          <p className="mt-4 max-w-[68ch] text-[17px] leading-[1.6] text-slate-300">
            Priced on your company size and the systems that hold personal data.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <CtaPrimary to="/contact?intent=pricing">Get pricing</CtaPrimary>
            <CtaSecondary to="/trial">Start free trial</CtaSecondary>
          </div>
        </Reveal>

        <Reveal delay={80} className="mt-10">
          <p className="text-[15px] font-semibold text-slate-400">What is included</p>
          <ul className="mt-4 grid gap-x-8 sm:grid-cols-2">
            {INCLUDED.map((f) => (
              <li key={f} className="row-hover py-3 text-[17px] leading-[1.6] text-slate-300">
                {f}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120} className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-white">Prefer it with Jago?</h3>
            <p className="mt-2 text-[17px] leading-[1.6] text-slate-300">
              Also available as part of any Jago plan.
            </p>
          </div>
          <CtaSecondary to="/trial" className="flex-none">
            Start free trial
          </CtaSecondary>
        </Reveal>
      </Section>

      <Section narrow>
        <h2 className="text-white text-balance">Frequently asked questions</h2>
        <div className="mt-8">
          {FAQ.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="row-hover">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex min-h-[44px] w-full items-center justify-between gap-4 py-3.5 text-left text-[17px] text-slate-100"
                >
                  {f.q}
                  <ChevronDown
                    className={`h-4 w-4 flex-none text-slate-400 transition-transform duration-150 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden text-[17px] leading-[1.6] text-slate-300">{f.a}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <CTASection tone />
    </LandingLayout>
  );
}