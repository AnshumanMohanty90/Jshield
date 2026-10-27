import Section from "./Section";
import SectionHeading from "./SectionHeading";
import Stepper from "./Stepper";

const STEPS = [
  {
    title: "Check",
    desc: "Score your company against the law in about 4 minutes.",
  },
  {
    title: "Find",
    desc: "Find every place customer data sits, including spreadsheets and old systems.",
  },
  {
    title: "Fix",
    desc: "Switch on consent, customer request and breach workflows.",
  },
  {
    title: "Stay ready",
    desc: "Run regular checks and audit reports as the rules change.",
  },
];

export default function HowItWorks() {
  return (
    <Section id="how-we-help" tone>
      <SectionHeading label="How it works" title="Four steps take you from a first check to staying ready." />
      <Stepper steps={STEPS} ariaLabel="How it works" />
    </Section>
  );
}