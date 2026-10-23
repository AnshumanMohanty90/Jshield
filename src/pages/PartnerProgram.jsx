import LandingLayout from "@/components/landing/LandingLayout";
import PageHero from "@/components/landing/PageHero";
import Section from "@/components/landing/Section";
import SectionHeading from "@/components/landing/SectionHeading";
import Accordion from "@/components/landing/Accordion";
import Stepper from "@/components/landing/Stepper";
import CTASection from "@/components/landing/CTASection";
import { Reveal } from "@/components/landing/primitives";
import LeadForm from "@/components/landing/LeadForm";
import usePageTitle from "@/hooks/usePageTitle";

const PARTNER_TYPES = [
  {
    title: "Consulting Partners",
    desc: "Privacy, risk and compliance advisors guiding enterprises from assessment to operational implementation.",
    earn: "Referral commission on every client introduced",
  },
  {
    title: "Technology Partners",
    desc: "Product teams embedding JShield's consent, breach and audit capabilities into their own platforms.",
    earn: "Revenue share on co-sold and integrated deals",
  },
  {
    title: "System Integrators",
    desc: "Implementation teams connecting JShield to enterprise estates such as CRM, HRMS and core systems.",
    earn: "Reseller margin plus your own implementation fees",
  },
  {
    title: "Law Firms and Advisory",
    desc: "Legal and regulatory advisors who need audit-ready evidence packs behind their client opinions.",
    earn: "Referral fee for every client introduction",
  },
  {
    title: "Resellers and Distributors",
    desc: "Regional and vertical specialists taking DPDP readiness to companies in their region or sector.",
    earn: "Wholesale pricing with volume-based discount tiers",
  },
];

const ADVANTAGES = [
  {
    title: "Durable services revenue",
    desc: "Build recurring income from support, training and advisory work wrapped around every JShield deployment.",
  },
  {
    title: "A complete platform to stand behind",
    desc: "Every JShield module is connected, so you can cover every duty in the law with one product.",
  },
  {
    title: "Dedicated partner enablement",
    desc: "Technical training, co-selling support, marketing collateral and a partner success manager assigned to you.",
  },
  {
    title: "Simple commercials",
    desc: "One clear price keeps the client's entry barrier low, while your revenue comes from implementation, training and advisory.",
  },
];

const STEPS = [
  { title: "Apply", desc: "Send your practice details through the form below and tell us how you work with clients." },
  { title: "Get reviewed", desc: "Our partnerships team reviews every application." },
  { title: "Start earning", desc: "Complete onboarding, then run your first co-sold engagement with our support behind you." },
];

export default function PartnerProgram() {
  usePageTitle("Partner programme | JShield");
  return (
    <LandingLayout>
      <PageHero
        eyebrow="Partner programme"
        title="Build a compliance practice with JShield"
        subtitle="Help Indian companies meet the data law and build a steady services revenue line alongside ours. Five partner tracks, each with a clear way to earn."
      />

      <Section tone>
        <SectionHeading
          title="Who we partner with"
          intro="Five partnership tracks, each with a clear commercial model."
        />
        <Accordion
          items={PARTNER_TYPES.map((p) => ({
            title: p.title,
            desc: (
              <>
                {p.desc}
                <span className="mt-3 block text-slate-300">{p.earn}</span>
              </>
            ),
          }))}
        />
      </Section>

      <Section>
        <SectionHeading title="Why partners choose JShield" intro="How partners earn with JShield." />
        <div className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2">
          {ADVANTAGES.map((a) => (
            <div key={a.title}>
              <h3 className="text-white">{a.title}</h3>
              <p className="mt-2 text-[17px] leading-[1.6] text-slate-300">{a.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone>
        <SectionHeading title="How it works" intro="From application to first engagement in three steps." />
        <Stepper steps={STEPS} ariaLabel="How it works" />
      </Section>

      <Section id="apply" narrow>
        <Reveal>
          <h2 className="text-white text-balance">Apply to become a partner</h2>
          <p className="mt-2 text-[17px] leading-[1.6] text-slate-300">Tell us about your practice.</p>
          <div className="mt-8">
            <LeadForm
              intent="partner"
              sourcePage="/partners"
              fields={[
                { name: "name", label: "Name", placeholder: "Priya Sharma" },
                { name: "work_email", label: "Work email", type: "email", placeholder: "you@firm.com" },
                { name: "company", label: "Firm", placeholder: "Acme Advisory" },
                {
                  name: "partner_type",
                  label: "Partner type",
                  type: "select",
                  options: PARTNER_TYPES.map((p) => p.title),
                  placeholder: "Select a partner type",
                },
                { name: "city", label: "City", placeholder: "Bengaluru" },
                { name: "clients_served", label: "Number of clients you serve", placeholder: "25" },
              ]}
              submitLabel="Apply to become a partner"
              thankYou="Thank you. Our partnerships team will be in touch."
            />
          </div>
        </Reveal>
      </Section>

      <CTASection tone />
    </LandingLayout>
  );
}