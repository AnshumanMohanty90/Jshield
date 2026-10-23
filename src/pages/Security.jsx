import { Link } from "react-router-dom";
import LandingLayout from "@/components/landing/LandingLayout";
import { Reveal } from "@/components/landing/primitives";
import { Lock, ShieldCheck, Server, Eye, Fingerprint, FileCheck } from "lucide-react";

const PILLARS = [
  { icon: Lock, title: "Encryption everywhere", desc: "Data is encrypted in transit with TLS 1.3 and at rest with AES-256." },
  { icon: ShieldCheck, title: "DPDP-native controls", desc: "Role-based access, audit logging and consent artifacts by design." },
  { icon: Server, title: "Data residency", desc: "Hosted in India-region infrastructure with configurable residency for enterprise." },
  { icon: Eye, title: "Continuous monitoring", desc: "Real-time alerts on breaches, SLA breaches and policy drift." },
  { icon: Fingerprint, title: "Strong authentication", desc: "SSO, MFA and session controls available on Growth and Enterprise." },
  { icon: FileCheck, title: "Audit-ready exports", desc: "Logs that cannot be changed later, with one-click export of your data record, consent and breach records." },
];

const BADGES = [
  "ISO 27001 (in progress)",
  "SOC 2 Type II (roadmap)",
  "GDPR-aware mapping",
];

export default function Security() {
  return (
    <LandingLayout>
      <section className="bg-slate-950 pb-14 pt-28">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-emerald-300">
            <ShieldCheck className="h-3.5 w-3.5" /> Security & trust
          </div>
          <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl text-pretty">
            Compliance for the platform that keeps you compliant
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            JShield is built with the same security posture we help you achieve.
          </p>
        </div>
      </section>

      <section className="bg-slate-950 py-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.title} delay={(i % 3) * 0.06} className="rounded-2xl border border-white/10 bg-slate-900 p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-white">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{p.desc}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-900/50 py-14">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-white">Standards & commitments</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {BADGES.map((b) => (
              <span
                key={b}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950 px-4 py-2 text-sm font-medium text-slate-300"
              >
                <ShieldCheck className="h-4 w-4 text-slate-400" /> {b}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/trial"
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-indigo-500 to-sky-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Start free trial
            </Link>
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Ten-day trial. No credit card required.{" "}
            <Link to="/contact" className="text-slate-400 underline-offset-2 hover:text-white hover:underline">
              Talk to us
            </Link>
          </p>
        </div>
      </section>
    </LandingLayout>
  );
}