import LandingLayout from "@/components/landing/LandingLayout";
import PageHero from "@/components/landing/PageHero";
import Section from "@/components/landing/Section";
import Accordion from "@/components/landing/Accordion";
import CTASection from "@/components/landing/CTASection";
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

      <Section tone>
        <Accordion items={PILLARS} />
      </Section>

      <Section narrow>
        <h2 className="text-white text-balance">Standards</h2>
        {STANDARDS.map((b) => (
          <p key={b} className="mt-4 max-w-[68ch] text-[17px] leading-[1.6] text-slate-300 text-pretty">
            {b}
          </p>
        ))}
      </Section>

      <CTASection tone />
    </LandingLayout>
  );
}