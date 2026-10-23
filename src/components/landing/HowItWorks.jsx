import { Reveal } from "./primitives";

const STEPS = [
  {
    title: "Check",
    desc: "See where you stand against the law, with a score in 3 minutes.",
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
    <section id="how-we-help" className="bg-slate-950 py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">How it works</span>
          <h2 className="mt-3 text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl text-balance">
            Four steps to ready.
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06} className="border-t border-white/10 pt-5">
              <h3 className="text-base font-semibold text-white">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}