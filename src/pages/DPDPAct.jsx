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
  "Use of data needed to enforce a legal right or follow a court order",
  "Set government functions, such as national security, under safeguards in the rules",
];

const ROLES = [
  { title: "Data Principal", desc: "The person the data is about, such as a customer, patient or employee." },
  { title: "Data Fiduciary", desc: "Your company. You decide why and how personal data is used, and you answer for it." },
  { title: "Significant Data Fiduciary", desc: "A company the government names as significant. It has extra duties, such as risk assessments and audits." },
  { title: "Data Processor", desc: "A vendor that handles data on your instructions. You stay responsible for it." },
  { title: "Consent Manager", desc: "A single service where people review and manage the consents they have given." },
  { title: "Data Protection Board", desc: "The regulator. It hears complaints, runs inquiries and sets penalties." },
];

const OBLIGATIONS = [
  { title: "Notice", desc: "Before you collect, tell people what you collect, why, and how to use their rights." },
  { title: "Consent", desc: "Get a clear yes for each purpose after showing the notice. Pre-ticked boxes do not count." },
  { title: "Purpose limits", desc: "Use data only for the purpose you collected it for." },
  { title: "Accuracy", desc: "Keep records correct and complete enough for the purpose they serve." },
  { title: "Deletion", desc: "Erase personal data when consent is withdrawn or the purpose is served, unless a law requires you to keep it." },
  { title: "Security safeguards", desc: "Protect data with reasonable technical and operational controls." },
  { title: "Breach reporting", desc: "Tell affected people and the Board without delay, then send the Board a full report within 72 hours." },
  { title: "Customer requests", desc: "Answer requests to see, correct or delete data within the set deadlines." },
  { title: "Children's data", desc: "Use a child's data only with verified parental consent. Do not track or target children." },
  { title: "Complaints", desc: "Publish a grievance officer and reply to complaints within the set timelines." },
];

const DATES = [
  { title: "2017", desc: "The Supreme Court holds that privacy is a fundamental right." },
  { title: "August 2023", desc: "The DPDP Act becomes law, India's first law for digital personal data." },
  { title: "November 2025", desc: "The DPDP Rules are notified, and duties start in stages." },
  { title: "13 November 2026", desc: "Consent Managers can apply to register with the Board." },
  { title: "13 May 2027", desc: "The main duties apply in full." },
];

export default function DPDPAct() {
  const { currency, rate } = useCurrency();
  usePageTitle("DPDP Act explained | JShield", "What India's Digital Personal Data Protection Act asks of companies that handle the personal data of people in India, and how JShield helps you meet it.");
  return (
    <LandingLayout>
      <PageHero
        eyebrow="The DPDP Act, explained"
        title="What the DPDP Act asks of your company."
        subtitle="India's personal data law in plain words: who it covers, what it asks and what failing costs."
      />

      <Section tone>
        <SectionHeading
          title="The law covers almost every company that holds personal data digitally."
          intro="If you keep customer or employee details in any digital form, the law covers you. There is no small business exemption, and one complaint can start an inquiry."
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
            <p className="text-[16px] font-semibold text-slate-300">Outside the law or exempt from most duties</p>
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
          title="Six roles in the Act decide who does what."
          intro="Your company is usually the Data Fiduciary. The terms below are used across the law."
        />
        <Accordion items={ROLES} />
      </Section>

      <Section tone>
        <SectionHeading
          title="The Act gives your company ten duties."
          intro="Each duty is something you owe the people whose data you hold. JShield tracks each one with an owner and proof."
        />
        <Accordion items={OBLIGATIONS} />
      </Section>

      <Section>
        <SectionHeading
          title="The main duties apply in full from 13 May 2027."
          intro="These dates follow the government's official schedule."
        />
        <Stepper steps={DATES} ariaLabel="DPDP Act timeline" />
      </Section>

      <Section tone>
        <SectionHeading
          title="Penalties under the Act go up to Rs 250 crore."
          intro="The Data Protection Board, India's data regulator, sets each penalty after an inquiry, based on the failure."
        />
        <div className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-3">
          <div>
            <div className="text-[24px] sm:text-[30px] font-bold leading-tight tracking-tight text-white stat-figure">Rs 250 crore</div>
            {currency === "USD" && <p className="mt-1 text-[14px] text-slate-300">About {formatLarge(2.5e9, "USD", rate)}</p>}
            <p className="mt-2 text-[18px] leading-[1.6] text-slate-200">
              Maximum penalty for failing to keep personal data secure with adequate safeguards.
            </p>
          </div>
          <div>
            <div className="text-[24px] sm:text-[30px] font-bold leading-tight tracking-tight text-white stat-figure">Rs 200 crore</div>
            {currency === "USD" && <p className="mt-1 text-[14px] text-slate-300">About {formatLarge(2e9, "USD", rate)}</p>}
            <p className="mt-2 text-[18px] leading-[1.6] text-slate-200">
              Maximum for not reporting a breach, or breaking the rules on children's data.
            </p>
          </div>
          <div>
            <div className="text-[24px] sm:text-[30px] font-bold leading-tight tracking-tight text-white stat-figure">Rs 50 crore</div>
            {currency === "USD" && <p className="mt-1 text-[14px] text-slate-300">About {formatLarge(5e8, "USD", rate)}</p>}
            <p className="mt-2 text-[18px] leading-[1.6] text-slate-200">
              Maximum for most other failures, such as consent gaps or ignored customer requests.
            </p>
          </div>
        </div>
      </Section>

      <CTASection />
    </LandingLayout>
  );
}