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
  { q: "Is Jaguard aligned with the DPDP Act 2023?", a: "Yes. Every module maps to a DPDP obligation, from consent and ROPA to breach notification and data principal rights." },
  { q: "What is included in the trial?", a: "Everything. The full platform, all nine modules and every feature, with no limits, for ten days." },
  { q: "Do I need a credit card to start?", a: "No. The trial needs no credit card and there is nothing to pay during the trial." },
  { q: "What happens after the ten-day trial?", a: "The trial is the complete platform. When you are ready to roll it out across your organisation, contact sales about enterprise adoption." },
  { q: "Can we export records for audits?", a: "Yes. ROPA, consent records and breach logs export as audit-ready documents in a single click." },
];

export default function Pricing() {
  const [open, setOpen] = useState(0);

  return (
    <LandingLayout>
      <section className="bg-slate-950 pb-14 pt-28">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">Pricing</span>
          <h1 className="mt-3 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl text-pretty">Everything. Free for ten days.</h1>
          <p className="mt-4 text-lg text-slate-300">
            The full platform, every module, no credit card. Use it for ten days, then talk to sales about enterprise adoption.
          </p>
        </div>
      </section>

      <section className="bg-slate-950 py-16">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex items-center rounded-full bg-indigo-500/15 px-3 py-1 text-xs font-semibold text-indigo-300">
                10-day full trial
              </span>
              <div className="mt-5 flex items-end gap-2">
                <span className="text-5xl font-bold tracking-tight text-white">Free</span>
                <span className="mb-1.5 text-sm text-slate-500">for 10 days</span>
              </div>
              <p className="mt-3 text-sm text-slate-400">
                No credit card required. No limits. Your compliance score within the first hour.
              </p>
              <Link
                to="/register"
                className="group mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:shadow-indigo-500/50"
              >
                Start free trial <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-500">What is included</h3>
              <ul className="mt-4 divide-y divide-white/10">
                {INCLUDED.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 py-3 text-sm text-slate-300">
                    <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                      <Check className="h-3 w-3" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-base font-semibold text-white">After your trial</h3>
                <p className="mt-1 text-sm text-slate-400">
                  The trial is the full product. To adopt it across your organisation, talk to sales about enterprise rollout.
                </p>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300"
              >
                Talk to sales <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-900/50 py-16">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <h2 className="text-center text-2xl font-bold tracking-tight text-white">Frequently asked questions</h2>
          <div className="mt-8 space-y-3">
            {FAQ.map((f, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-slate-950">
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium text-slate-100"
                >
                  {f.q}
                  <ChevronDown className={`h-4 w-4 text-slate-500 transition ${open === i ? "rotate-180" : ""}`} />
                </button>
                {open === i && <div className="px-5 pb-4 text-sm leading-relaxed text-slate-400">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </LandingLayout>
  );
}