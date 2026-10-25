import LandingLayout from "@/components/landing/LandingLayout";
import PageHero from "@/components/landing/PageHero";
import Section from "@/components/landing/Section";
import SectionHeading from "@/components/landing/SectionHeading";
import Accordion from "@/components/landing/Accordion";
import Stepper from "@/components/landing/Stepper";
import CTASection from "@/components/landing/CTASection";
import usePageTitle from "@/hooks/usePageTitle";
import { useCurrency, formatLarge } from "@/lib/currency";

const APPLIES = [
  "Customer, employee or patient records held in any computer, application or website",
  "Details collected on paper first, then typed or photographed into a digital system",
  "Organisations outside India that offer goods or services to people in India online",
];

const EXEMPT = [
  "Information a person has chosen to make public themselves",
  "Purely personal or household use of data",
  "Processing needed to enforce a legal right or comply with a court order",
  "Defined government functions such as national security, under prescribed safeguards",
];

const ROLES = [
  { title: "Data Principal", desc: "The individual the data belongs to. The Act restores their say over how it is used." },
  { title: "Data Fiduciary", desc: "Your organisation. It decides why and how personal data is processed, and answers for it." },
  { title: "Significant Data Fiduciary", desc: "A fiduciary notified as significant. It carries additional duties such as impact assessments and audits." },
  { title: "Data Processor", desc: "Vendors and platforms that process data on your instructions. You remain accountable for them." },
  { title: "Consent Manager", desc: "A single accountable interface through which principals review and manage the consents they have given." },
  { title: "Data Protection Board", desc: "The regulator. It hears complaints, runs inquiries and sets penalties." },
];

const OBLIGATIONS = [
  { title: "Notice", desc: "Tell people what you collect, why, and how to exercise their rights before you collect." },
  { title: "Consent", desc: "Take a clear, specific and informed yes. No pre-ticked boxes, no bundled purposes." },
  { title: "Purpose limitation", desc: "Data collected for one purpose cannot quietly become data used for another." },
  { title: "Accuracy", desc: "Keep records correct and complete enough for the purpose they serve." },
  { title: "Retention and erasure", desc: "Erase personal data once the purpose is served and consent is withdrawn or expires." },
  { title: "Security safeguards", desc: "Protect data with reasonable technical and operational controls, including for children." },
  { title: "Breach notification", desc: "Inform affected principals and report to the Board without delay when data is compromised." },
  { title: "Customer requests", desc: "Answer requests to see, correct or delete their data, and resolve complaints, within the set deadlines." },
  { title: "Children's data", desc: "Process a child's data only with verifiable parental consent, and never track or target them." },
  { title: "Grievance redressal", desc: "Publish a grievance officer and respond to principals within the prescribed timelines." },
];

const DATES = [
  { title: "2017", desc: "The Supreme Court holds privacy to be a fundamental right, setting the constitutional foundation." },
  { title: "August 2023", desc: "The DPDP Act receives Presidential assent as India's first dedicated digital personal data law." },
  { title: "November 2025", desc: "The DPDP Rules are notified. The compliance clock starts on a staggered commencement schedule." },
  { title: "13 MAY 2027", desc: "The main duties apply in full." },
];

export default function DPDPAct() {
  const { currency, rate } = useCurrency();
  usePageTitle("DPDP Act explained | JShield", "What India's Digital Personal Data Protection Act asks of companies that handle the personal data of people in India, and how JShield helps you meet it.");
  return (
    <LandingLayout>
      <PageHero
        eyebrow="The DPDP Act, explained"
        title="What the law asks of you, in plain words."
        subtitle="The DPDP Act is India's law for personal data. It says what a company may collect, what it must do in return and what it costs to get it wrong. Here is the whole of it, without the legal language."
      />

      <Section tone>
        <SectionHeading
          title="Does it apply to you?"
          intro="Almost certainly. If your company keeps customer or employee details in any digital form, the law covers it. There is no small business exemption, and enforcement begins with a single complaint."
        />
        <div className="mt-8 grid gap-x-8 gap-y-10 md:grid-cols-2">
          <div>
            <p className="text-[16px] font-semibold text-emerald-400">Covered by the law</p>
            <ul className="mt-4">
              {APPLIES.map((t) => (
                <li key={t} className="py-3 text-[18px] leading-[1.6] text-slate-200">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[16px] font-semibold text-slate-300">Outside its scope</p>
            <ul className="mt-4">
              {EXEMPT.map((t) => (
                <li key={t} className="py-3 text-[18px] leading-[1.6] text-slate-200">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
          title="Who is who under the Act"
          intro="Six roles carry the whole law. Every duty maps to one of them, and you will meet each term below before it is used."
        />
        <Accordion items={ROLES} />
      </Section>

      <Section tone>
        <SectionHeading
          title="What the Act expects of you"
          intro="Each duty in the law is a promise to the people whose data you hold."
        />
        <Accordion items={OBLIGATIONS} />
      </Section>

      <Section>
        <SectionHeading
          title="The timeline that matters"
          intro="These dates follow the official schedule set by the government. The biggest one is 13 May 2027, when the rules apply in full."
        />
        <Stepper steps={DATES} ariaLabel="The timeline that matters" />
      </Section>

      <Section tone>
        <SectionHeading
          title="What non-compliance costs"
          intro="The Data Protection Board, India's data regulator, handles enforcement. Penalties depend on the breach and are set after an inquiry."
        />
        <div className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2">
          <div>
            <div className="text-[24px] sm:text-[30px] font-bold leading-tight tracking-tight text-white stat-figure">Rs 250 crore</div>
            {currency === "USD" && <p className="mt-1 text-[14px] text-slate-300">About {formatLarge(2.5e9, "USD", rate)}</p>}
            <p className="mt-2 text-[18px] leading-[1.6] text-slate-200">
              The maximum penalty for failing to protect personal data with adequate security safeguards.
            </p>
          </div>
          <div>
            <div className="text-[24px] sm:text-[30px] font-bold leading-tight tracking-tight text-white stat-figure">Rs 50 crore</div>
            {currency === "USD" && <p className="mt-1 text-[14px] text-slate-300">About {formatLarge(5e8, "USD", rate)}</p>}
            <p className="mt-2 text-[18px] leading-[1.6] text-slate-200">
              The maximum for most other violations, from consent failures to neglected principal rights.
            </p>
          </div>
        </div>
      </Section>

      <CTASection />
    </LandingLayout>
  );
}