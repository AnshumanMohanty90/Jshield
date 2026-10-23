import { useEffect, useState } from "react";
import Section from "./Section";
import SectionHeading from "./SectionHeading";
import { Reveal } from "./primitives";

const DEADLINE = new Date("2027-05-13T00:00:00");
const WEEK = 604800000;
const DAY = 86400000;

export default function WhyMatters() {
  const [ms, setMs] = useState(() => DEADLINE.getTime() - Date.now());

  useEffect(() => {
    const id = setInterval(() => setMs(DEADLINE.getTime() - Date.now()), 30000);
    return () => clearInterval(id);
  }, []);

  const weeks = Math.max(0, Math.floor(ms / WEEK));
  const days = Math.max(0, Math.floor((ms % WEEK) / DAY));

  const items = [
    { pre: "Up to", stat: "Rs 250 crore", label: "fine for a single breach" },
    { pre: "", stat: "7", label: "duties every company must run" },
    { pre: "", stat: "72 hours", label: "to report a breach" },
    { pre: "", stat: String(weeks), label: `weeks, ${days} days to 13 May 2027` },
  ];

  return (
    <Section tone>
      <SectionHeading
        label="Why it matters now"
        title="From 13 May 2027, the law asks for proof."
        intro="India's Digital Personal Data Protection Act (DPDP) sets how companies collect, use and protect customer data."
      />

      <Reveal className="mt-6 grid grid-cols-2 gap-x-6 gap-y-6 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-6 lg:grid-cols-4 lg:gap-x-8">
        {items.map((c) => (
          <div key={c.label}>
            {c.pre && <p className="text-[15px] text-slate-400">{c.pre}</p>}
            <div className="text-[32px] font-bold leading-none tracking-tight text-white text-pretty">
              {c.stat}
            </div>
            <p className="mt-2 text-[15px] leading-snug text-slate-300 text-pretty">{c.label}</p>
          </div>
        ))}
      </Reveal>
    </Section>
  );
}