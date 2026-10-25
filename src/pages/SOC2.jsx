import LandingLayout from "@/components/landing/LandingLayout";
import PageHero from "@/components/landing/PageHero";
import Section from "@/components/landing/Section";
import SectionHeading from "@/components/landing/SectionHeading";
import Accordion from "@/components/landing/Accordion";
import Stepper from "@/components/landing/Stepper";
import CTASection from "@/components/landing/CTASection";
import usePageTitle from "@/hooks/usePageTitle";

const FACTS = [
  { stat: "5", label: "Trust Services categories; Security is always in scope" },
  { stat: "CC1 to CC9", label: "the common criteria auditors test for Security" },
  { stat: "3 to 12 months", label: "a typical Type II observation period" },
  { stat: "Type II", label: "the report most enterprise buyers ask for" },
];

const CATEGORIES = [
  { title: "Security (always required)", desc: "Protection against unauthorised access, use and disclosure. Covered by the common criteria CC1 to CC9." },
  { title: "Availability", desc: "The system is up and usable as promised. Covers capacity, backup, recovery and monitoring." },
  { title: "Processing integrity", desc: "Processing is complete, valid, accurate, on time and authorised." },
  { title: "Confidentiality", desc: "Information marked confidential is protected and disposed of as promised." },
  { title: "Privacy", desc: "Personal information is collected, used, kept, shared and disposed of in line with your notice. Overlaps with GDPR and the DPDP Act." },
];

const CRITERIA = [
  { title: "CC1 Control environment", desc: "Ethics, board oversight, clear accountability and skilled people." },
  { title: "CC2 Communication", desc: "Goals and responsibilities shared inside the company and with customers." },
  { title: "CC3 Risk assessment", desc: "Risks identified and rated, including fraud and change." },
  { title: "CC4 Monitoring", desc: "Controls checked on a schedule, with gaps reported in time." },
  { title: "CC5 Control activities", desc: "Controls chosen and run through written policies and procedures." },
  { title: "CC6 Access", desc: "Log-in, joiner and leaver checks, encryption and physical security." },
  { title: "CC7 System operations", desc: "Spotting weaknesses and unusual activity, incident response and recovery." },
  { title: "CC8 Change management", desc: "Changes approved and tested before release." },
  { title: "CC9 Risk mitigation", desc: "Business disruption, vendor and partner risk." },
];

const MODULES = [
  { title: "Control library (all categories)", desc: "Controls mapped to the criteria, each with an owner and a test frequency. Map once and reuse for GDPR and the DPDP Act." },
  { title: "Evidence engine (CC4 and every criterion)", desc: "Scheduled evidence tasks and time-stamped logs, so proof is collected as work happens." },
  { title: "Access reviews (CC6)", desc: "Quarterly user access reviews with reviewer sign-off, joiner and leaver checks and exception tracking." },
  { title: "Risk register (CC3 and CC9)", desc: "Risks scored with owners, treatment plans and an annual review." },
  { title: "Vendor risk (CC9)", desc: "Questionnaires, vendor report tracking and a review schedule for each supplier." },
  { title: "Change evidence (CC8)", desc: "Tickets and approvals linked to each release, including emergency changes." },
  { title: "Incident response (CC7)", desc: "Incident log, post-incident reviews and records of practice drills." },
  { title: "Policies and training (CC1, CC2 and CC5)", desc: "Versioned policies, staff acknowledgment and onboarding and annual training records." },
  { title: "Auditor workspace", desc: "A read-only view of organised evidence and the auditor's request list." },
];

const STEPS = [
  { title: "Step 1", desc: "Set the system boundary and pick the categories that match what you promise customers." },
  { title: "Step 2", desc: "Compare current controls with the criteria and list the gaps, each with an owner." },
  { title: "Step 3", desc: "Close the gaps, finish policies, switch on logging and assign control owners." },
  { title: "Step 4", desc: "Optional Type I report, a point-in-time check that can unblock early deals." },
  { title: "Step 5", desc: "Observation period: controls run and evidence is collected throughout." },
  { title: "Step 6", desc: "Your audit firm tests samples and issues the report. JShield hands over organised evidence." },
  { title: "Step 7", desc: "Keep controls running all year so the next period starts clean." },
];

export default function SOC2() {
  usePageTitle("SOC 2 readiness | JShield", "Prepare for a SOC 2 audit with JShield: map controls, collect evidence as you work and show auditors a clear record.");
  return (
    <LandingLayout>
      <PageHero
        eyebrow="SOC 2, explained"
        title="Stay ready for SOC 2 all year, not only in audit month."
        subtitle="Enterprise buyers ask for a SOC 2 report during security review. JShield maps your controls to the Trust Services Criteria, runs them on a schedule and keeps the evidence, so the audit starts from organised records."
      />

      <Section tone>
        <SectionHeading
          title="The five categories"
          intro="Security is always in scope. You add the others based on what you promise your customers."
        />
        <div className="mt-8 grid gap-x-6 gap-y-6 grid-cols-2 lg:grid-cols-4">
          {FACTS.map((f) => (
            <div key={f.stat}>
              <div className="text-[24px] sm:text-[30px] font-bold leading-tight tracking-tight text-white stat-figure">{f.stat}</div>
              <p className="mt-2 text-[16px] leading-snug text-slate-300 text-pretty">{f.label}</p>
            </div>
          ))}
        </div>
        <Accordion items={CATEGORIES} className="mt-8" />
      </Section>

      <Section>
        <SectionHeading
          title="Type I or Type II?"
          intro="Most enterprise buyers ask for Type II. Some teams take a Type I first to support early sales."
        />
        <div className="mt-8 grid gap-x-8 gap-y-8 md:grid-cols-2">
          <div>
            <h3 className="text-white">Type I</h3>
            <p className="mt-3 text-[18px] leading-[1.6] text-slate-300">
              Tests whether controls are designed well, at a single point in time. Needs policies and settings as
              they stand on that date.
            </p>
          </div>
          <div>
            <h3 className="text-white">Type II</h3>
            <p className="mt-3 text-[18px] leading-[1.6] text-slate-300">
              Tests whether controls are designed well and worked throughout a period, usually 3 to 12 months.
              Needs time-stamped proof across the whole period.
            </p>
          </div>
        </div>
      </Section>

      <Section tone>
        <SectionHeading
          title="What auditors look for under Security"
          intro="The common criteria at a glance, in plain words."
        />
        <Accordion items={CRITERIA} />
      </Section>

      <Section>
        <SectionHeading
          title="What JShield runs for SOC 2"
          intro="Each module is mapped to the criteria it supports. Shared controls such as access reviews, vendor risk and incident response are tracked once and count for GDPR and the DPDP Act too."
        />
        <Accordion items={MODULES} />
      </Section>

      <Section tone>
        <SectionHeading
          title="From scoping to a clean report"
          intro="Indicative steps. Timing depends on how mature your controls are today and the length of the observation period."
        />
        <Stepper steps={STEPS} ariaLabel="SOC 2 audit steps" />
      </Section>

      <Section narrow>
        <SectionHeading
          title="What to expect"
          intro="A SOC 2 report is issued by an independent licensed CPA firm after its own audit. JShield prepares the controls and evidence and keeps you ready. It does not issue the report or promise an outcome."
        />
      </Section>

      <CTASection />
    </LandingLayout>
  );
}
