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
  { icon: FileCheck, title: "Audit-ready exports", desc: "Immutable logs and one-click export of ROPA, consent and breach records." },
];

const BADGES = [
  "DPDP Act 2023 Aligned",
  "ISO 27001 (in progress)",
  "SOC 2 Type II (roadmap)",
  "GDPR-aware mapping",
];

export default function Security() {
  return (
    <LandingLayout>
      <section className="bg-slate-950 pb-16 pt-28">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-emerald-300">
            <ShieldCheck className="h-3.5 w-3.5" /> Security & trust
          </div>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Compliance for the platform that keeps you compliant
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            Jaguard is built with the same security posture we help you achieve.
          </p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.title} delay={(i % 3) * 0.06} className="rounded-2xl border border-slate-200 bg-white p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-slate-900">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{p.desc}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Standards & commitments</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {BADGES.map((b) => (
              <span
                key={b}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700"
              >
                <ShieldCheck className="h-4 w-4 text-emerald-600" /> {b}
              </span>
            ))}
          </div>
          <p className="mt-8 text-sm text-slate-500">
            Need our sub-processor list or a security questionnaire response?{" "}
            <Link to="/contact" className="font-medium text-indigo-600 hover:underline">
              Contact our security team
            </Link>
            .
          </p>
        </div>
      </section>
    </LandingLayout>
  );
}