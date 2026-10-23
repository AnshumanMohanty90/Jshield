import Section from "./Section";
import SectionHeading from "./SectionHeading";
import { Reveal } from "./primitives";

export default function BetterWithJago() {
  return (
    <Section>
      <SectionHeading
        label="Better with Jago"
        title="Compliance built in from the start."
        intro="When your teams use Jago to ask questions or update records, consent and access rules already apply, so there is no separate compliance project."
      />
      <Reveal delay={0.1} className="mt-8">
        <a
          href="https://jagotech.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          See Jago AI
        </a>
      </Reveal>
    </Section>
  );
}