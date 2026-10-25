import Section from "./Section";
import SectionHeading from "./SectionHeading";
import { Reveal } from "./primitives";
import { useCurrency, formatLarge } from "@/lib/currency";

const ITEMS = [
  { stat: "Rs 250 crore", inr: 2.5e9, label: "maximum fine for failing to protect personal data" },
  { stat: "Rs 50 crore", inr: 5e8, label: "maximum for most other failures, such as consent" },
  { stat: "72 hours", label: "to report a breach to the Data Protection Board" },
  { stat: "Any size", label: "of company is covered; one complaint can start an inquiry" },
];

export default function WhyMatters() {
  const { currency, rate } = useCurrency();
  return (
    <Section tone>
      <SectionHeading
        label="Why it matters now"
        title="From 13 May 2027, the law asks for proof."
        intro="India's Digital Personal Data Protection Act (DPDP) sets how companies collect, use and protect customer data."
      />

      <Reveal className="mt-6 grid grid-cols-2 gap-x-6 gap-y-6 rounded-xl bg-white/[0.03] px-5 py-6 sm:px-6 lg:grid-cols-4 lg:gap-x-8">
        {ITEMS.map((c) => (
          <div key={c.stat} className="flex flex-col">
            <div className="text-[24px] sm:text-[30px] font-bold leading-tight tracking-tight text-white stat-figure">{c.stat}</div>
            {c.inr && currency === "USD" && (
              <p className="mt-1 text-[14px] text-slate-300">About {formatLarge(c.inr, "USD", rate)}</p>
            )}
            <p className="mt-3 max-w-[26ch] text-[16px] leading-snug text-slate-200 text-pretty">{c.label}</p>
          </div>
        ))}
      </Reveal>
    </Section>
  );
}
