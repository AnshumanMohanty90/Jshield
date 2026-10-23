import LandingLayout from "@/components/landing/LandingLayout";
import PageHero from "@/components/landing/PageHero";
import CTASection from "@/components/landing/CTASection";
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
      <PageHero
        eyebrow="Security"
        title="How we protect your data"
        subtitle="We hold your data to the same rules we help you meet."
      />

      <section className="bg-slate-950 py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 0.06} className="border-t border-white/10 pt-5">
                <h3 className="font-semibold text-white">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{p.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900/50 py-10 sm:py-16">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <h2 className="font-bold leading-[1.1] tracking-tight text-white text-balance">Standards</h2>
          {STANDARDS.map((b) => (
            <p key={b} className="mt-3 max-w-[68ch] text-[17px] leading-[1.6] text-slate-400 text-pretty">
              {b}
            </p>
          ))}
        </div>
      </section>

      <CTASection />
    </LandingLayout>
  );
}