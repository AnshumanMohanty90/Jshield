import { useEffect, useState } from "react";
import Section from "./Section";
import SectionHeading from "./SectionHeading";
import { Reveal } from "./primitives";

const DEADLINE = new Date("2027-05-13T00:00:00");
const WEEK = 604800000;
const DAY = 86400000;

const CARDS = [
  { pre: "Up to", stat: "Rs 250 crore", label: "fine for a single breach" },
  { pre: "", stat: "7", label: "duties every company must run" },
  { pre: "", stat: "72 hours", label: "to report a breach" },
];

export default function WhyMatters() {
  const [ms, setMs] = useState(() => DEADLINE.getTime() - Date.now());

  useEffect(() => {
    const id = setInterval(() => setMs(DEADLINE.getTime() - Date.now()), 30000);
    return () => clearInterval(id);
  }, []);

  const weeks = Math.max(0, Math.floor(ms / WEEK));
  const days = Math.max(0, Math.floor((ms % WEEK) / DAY));

  return (
    <Section tone>
      <SectionHeading
        label="Why it matters now"
        title="From 13 May 2027, the law asks for proof."
        intro="India's Digital Personal Data Protection Act (DPDP) sets how companies collect, use and protect customer data."
      />

      <Reveal className="mt-8 flex flex-wrap items-end gap-x-10 gap-y-6">
        <div>
          <div className="text-[56px] font-bold leading-none tracking-tight text-white">{weeks}</div>
          <div className="mt-1 text-sm text-slate-300">{weeks === 1 ? "week" : "weeks"}</div>
        </div>
        <div>
          <div className="text-[56px] font-bold leading-none tracking-tight text-white">{days}</div>
          <div className="mt-1 text-sm text-slate-300">{days === 1 ? "day" : "days"}</div>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-8 sm:grid-cols-3">
        {CARDS.map((c, i) => (
          <Reveal key={c.label} delay={i * 60}>
            {c.pre && <p className="text-sm text-slate-400">{c.pre}</p>}
            <div className="text-4xl font-bold tracking-tight text-white text-pretty">{c.stat}</div>
            <p className="mt-2 text-[17px] leading-[1.6] text-slate-300">{c.label}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}