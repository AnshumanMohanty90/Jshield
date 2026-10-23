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
    <section id="how-we-help" className="bg-slate-950 py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">How it works</span>
          <h2 className="mt-3 text-4xl font-bold leading-[1.05] tracking-tight text-white text-pretty sm:text-5xl">
            Four steps to ready.
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="how-card">
            <div className="how-rail">
              {STEPS.map((s) => (
                <div key={s.title} className="how-step">
                  <span className="how-marker" aria-hidden="true" />
                  <span className="how-steptitle">{s.title}</span>
                  <p className="how-desc">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}