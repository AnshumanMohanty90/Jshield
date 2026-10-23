import { Link } from "react-router-dom";
import Section from "./Section";
import SectionHeading from "./SectionHeading";
import Accordion from "./Accordion";
import { Reveal } from "./primitives";

const ITEMS = [
  { title: "Stored in India", desc: "Your data is stored in India." },
  { title: "Encrypted", desc: "Encrypted in transit and at rest." },
  { title: "Logged", desc: "Every action is recorded and cannot be changed later." },
  { title: "Certification", desc: "ISO 27001 and SOC 2 certification under way." },
];

export default function Trust() {
  return (
    <Section tone>
      <SectionHeading label="Trust" title="We hold your data to the same rules we help you meet." />
      <Accordion items={ITEMS} />
      <Reveal delay={0.1} className="mt-6">
        <Link
          to="/security"
          className="inline-flex min-h-[44px] items-center text-sm text-slate-200 underline-offset-4 hover:text-white hover:underline"
        >
          Read about security
        </Link>
      </Reveal>
    </Section>
  );
}