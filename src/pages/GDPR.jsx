import LandingLayout from "@/components/landing/LandingLayout";
import PageHero from "@/components/landing/PageHero";
import Section from "@/components/landing/Section";
import SectionHeading from "@/components/landing/SectionHeading";
import Accordion from "@/components/landing/Accordion";
import Stepper from "@/components/landing/Stepper";
import CTASection from "@/components/landing/CTASection";
import usePageTitle from "@/hooks/usePageTitle";

const FACTS = [
  { stat: "72 hours", label: "to tell the regulator about a serious breach (Art. 33)" },
  { stat: "1 month", label: "to answer a person's request about their data (Art. 12)" },
  { stat: "7", label: "principles that every other duty traces back to (Art. 5)" },
  { stat: "Art. 3", label: "reaches companies outside the EU that serve or track people in it" },
];

const APPLIES = [
  "Companies outside Europe with customers, users or employees in the EU or UK",
  "SaaS and service firms that process data for EU clients under a contract",
  "Teams already working on the DPDP Act that now get GDPR questions from EU buyers",
];

const PRINCIPLES = [
  { title: "Lawful, fair and clear", desc: "Every use of personal data needs a legal basis and a privacy notice people can understand." },
  { title: "Purpose limitation", desc: "Collect data for a stated purpose and do not reuse it for something unrelated." },
  { title: "Data minimisation", desc: "Hold only the data the purpose needs, nothing extra." },
  { title: "Accuracy", desc: "Keep records correct, and fix or erase wrong data without delay." },
  { title: "Storage limitation", desc: "Set a retention period for each kind of data and delete it when the period ends." },
  { title: "Security", desc: "Protect data against loss and misuse with suitable technical and organisational measures." },
  { title: "Accountability", desc: "Be able to show you comply. This is where records and evidence decide the outcome." },
];

const RIGHTS = [
  { title: "Access", desc: "A person can ask what you hold and get a copy. JShield logs the request, checks identity and gives each system owner a collection task." },
  { title: "Correction", desc: "Wrong or incomplete data must be fixed. JShield routes the fix to the owner of each system and records when it is done." },
  { title: "Erasure", desc: "Data must be deleted where the grounds apply. JShield checks exceptions first, then confirms deletion system by system." },
  { title: "Restriction", desc: "Use of the data pauses while a dispute is settled. JShield sets a restriction flag and a review date." },
  { title: "Portability", desc: "A person can take their data in a machine-readable file. JShield prepares the export and keeps a log." },
  { title: "Objection", desc: "A person can object to some uses, such as direct marketing. JShield adds them to a suppression list and records the decision." },
];

const MODULES = [
  { title: "Record of processing (Art. 30)", desc: "One live register of what you process, why, for how long and who receives it, with owners and review reminders." },
  { title: "Impact assessments (Art. 35 and 36)", desc: "Screening to decide if an assessment is needed, then risks, fixes, sign-off and a re-review date." },
  { title: "Rights requests (Art. 12 to 22)", desc: "Intake, identity check, tasks per system and a clock that tracks the one-month deadline and extensions." },
  { title: "Consent and notices (Art. 6, 7, 13 and 14)", desc: "Every notice version, every consent and withdrawal, and a marketing suppression list." },
  { title: "Breach register (Art. 33 and 34)", desc: "Incident log with a 72-hour clock, a risk decision record and drafts for the regulator and for affected people." },
  { title: "Vendors and transfers (Art. 28, 44 to 49)", desc: "Processor contract checks, sub-processor tracking and the transfer mechanism for each flow outside the EU." },
  { title: "Evidence vault", desc: "Time-stamped proof from every module, ready to export for a regulator, an auditor or a customer." },
];

const STEPS = [
  { title: "Phase 1", desc: "Find the data: activities, systems, data types, vendors and owning teams." },
  { title: "Phase 2", desc: "Score current practice against the principles and rights, and list fixes by priority." },
  { title: "Phase 3", desc: "Record the legal basis for each activity, update notices and fix consent where you rely on it." },
  { title: "Phase 4", desc: "Set up request and breach workflows with owners, then test them with a dry run." },
  { title: "Phase 5", desc: "Review vendor contracts and put a transfer mechanism in place for each cross-border flow." },
  { title: "Phase 6", desc: "Run reviews and evidence collection every month, and report status to leadership." },
];

const FAQ = [
  { title: "Does JShield make us GDPR compliant?", desc: "No tool can do that alone. JShield runs the workflows and keeps the evidence. Legal judgments stay with your counsel and your DPO." },
  { title: "Is there a GDPR certificate?", desc: "There is no general GDPR certificate. Approved certification schemes exist under Article 42, but they are separate and limited." },
  { title: "How does this relate to the DPDP Act?", desc: "Notices, consent, requests and breach handling overlap, so one evidence base serves both. The details and deadlines differ, and JShield tracks each law on its own terms." },
];

export default function GDPR() {
  usePageTitle("GDPR compliance | JShield", "Meet GDPR with JShield: lawful basis and consent records, data subject requests, breach reporting within 72 hours and a live record of processing.");
  return (
    <LandingLayout>
      <PageHero
        eyebrow="GDPR, explained"
        title="GDPR, run as everyday work."
        subtitle="If you serve customers or hold employee data from the EU or UK, GDPR applies to you alongside any other data protection law you follow, such as India's DPDP Act. JShield turns each GDPR duty into an owned task with a deadline and keeps the proof."
      />

      <Section tone>
        <SectionHeading
          title="Does it apply to you?"
          intro="GDPR follows the people, not the office. Where you are based does not matter if you offer goods or services to people in the EU or track how they behave online."
        />
        <div className="mt-8 grid gap-x-8 gap-y-8 md:grid-cols-2">
          <ul className="md:-mt-3">
            {APPLIES.map((t) => (
              <li key={t} className="py-3 text-[18px] leading-[1.6] text-slate-300">
                {t}
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-2 gap-x-6 gap-y-6">
            {FACTS.map((f) => (
              <div key={f.stat}>
                <div className="text-[30px] font-bold leading-none tracking-tight text-white">{f.stat}</div>
                <p className="mt-2 text-[16px] leading-snug text-slate-300 text-pretty">{f.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
          title="The seven principles"
          intro="Article 5 sets the rules that every other GDPR duty comes from."
        />
        <Accordion items={PRINCIPLES} />
      </Section>

      <Section tone>
        <SectionHeading
          title="People's rights, and how JShield handles each one"
          intro="Requests must usually be answered within one month. Each right below has its own workflow in JShield."
        />
        <Accordion items={RIGHTS} />
      </Section>

      <Section>
        <SectionHeading
          title="What JShield runs for GDPR"
          intro="Each module is mapped to the articles it supports, so your team and your auditor can see the link."
        />
        <Accordion items={MODULES} />
      </Section>

      <Section tone>
        <SectionHeading
          title="From first look to steady running"
          intro="Indicative phases. Timing depends on your size and how many systems hold personal data."
        />
        <Stepper steps={STEPS} ariaLabel="GDPR roll-out phases" />
      </Section>

      <Section>
        <SectionHeading title="Common questions" />
        <Accordion items={FAQ} />
      </Section>

      <CTASection />
    </LandingLayout>
  );
}
