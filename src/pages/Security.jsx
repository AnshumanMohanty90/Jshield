import LandingLayout from "@/components/landing/LandingLayout";
import PageHero from "@/components/landing/PageHero";
import Section from "@/components/landing/Section";
import Accordion from "@/components/landing/Accordion";
import CTASection from "@/components/landing/CTASection";
import usePageTitle from "@/hooks/usePageTitle";

const PILLARS = [
  { title: "Encryption", desc: "Data is encrypted in transit with TLS 1.3 and at rest with AES-256." },
  { title: "Access control", desc: "You decide who can see and change each record. Every action is logged." },
  { title: "Data stored in India", desc: "Your data is stored in our India data centre region." },
  { title: "Monitoring", desc: "Alerts when a breach is suspected, a deadline is close or a setting changes." },
  { title: "Login security", desc: "Single sign-on, two-step login and session controls." },
  { title: "Exports for audits", desc: "Logs that cannot be changed later, and one-click export of your data, consent and breach records." },
];

const STANDARDS = [
  "Both are widely used security standards.",
];

export default function Security() {
  usePageTitle("Security | JShield", "How JShield protects your data: encryption, access control, data residency and audit logs.");
  return (
    <LandingLayout>
      <PageHero
        eyebrow="Security"
        title="JShield protects your data with six controls."
        subtitle="Your data in JShield is protected by the controls below."
      />

      <Section tone>
        <h2 className="sr-only">What each control does</h2>
        <Accordion items={PILLARS} />
      </Section>

      <Section narrow>
        <h2 className="text-white text-balance">ISO 27001 certification and a SOC 2 audit are under way.</h2>
        {STANDARDS.map((b) => (
          <p key={b} className="mt-4 max-w-[68ch] text-[18px] leading-[1.6] text-slate-200 text-pretty">
            {b}
          </p>
        ))}
      </Section>

      <CTASection tone />
    </LandingLayout>
  );
}