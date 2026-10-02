import { useState } from "react";
import { Link } from "react-router-dom";
import LandingLayout from "@/components/landing/LandingLayout";
import { Reveal } from "@/components/landing/primitives";
import { Check, ChevronDown, ArrowRight } from "lucide-react";

const TIERS = [
  {
    name: "Starter",
    price: "₹0",
    period: "for 14 days",
    desc: "For teams evaluating DPDP readiness.",
    features: ["Up to 3 modules", "1 data owner", "Basic dashboards", "Community support"],
    cta: "Start free",
    highlight: false,
  },
  {
    name: "Growth",
    price: "₹24,999",
    period: "per month",
    desc: "For growing privacy teams.",
    features: [
      "All 9 modules",
      "Unlimited owners",
      "Consent artifacts & ROPA",
      "Breach SLA tracking",
      "Email support",
    ],
    cta: "Start free trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "annual",
    desc: "For regulated enterprises.",
    features: [
      "Everything in Growth",
      "SSO & advanced roles",
      "Custom data residency",
      "Dedicated DPO onboarding",
      "24/7 priority support",
      "Audit export pack",
    ],
    cta: "Contact sales",
    highlight: false,
  },
];

const FAQ = [
  { q: "Is PrivGuard aligned with the DPDP Act 2023?", a: "Yes. Every module maps to a DPDP obligation — from consent and ROPA to breach notification and data principal rights." },
  { q: "How long does setup take?", a: "Most teams are live within an hour. Connect your data sources, classify assets, and your compliance score is generated automatically." },
  { q: "Can we export records for audits?", a: "Yes. ROPA, consent records and breach logs can be exported as audit-ready documents in a single click." },
  { q: "Do you support multi-entity organizations?", a: "Enterprise plans include multi-entity support with separate ROPA and ownership per entity." },
];

export default function Pricing() {
  const [open, setOpen] = useState(0);

  return (
    <LandingLayout>
      <section className="bg-slate-950 pb-16 pt-28">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Pricing that scales with your compliance
          </h1>
          <p className="mt-4 text-lg text-slate-300">Start free. Upgrade when you're ready. Cancel anytime.</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {TIERS.map((t, i) => (
              <Reveal
                key={t.name}
                delay={i * 0.08}
                className={`flex h-full flex-col rounded-2xl border p-7 ${
                  t.highlight
                    ? "border-indigo-300 bg-gradient-to-b from-indigo-50/60 to-white shadow-xl shadow-indigo-100 lg:-translate-y-3"
                    : "border-slate-200 bg-white shadow-sm"
                }`}
              >
                {t.highlight && (
                  <div className="mb-4 inline-flex w-fit items-center rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
                    Most popular
                  </div>
                )}
                <h3 className="text-lg font-semibold text-slate-900">{t.name}</h3>
                <p className="mt-1 text-sm text-slate-600">{t.desc}</p>
                <div className="mt-5 flex items-end gap-1.5">
                  <span className="text-4xl font-bold tracking-tight text-slate-900">{t.price}</span>
                  <span className="mb-1 text-sm text-slate-500">{t.period}</span>
                </div>
                <ul className="mt-6 flex-1 space-y-3">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                        <Check className="h-3 w-3" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to={t.name === "Enterprise" ? "/contact" : "/register"}
                  className={`mt-7 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition ${
                    t.highlight
                      ? "bg-gradient-to-r from-indigo-500 to-sky-500 text-white shadow-lg shadow-indigo-200 hover:shadow-indigo-300"
                      : "border border-slate-300 text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {t.cta} <ArrowRight className="h-4 w-4" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <h2 className="text-center text-2xl font-bold tracking-tight text-slate-900">
            Frequently asked questions
          </h2>
          <div className="mt-8 space-y-3">
            {FAQ.map((f, i) => (
              <div key={i} className="rounded-xl border border-slate-200 bg-white">
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium text-slate-900"
                >
                  {f.q}
                  <ChevronDown className={`h-4 w-4 text-slate-400 transition ${open === i ? "rotate-180" : ""}`} />
                </button>
                {open === i && <div className="px-5 pb-4 text-sm leading-relaxed text-slate-600">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </LandingLayout>
  );
}