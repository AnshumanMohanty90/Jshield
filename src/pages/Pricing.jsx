import { useState } from "react";
import { Link } from "react-router-dom";
import LandingLayout from "@/components/landing/LandingLayout";
import { Check, ChevronDown, ArrowRight } from "lucide-react";

const INCLUDED = [
  "All nine compliance modules",
  "Unlimited users and data owners",
  "Consent artifacts and tamper-proof records",
  "Records of Processing (ROPA)",
  "Breach SLA tracking and DPB notifications",
  "Vendor DPAs and risk scoring",
  "Data principal rights workflows",
  "Audit-ready exports",
  "Email support",
];

const FAQ = [
  { q: "Is JagoAI aligned with the DPDP Act 2023?", a: "Yes. Every module maps to a DPDP obligation, from consent and ROPA to breach notification and data principal rights." },
  { q: "What is included in the trial?", a: "Everything. The full platform, all nine modules and every feature, with no limits, for ten days." },
  { q: "Do I need a credit card to start?", a: "No. The trial needs no credit card. We only talk about payment if you choose to renew." },
  { q: "What happens after the ten-day trial?", a: "Your workspace stays intact. Renew on a flat annual plan to keep access, or let the trial end with no charge and no follow-up obligation." },
  { q: "Can we export records for audits?", a: "Yes. ROPA, consent records and breach logs export as audit-ready documents in a single click." },
];

export default function Pricing() {
  const [open, setOpen] = useState(0);

  return (
    <LandingLayout>
      <section className="bg-slate-950 pb-16 pt-28">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-300">Pricing</span>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">Everything. Free for ten days.</h1>
          <p className="mt-4 text-lg text-slate-300">
            The full platform, every module, no credit card. If it works for you, renew. If not, walk away.
          </p>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                10-day full trial
              </span>
              <div className="mt-5 flex items-end gap-2">
                <span className="text-5xl font-bold tracking-tight text-slate-900">Free</span>
                <span className="mb-1.5 text-sm text-slate-500">for 10 days</span>
              </div>
              <p className="mt-3 text-sm text-slate-600">
                No credit card required. No limits. Your compliance score within the first hour.
              </p>
              <Link
                to="/register"
                className="group mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:shadow-indigo-300"
              >
                Start free trial <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-400">What is included</h3>
              <ul className="mt-4 divide-y divide-slate-200">
                {INCLUDED.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 py-3 text-sm text-slate-700">
                    <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <Check className="h-3 w-3" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-slate-200 pt-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-base font-semibold text-slate-900">After your trial</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Continue on one flat annual plan. We confirm your price when your trial begins, with no surprises.
                </p>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
              >
                Talk to us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <h2 className="text-center text-2xl font-bold tracking-tight text-slate-900">Frequently asked questions</h2>
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