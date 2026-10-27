import Section from "./Section";
import SectionHeading from "./SectionHeading";
import { Reveal } from "./primitives";

export default function BetterWithJago() {
  return (
    <Section tone>
      <SectionHeading
        label="Better with Jago"
        title="If your teams use Jago AI, the same rules apply inside it."
        intro="When people use Jago to ask questions or update records, consent and access rules already apply."
      />
      <Reveal delay={0.1} className="mt-6">
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