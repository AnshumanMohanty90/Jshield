import LandingLayout from "@/components/landing/LandingLayout";
import PageHero from "@/components/landing/PageHero";
import Section from "@/components/landing/Section";
import SectionHeading from "@/components/landing/SectionHeading";
import Accordion from "@/components/landing/Accordion";
import Stepper from "@/components/landing/Stepper";
import CTASection from "@/components/landing/CTASection";
import usePageTitle from "@/hooks/usePageTitle";

const FACTS = [
  { stat: "5", label: "categories auditors can test, known as Trust Services Criteria" },
  { stat: "CC1 to CC9", label: "the common criteria auditors test for Security" },
  { stat: "3 to 12 months", label: "a typical Type II review period" },
  { stat: "Type II", label: "the report most large customers ask for" },
];

const CATEGORIES = [
  { title: "Security (always required)", desc: "Protection against unauthorised access, use and disclosure, tested through criteria CC1 to CC9." },
  { title: "Availability", desc: "The system is up and usable as promised, including capacity, backup, recovery and monitoring." },
  { title: "Processing integrity", desc: "Processing is complete, valid, accurate, on time and authorised." },
  { title: "Confidentiality", desc: "Information marked confidential is protected and disposed of as promised." },
  { title: "Privacy", desc: "Personal data is handled in line with your privacy notice. Overlaps with GDPR and the DPDP Act." },
];

const CRITERIA = [
  { title: "CC1 Control environment", desc: "Ethics, board oversight, clear accountability and skilled people." },
  { title: "CC2 Communication", desc: "Goals and responsibilities shared inside the company and with customers." },
  { title: "CC3 Risk assessment", desc: "Risks identified and rated, including fraud and change." },
  { title: "CC4 Monitoring", desc: "Controls checked on a schedule, with gaps reported in time." },
  { title: "CC5 Control activities", desc: "Controls chosen and run through written policies and procedures." },
  { title: "CC6 Access", desc: "Log-in controls, access checks when staff join or leave, encryption and physical security." },
  { title: "CC7 System operations", desc: "Spotting weaknesses and unusual activity, incident response and recovery." },
  { title: "CC8 Change management", desc: "Changes approved and tested before release." },
  { title: "CC9 Risk mitigation", desc: "Managing the risk of business disruption, vendors and partners." },
];

const MODULES = [
  { title: "Control library (all categories)", desc: "Controls mapped to the criteria, each with an owner and test schedule. Reused for GDPR and the DPDP Act." },
  { title: "Evidence collection (CC4 and every criterion)", desc: "Scheduled evidence tasks and time-stamped logs, so proof builds up as you work." },
  { title: "Access reviews (CC6)", desc: "Quarterly reviews of who has access, with sign-off, joiner and leaver checks and exceptions tracked." },
  { title: "Risk register (CC3 and CC9)", desc: "Risks scored, each with an owner, a plan and a yearly review." },
  { title: "Vendor risk (CC9)", desc: "Questionnaires, vendor report tracking and a review schedule for each supplier." },
  { title: "Change evidence (CC8)", desc: "Tickets and approvals linked to each release, including emergency changes." },
  { title: "Incident response (CC7)", desc: "Incident log, post-incident reviews and records of practice drills." },
  { title: "Policies and training (CC1, CC2 and CC5)", desc: "Versioned policies, staff sign-off, and onboarding and yearly training records." },
  { title: "Auditor workspace", desc: "A read-only view of organised evidence and the auditor's request list." },
];

const STEPS = [
  { title: "Set scope", desc: "Set the system boundary and pick the categories that match your promises to customers." },
  { title: "Find gaps", desc: "Compare current controls with the criteria and list the gaps, each with an owner." },
  { title: "Close gaps", desc: "Finish policies, switch on logging and assign control owners." },
  { title: "Type I (optional)", desc: "A check on a single date that can unblock early deals." },
  { title: "Collect evidence", desc: "Controls run and evidence is collected through the review period." },
  { title: "Get audited", desc: "Your audit firm tests samples and issues the report. JShield hands over organised evidence." },
  { title: "Keep running", desc: "Keep controls running all year so the next period starts clean." },
];

export default function SOC2() {
  usePageTitle("SOC 2 readiness | JShield", "Prepare for a SOC 2 audit with JShield: map controls, collect evidence as you work and show auditors a clear record.");
  return (
    <LandingLayout>
      <PageHero
        eyebrow="SOC 2, explained"
        title="Stay ready for your SOC 2 audit all year round."
        subtitle="Large customers ask for a SOC 2 report. JShield runs your controls on a schedule and keeps the evidence."
      />

      <Section tone>
        <SectionHeading
          title="SOC 2 has five categories, and Security is always one of them."
          intro="You add the others based on what you promise your customers."
        />
        <div className="mt-8 grid gap-x-6 gap-y-6 grid-cols-2 lg:grid-cols-4">
          {FACTS.map((f) => (
            <div key={f.stat}>
              <div className="text-[24px] sm:text-[30px] font-bold leading-tight tracking-tight text-white stat-figure">{f.stat}</div>
              <p className="mt-2 text-[16px] leading-snug text-slate-200 text-pretty">{f.label}</p>
            </div>
          ))}
        </div>
        <Accordion items={CATEGORIES} className="mt-8" />
      </Section>

      <Section>
        <SectionHeading
          title="Most large customers ask for a Type II report."
          intro="Some teams take a Type I first to support early sales."
        />
        <div className="mt-8 grid gap-x-8 gap-y-8 md:grid-cols-2">
          <div>
            <h3 className="text-white">Type I</h3>
            <p className="mt-3 text-[18px] leading-[1.6] text-slate-200">
              Checks that controls are well designed on a single date. Needs policies and settings as they stand on
              that day.
            </p>
          </div>
          <div>
            <h3 className="text-white">Type II</h3>
            <p className="mt-3 text-[18px] leading-[1.6] text-slate-200">
              Checks that controls are well designed and worked through a period, usually 3 to 12 months. Needs
              time-stamped proof for the whole period.
            </p>
          </div>
        </div>
      </Section>

      <Section tone>
        <SectionHeading
          title="Auditors test Security against nine common criteria."
          intro="Here they are in plain words."
        />
        <Accordion items={CRITERIA} />
      </Section>

      <Section>
        <SectionHeading
          title="JShield runs nine SOC 2 tasks, each mapped to its criteria."
          intro="Shared controls such as access reviews, vendor risk and incident response also count for GDPR and the DPDP Act."
        />
        <Accordion items={MODULES} />
      </Section>

      <Section tone>
        <SectionHeading
          title="A SOC 2 audit runs in seven steps."
          intro="The steps are indicative. Timing depends on your controls today and the length of the review period."
        />
        <Stepper steps={STEPS} ariaLabel="SOC 2 audit steps" />
      </Section>

      <Section narrow>
        <SectionHeading
          title="An independent licensed CPA firm issues your SOC 2 report."
          intro="The accounting firm issues it after its own audit. JShield prepares the controls and evidence and keeps you ready. It does not issue the report or promise an outcome."
        />
      </Section>

      <CTASection />
    </LandingLayout>
  );
}
