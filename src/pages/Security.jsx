import { Link } from "react-router-dom";
import LandingLayout from "@/components/landing/LandingLayout";
import { Reveal } from "@/components/landing/primitives";
import usePageTitle from "@/hooks/usePageTitle";

const PILLARS = [
  { title: "Encryption everywhere", desc: "Data is encrypted in transit with TLS 1.3 and at rest with AES-256." },
  { title: "Access controls", desc: "You decide who can see and change each record. Every action is logged." },
  { title: "Data residency", desc: "Your data is stored in India." },
  { title: "Continuous monitoring", desc: "Alerts when a breach is suspected, a deadline is close or a setting changes." },
  { title: "Strong authentication", desc: "Single sign-on, two-step login and session controls." },
  { title: "Audit-ready exports", desc: "Logs that cannot be changed later, with one-click export of your data record, consent and breach records." },
];

const STANDARDS = [
  "ISO 27001 and SOC 2 (two global security standards): certification under way",
];

export default function Security() {
  usePageTitle("Security | JShield");
  return (
    <LandingLayout>
      <section className="bg-slate-950 pb-12 pt-32 sm:pb-20 sm:pt-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">Security</span>
          <h1 className="mt-3 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl text-balance">
            How we protect your data
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300 text-pretty">
            We hold your data to the same rules we help you meet.
          </p>
        </div>
      </section>

      <section className="bg-slate-950 py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 0.06} className="border-t border-white/10 pt-5">
                <h2 className="text-base font-semibold text-white">{p.title}</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{p.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900/50 py-12 sm:py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl text-balance">
            Standards
          </h2>
          {STANDARDS.map((b) => (
            <p key={b} className="mt-3 text-base leading-relaxed text-slate-300 text-pretty">
              {b}
            </p>
          ))}
          <div className="mt-8">
            <Link
              to="/trial"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:shadow-indigo-500/50"
            >
              Start free trial
            </Link>
          </div>
          <p className="mt-4 text-xs text-slate-500">Ten-day trial. No payment details needed.</p>
        </div>
      </section>
    </LandingLayout>
  );
}