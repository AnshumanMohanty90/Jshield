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
    title: "Consulting partners",
    desc: "Privacy, risk and compliance advisers who take clients from first assessment to working controls.",
    earn: "Referral commission on every client introduced",
  },
  {
    title: "Technology partners",
    desc: "Product teams who build JShield's consent, breach and audit features into their own platforms.",
    earn: "Revenue share on co-sold and integrated deals",
  },
  {
    title: "System integrators",
    desc: "Implementation teams who connect JShield to client systems such as CRM, HR and core platforms.",
    earn: "Reseller margin plus your own implementation fees",
  },
  {
    title: "Law and advisory firms",
    desc: "Legal and regulatory advisers who need audit-ready evidence behind their client opinions.",
    earn: "Referral fee for every client introduction",
  },
  {
    title: "Resellers and distributors",
    desc: "Regional and sector specialists who sell DPDP readiness to companies in their market.",
    earn: "Wholesale pricing with volume discounts",
  },
];

const ADVANTAGES = [
  {
    title: "Services income",
    desc: "Earn recurring income from support, training and advice around each JShield roll-out.",
  },
  {
    title: "One complete product",
    desc: "All JShield modules are connected, so one product covers the main DPDP duties.",
  },
  {
    title: "Training and sales support",
    desc: "Technical training, joint selling, marketing material and a named partner manager.",
  },
  {
    title: "Simple pricing for clients",
    desc: "One clear price makes it easy for clients to start. You earn from implementation, training and advice.",
  },
];

const STEPS = [
  { title: "Apply", desc: "Send your practice details and how you work with clients through the form below." },
  { title: "Get reviewed", desc: "Our partnerships team reviews every application." },
  { title: "Start earning", desc: "Finish onboarding, then run your first joint deal with our support." },
];

export default function PartnerProgram() {
  usePageTitle("Partner programme | JShield", "Partner with JShield to bring data protection compliance to your clients, with training, sales support and shared revenue.");
  return (
    <LandingLayout>
      <PageHero
        eyebrow="Partner programme"
        title="Earn by bringing JShield to your clients."
        subtitle="Help companies meet data protection laws, and earn from referrals, resale and your own services."
      />

      <Section tone>
        <SectionHeading
          title="Five partner tracks, each with its own way to earn."
          intro="Pick the track that fits how you work with clients."
        />
        <Accordion
          items={PARTNER_TYPES.map((p) => ({
            title: p.title,
            desc: (
              <>
                {p.desc}
                <span className="mt-3 block text-slate-200">{p.earn}</span>
              </>
            ),
          }))}
        />
      </Section>

      <Section>
        <SectionHeading title="Partners earn from JShield and from their own services." intro="Four reasons partners work with us." />
        <div className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2">
          {ADVANTAGES.map((a) => (
            <div key={a.title}>
              <h3 className="text-white">{a.title}</h3>
              <p className="mt-2 text-[18px] leading-[1.6] text-slate-200">{a.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone>
        <SectionHeading title="Joining takes three steps." intro="From application to your first client deal." />
        <Stepper steps={STEPS} ariaLabel="How joining works" />
      </Section>

      <Section id="apply" narrow>
        <Reveal>
          <h2 className="text-white text-balance">Apply to join the partner programme.</h2>
          <p className="mt-2 text-[18px] leading-[1.6] text-slate-200">Tell us about your practice.</p>
          <div className="mt-8 rounded-2xl bg-white/[0.03] p-6 sm:p-8">
            <LeadForm
              intent="partner"
              sourcePage="/partners"
              fields={[
                { name: "name", label: "Name" },
                { name: "work_email", label: "Work email", type: "email" },
                { name: "company", label: "Firm" },
                {
                  name: "partner_type",
                  label: "Partner type",
                  type: "select",
                  options: PARTNER_TYPES.map((p) => p.title),
                  placeholder: "Select a partner type",
                },
                { name: "city", label: "City (optional)", required: false },
                { name: "clients_served", label: "Number of clients you serve", requiredMessage: "Please tell us how many clients you serve." },
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