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
    desc: "Every DPDP module for one company with up to 5 systems that hold personal data.",
    cta: "Start free trial",
    to: "/trial",
    primary: true,
  },
  {
    name: "Growth",
    price: "Custom pricing",
    desc: "DPDP, GDPR and SOC 2 on one set of controls, for more systems and group companies.",
    cta: "Get pricing",
    to: "/contact?intent=pricing&plan=Growth",
  },
  {
    name: "With Jago",
    price: "Custom pricing",
    desc: "JShield as an add-on to any Jago plan, so consent and access rules apply to every Jago answer.",
    cta: "Get pricing",
    to: "/contact?intent=pricing&plan=Jago",
  },
];

const INCLUDED = [
  "Every DPDP module",
  "No per-user charges",
  "Proof that cannot be changed later for every consent",
  "Data record: what personal data you hold and why",
  "Breach tracking and reports to the regulator, inside the legal window",
  "Vendor contracts and risk scores",
  "Customer requests to see or delete their data, handled on deadline",
  "Audit-ready exports",
  "Email support",
];

const FAQ_GROUPS = [
  {
    key: "pricing",
    label: "Pricing and usage",
    faqs: [
      {
        q: "What counts as a system that holds personal data?",
        a: "Any place you keep customer or employee details, such as your CRM, HR system, finance system, website forms or a shared drive. Each one you connect to JShield counts as one system.",
      },
      {
        q: "Do you charge per user, per consent or per request?",
        a: "No. There are no per-user charges, and consents, customer requests and breach records are not counted or charged.",
      },
      {
        q: "What if we have more than five systems?",
        a: "Move to Growth. We quote on your company size and the systems that hold personal data.",
      },
      {
        q: "Can we pay monthly, and is GST extra?",
        a: "Yes. DPDP Starter shows the yearly price and the higher month-to-month price. Rupee prices do not include GST. Customers in India pay in rupees and everyone else pays in US dollars.",
      },
      {
        q: "Is JShield included with Jago?",
        a: "JShield is an add-on to any Jago plan. With Jago, the consent and access rules you set in JShield apply to every answer Jago gives.",
      },
    ],
  },
  {
    key: "scope",
    label: "Trial and scope",
    faqs: [
      {
        q: "Is JShield aligned with the DPDP Act 2023?",
        a: "Yes. Every module maps to a duty in the DPDP Act and the DPDP Rules 2025, from consent to breach reporting and customer requests to see or delete their data.",
      },
      {
        q: "Does DPDP Starter cover GDPR and SOC 2?",
        a: "DPDP Starter covers the DPDP Act. GDPR and SOC 2 come with Growth and run on the same controls, so shared work is done once.",
      },
      {
        q: "What is included in the trial?",
        a: "Everything. The full platform, every JShield module and every feature, with no limits, for ten days. No credit card is needed and there is nothing to pay during the trial.",
      },
      {
        q: "What happens after the ten-day trial?",
        a: "Choose DPDP Starter at the listed price, or ask us for a Growth quote based on your company size and systems.",
      },
      {
        q: "Can we export records for audits?",
        a: "Yes. Your data record, consent records and breach logs export as audit-ready documents in a single click.",
      },
    ],
  },
  {
    key: "security",
    label: "Security and data",
    faqs: [
      {
        q: "How does JShield keep our data safe?",
        a: "Every agent gets only the access its task needs: read-only connections wherever the task allows, every connection verified, no default passwords or keys, and keys shown once and then stored so no one can read them back.",
      },
      {
        q: "Can an AI agent take a sensitive action on its own?",
        a: "No. A different person who is authorised to do so approves that one action, once and for a limited time. An agent can never approve itself.",
      },
      {
        q: "Is there a record of what agents do?",
        a: "Yes. Every action is recorded with when it happened, who asked, what the agent did and who approved it. The record cannot be erased, even after an agent is retired.",
      },
      {
        q: "Is our data used to train AI?",
        a: "No. Your data is processed only to deliver results to your company and is not used to train shared or general AI models without your written consent. It is hosted primarily in India (Mumbai).",
      },
      {
        q: "Can we see the status of each security control?",
        a: "Yes. Ask us for our security and compliance profile. It states each control plainly: in place, partly in place with the gap named, or planned with a date.",
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
  usePageTitle("Pricing | JShield", "JShield pricing: DPDP Starter at a fixed monthly price, Growth for DPDP, GDPR and SOC 2, and a ten-day free trial.");
  const [group, setGroup] = useState(FAQ_GROUPS[0].key);
  const [open, setOpen] = useState(0);
  const { currency, rate } = useCurrency();
  const plans = PLANS.map((p) =>
    p.priceInr
      ? {
          ...p,
          price: `${formatPrice(p.priceInr, currency, rate, 0, p.priceUsd)} a month`,
          priceNote: `Billed yearly, or ${formatPrice(p.monthlyInr, currency, rate, 0, p.monthlyUsd)} a month if you pay monthly.`,
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
        title="A free trial, then a plan that fits your company."
        subtitle="The full platform free for ten days. Then a fixed monthly price for DPDP, or a quote when you also need GDPR and SOC 2."
      />

      <Section tone>
        <Reveal>
          <h2 className="text-white text-balance">Plans</h2>
          <CurrencyToggle className="mt-3" />
          <div className="mt-6 grid gap-6 md:grid-cols-3 md:gap-y-0">
            {plans.map((p) => (
              <PlanColumn key={p.name} plan={p} />
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-2">
            {currency === "INR" && <p className="text-[16px] leading-[1.6] text-slate-200">Rupee prices do not include GST.</p>}
            <p className="text-[16px] leading-[1.6] text-slate-200">Every plan starts with a ten-day free trial. No credit card needed.</p>
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
        <h2 className="text-white text-balance">Frequently asked questions</h2>
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
