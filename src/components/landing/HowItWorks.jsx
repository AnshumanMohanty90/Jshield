import Section from "./Section";
import SectionHeading from "./SectionHeading";
import Stepper from "./Stepper";

const STEPS = [
  {
    title: "Check",
    desc: "See where you stand against the law, with a score in about 4 minutes.",
  },
  {
    title: "Find",
    desc: "Find every place customer data lives, including spreadsheets and old systems.",
  },
  {
    title: "Fix",
    desc: "Switch on consent, customer request and breach workflows.",
  },
  {
    title: "Stay ready",
    desc: "Ongoing checks and audit reports as the rules change.",
  },
];

export default function HowItWorks() {
  return (
    <Section id="how-we-help" tone>
      <SectionHeading label="How it works" title="Four steps to ready." />
      <Stepper steps={STEPS} ariaLabel="How it works" />
    </Section>
  );
}