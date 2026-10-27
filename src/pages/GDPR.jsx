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
  { stat: "7", label: "principles that all other duties come from (Art. 5)" },
  { stat: "Art. 3", label: "brings in companies outside the EU that serve or track people there" },
];

const APPLIES = [
  "Companies outside Europe with customers, users or employees in the EU or UK",
  "Software and service firms that handle data for EU clients under contract",
  "Teams working on the DPDP Act that now get GDPR questions from EU buyers",
];

const PRINCIPLES = [
  { title: "Lawful and open use", desc: "Each use of personal data needs a legal reason and a notice people can understand." },
  { title: "Purpose limits", desc: "Collect data for a stated purpose and do not reuse it for something unrelated." },
  { title: "Only the data you need", desc: "Hold only the data the purpose needs." },
  { title: "Accuracy", desc: "Keep records correct, and fix or erase wrong data without delay." },
  { title: "Time limits on storage", desc: "Set how long each kind of data is kept, and delete it when that time ends." },
  { title: "Security", desc: "Protect data against loss and misuse with suitable technical and organisational measures." },
  { title: "Accountability", desc: "Be able to show you comply, with records and evidence." },
];

const RIGHTS = [
  { title: "Access", desc: "A person can ask for a copy of their data. JShield logs the request, checks identity and asks each system owner to collect it." },
  { title: "Correction", desc: "Wrong or incomplete data must be fixed. JShield sends the fix to each system owner and records when it is done." },
  { title: "Erasure", desc: "Data must be deleted where the grounds apply. JShield checks exceptions first, then confirms deletion system by system." },
  { title: "Restriction", desc: "Use of the data pauses while a dispute is settled. JShield flags the data and sets a review date." },
  { title: "Portability", desc: "A person can take their data in a file other systems can read. JShield prepares the export and logs it." },
  { title: "Objection", desc: "A person can object to some uses, such as direct marketing. JShield adds them to a do-not-contact list and records the decision." },
];

const MODULES = [
  { title: "Record of processing (Art. 30)", desc: "One live list of the data you use, why, for how long and who receives it." },
  { title: "Impact assessments (Art. 35 and 36)", desc: "Risk reviews for high-risk uses of data: screening, risks, fixes, sign-off and a review date." },
  { title: "Rights requests (Art. 12 to 22)", desc: "Intake, identity check, tasks per system and a clock for the one-month deadline and extensions." },
  { title: "Consent and notices (Art. 6, 7, 13 and 14)", desc: "Every notice version, every consent and withdrawal, and a marketing do-not-contact list." },
  { title: "Breach register (Art. 33 and 34)", desc: "Incident log with a 72-hour clock, a risk decision and drafts for the regulator and affected people." },
  { title: "Vendors and transfers (Art. 28, 44 to 49)", desc: "Vendor contract checks, tracking of their own vendors and the legal route for each transfer outside the EU." },
  { title: "Evidence store", desc: "Time-stamped proof from every module, ready to export for a regulator, an auditor or a customer." },
];

const STEPS = [
  { title: "Map data", desc: "List activities, systems, data types, vendors and the teams that own them." },
  { title: "Find gaps", desc: "Score current practice against the principles and rights, and rank the fixes." },
  { title: "Set legal basis", desc: "Record the legal reason for each activity, update notices and fix consent where you rely on it." },
  { title: "Build workflows", desc: "Set up request and breach workflows with owners, then test them with a dry run." },
  { title: "Check vendors", desc: "Review vendor contracts and set a legal route for each transfer abroad." },
  { title: "Run monthly", desc: "Run reviews and collect evidence every month, and report status to leadership." },
];

const FAQ = [
  { title: "Does JShield make us GDPR compliant?", desc: "No tool can do that alone. JShield runs the workflows and keeps the evidence, and legal calls stay with your lawyers and Data Protection Officer." },
  { title: "Is there a GDPR certificate?", desc: "There is no general GDPR certificate. Approved schemes exist under Article 42, but they are separate and limited." },
  { title: "How does this relate to the DPDP Act?", desc: "Notices, consent, requests and breaches overlap, so one set of evidence serves both. JShield tracks each law's own details and deadlines." },
];

export default function GDPR() {
  usePageTitle("GDPR compliance | JShield", "Meet GDPR with JShield: consent records, requests from people about their data, breach reporting within 72 hours and a live record of the data you use.");
  return (
    <LandingLayout>
      <PageHero
        eyebrow="GDPR, explained"
        title="JShield turns each GDPR duty into a task with an owner."
        subtitle="GDPR applies if you are based in the EU or UK, or sell to or track people there. JShield tracks each duty and keeps proof."
      />

      <Section tone>
        <SectionHeading
          title="GDPR can apply to your company even with no office in Europe."
          intro="It applies if you offer goods or services to people in the EU, or track how they behave online."
        />
        <div className="mt-8 grid gap-x-8 gap-y-8 md:grid-cols-2">
          <ul className="md:-mt-3">
            {APPLIES.map((t) => (
              <li key={t} className="py-3 text-[18px] leading-[1.6] text-slate-200">
                {t}
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-2 gap-x-6 gap-y-6">
            {FACTS.map((f) => (
              <div key={f.stat}>
                <div className="text-[24px] sm:text-[30px] font-bold leading-tight tracking-tight text-white stat-figure">{f.stat}</div>
                <p className="mt-2 text-[16px] leading-snug text-slate-200 text-pretty">{f.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
          title="Seven principles sit behind every GDPR duty."
          intro="They are set out in Article 5."
        />
        <Accordion items={PRINCIPLES} />
      </Section>

      <Section tone>
        <SectionHeading
          title="People have six main rights over their data, and JShield runs a workflow for each."
          intro="Most requests must be answered within one month."
        />
        <Accordion items={RIGHTS} />
      </Section>

      <Section>
        <SectionHeading
          title="JShield runs seven GDPR tasks, each mapped to its articles."
          intro="Your team and your auditor can see which article each task supports."
        />
        <Accordion items={MODULES} />
      </Section>

      <Section tone>
        <SectionHeading
          title="A GDPR roll-out runs in six phases."
          intro="The phases are indicative. Timing depends on your size and how many systems hold personal data."
        />
        <Stepper steps={STEPS} ariaLabel="GDPR roll-out phases" />
      </Section>

      <Section>
        <SectionHeading title="Three common questions about GDPR and JShield." />
        <Accordion items={FAQ} />
      </Section>

      <CTASection />
    </LandingLayout>
  );
}
