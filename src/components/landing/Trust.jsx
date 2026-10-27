import { Link } from "react-router-dom";
import Section from "./Section";
import SectionHeading from "./SectionHeading";
import Accordion from "./Accordion";
import { Reveal } from "./primitives";

const ITEMS = [
  { title: "Data stored in India", desc: "Your data is stored in our India data centre region." },
  { title: "Encryption", desc: "Data is encrypted in transit and at rest." },
  { title: "Activity log", desc: "Every action is recorded and cannot be changed later." },
  { title: "Certification", desc: "ISO 27001 certification and a SOC 2 audit are under way." },
];

export default function Trust() {
  return (
    <Section>
      <SectionHeading label="Security" title="Your data in JShield is protected by the controls below." />
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