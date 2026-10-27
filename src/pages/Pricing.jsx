import { useState } from "react";
import LandingLayout from "@/components/landing/LandingLayout";
import PageHero from "@/components/landing/PageHero";
import Section from "@/components/landing/Section";
import CTASection from "@/components/landing/CTASection";
import TabSwitcher from "@/components/landing/TabSwitcher";
import { Reveal } from "@/components/landing/primitives";
import { CtaPrimary, CtaSecondary } from "@/components/landing/Buttons";
import { ChevronDown } from "lucide-react";
import usePageTitle from "@/hooks/usePageTitle";
import { useCurrency, formatPrice, CurrencyToggle } from "@/lib/currency";

// DPDP Starter shows a yearly-billed monthly price with the month-to-month price as a note.
// Larger companies and multi-framework set-ups are quoted.
const PLANS = [
  {
    name: "DPDP Starter",
    priceInr: 19999,
    priceUsd: 269,
    monthlyInr: 24999,
    monthlyUsd: 329,
    desc: "All DPDP modules for up to 5 systems that hold personal data.",
    cta: "Start free trial",
    to: "/trial",
    primary: true,
  },
  {
    name: "Growth",
    price: "Custom pricing",
    desc: "DPDP, GDPR and SOC 2 for more systems and group companies.",
    cta: "Get pricing",
    to: "/contact?intent=pricing&plan=Growth",
  },
  {
    name: "With Jago",
    price: "Custom pricing",
    desc: "JShield as an add-on to any Jago plan.",
    cta: "Get pricing",
    to: "/contact?intent=pricing&plan=Jago",
  },
];

const INCLUDED = [
  "Every DPDP module",
  "No per-user charges",
  "Consent records that cannot be altered",
  "A record of the personal data you hold",
  "Breach reports drafted against the legal deadline",
  "Vendor risk scores",
  "Customer data requests tracked against their deadlines",
  "Exports ready for audits",
  "Email support",
];

const FAQ_GROUPS = [
  {
    key: "pricing",
    label: "Pricing and usage",
    faqs: [
      {
        q: "What counts as a system?",
        a: "Any place that holds customer or employee data, such as a CRM, HR system or shared drive. Each counts once.",
      },
      {
        q: "Do you charge per user or per consent?",
        a: "No. Users, consents, requests and breach records are not charged.",
      },
      {
        q: "What if we have more than five systems?",
        a: "Move to Growth, and we will send you a quote.",
      },
      {
        q: "Can we pay monthly?",
        a: "Yes. Monthly billing costs about 25% more than yearly. GST is extra on rupee prices.",
      },
      {
        q: "Is JShield included with Jago?",
        a: "It is an add-on to any Jago plan. JShield then checks every Jago answer against your rules.",
      },
    ],
  },
  {
    key: "scope",
    label: "Trial and scope",
    faqs: [
      {
        q: "Does JShield cover the DPDP Act?",
        a: "Yes. Each module covers a duty under the DPDP Act and the DPDP Rules 2025.",
      },
      {
        q: "Does DPDP Starter cover GDPR and SOC 2?",
        a: "No. They come with Growth, and your DPDP work carries over.",
      },
      {
        q: "What is in the trial?",
        a: "The full platform for 10 days. No payment details needed.",
      },
      {
        q: "What happens after the trial?",
        a: "Choose DPDP Starter, or ask us for a Growth quote.",
      },
      {
        q: "Can we export records for audits?",
        a: "Yes. Consent, breach and data records export in one click.",
      },
    ],
  },
  {
    key: "security",
    label: "Security and data",
    faqs: [
      {
        q: "How is our data kept safe?",
        a: "Each AI agent (software that does tasks for you) gets only the access it needs. Every connection is checked, and access keys are shown only once.",
      },
      {
        q: "Can an agent take a sensitive action alone?",
        a: "No. A second authorised person approves it. An agent cannot approve itself.",
      },
      {
        q: "Is there a record of agent actions?",
        a: "Yes. It shows who asked, what was done and who approved it, and it cannot be erased.",
      },
      {
        q: "Is our data used to train AI?",
        a: "No, not without your written consent. It is hosted mainly in India (Mumbai).",
      },
      {
        q: "Can we see your security status?",
        a: "Yes. Ask for our security profile. It shows each control as in place, partial or planned.",
      },
    ],
  },
];

// Joins the last two words with a non-breaking space, so no line ends on a single word.
const tail = (text) => text.replace(/ (\S+)$/, "\u00a0$1");

function PlanColumn({ plan: p }) {
  return (
    <div className="row-hover flex min-w-0 flex-col rounded-xl px-5 py-4 md:row-span-5 md:grid md:grid-rows-subgrid">
      <h3 className="text-white" style={{ fontSize: 20, fontWeight: 600 }}>{p.name}</h3>
      <p className="mt-3 text-[18px] font-semibold text-white">{p.price}</p>
      {p.priceNote ? (
        <p className="mt-2 text-[16px] leading-[1.6] text-slate-200">{tail(p.priceNote)}</p>
      ) : (
        <div aria-hidden="true" className="hidden md:block" />
      )}
      <p className="mt-3 text-[18px] leading-[1.6] text-slate-200">{tail(p.desc)}</p>
      <div className="mt-5">
        {p.primary ? <CtaPrimary to={p.to}>{p.cta}</CtaPrimary> : <CtaSecondary to={p.to}>{p.cta}</CtaSecondary>}
      </div>
    </div>
  );
}

export default function Pricing() {
  usePageTitle("Pricing | JShield", "JShield pricing: DPDP Starter at a fixed monthly price, Growth for DPDP, GDPR and SOC 2, and a 10-day free trial.");
  const [group, setGroup] = useState(FAQ_GROUPS[0].key);
  const [open, setOpen] = useState(0);
  const { currency, rate } = useCurrency();
  const plans = PLANS.map((p) =>
    p.priceInr
      ? {
          ...p,
          price: `${formatPrice(p.priceInr, currency, rate, 0, p.priceUsd)} a month`,
          priceNote: `Billed yearly. ${formatPrice(p.monthlyInr, currency, rate, 0, p.monthlyUsd)} a month if billed monthly.`,
        }
      : p
  );
  const active = FAQ_GROUPS.find((g) => g.key === group);
  const pickGroup = (key) => {
    setGroup(key);
    setOpen(0);
  };

  return (
    <LandingLayout>
      <PageHero
        eyebrow="Pricing"
        title="Start free, then pay a fixed monthly price for DPDP."
        subtitle="Try every module free for 10 days. GDPR, SOC 2 and larger set-ups are quoted."
      />

      <Section tone>
        <Reveal>
          <h2 className="text-white text-balance">Choose a plan by the laws and systems you need.</h2>
          <CurrencyToggle className="mt-3" />
          <div className="mt-6 grid gap-6 md:grid-cols-3 md:gap-y-0">
            {plans.map((p) => (
              <PlanColumn key={p.name} plan={p} />
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-2">
            {currency === "INR" && <p className="text-[16px] leading-[1.6] text-slate-200">Rupee prices do not include GST.</p>}
            <p className="text-[16px] leading-[1.6] text-slate-200">Every plan starts with a 10-day free trial. No payment details needed.</p>
          </div>
        </Reveal>

        <Reveal delay={80} className="mt-10">
          <p className="text-[16px] font-semibold text-slate-200">Every plan includes</p>
          <ul className="mt-4 grid gap-x-8 sm:grid-cols-2">
            {INCLUDED.map((f) => (
              <li key={f} className="row-hover py-3 text-[18px] leading-[1.6] text-slate-200">
                {f}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section narrow>
        <h2 className="text-white text-balance">Answers to common questions on price, trial and security.</h2>
        <TabSwitcher
          id="pricing-faq"
          ariaLabel="Question groups"
          items={FAQ_GROUPS.map((g) => ({ key: g.key, label: g.label }))}
          activeKey={group}
          onChange={(key) => pickGroup(key)}
        />
        <div
          className="mt-6"
          id="pricing-faq-panel"
          role="tabpanel"
          aria-labelledby={`pricing-faq-tab-${FAQ_GROUPS.indexOf(active)}`}
        >
          {active.faqs.map((f, i) => {
            const isOpen = open === i;
            const answerId = `pricing-faq-${group}-${i}`;
            return (
              <div key={f.q} className="row-hover">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  className="flex min-h-[44px] w-full items-center justify-between gap-4 py-3.5 text-left text-[18px] text-slate-100"
                >
                  <span>{tail(f.q)}</span>
                  <ChevronDown
                    className={`h-4 w-4 flex-none text-slate-300 transition-transform duration-150 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div id={answerId} hidden={!isOpen} className="pb-4 text-[18px] leading-[1.6] text-slate-200">
                  {tail(f.a)}
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
