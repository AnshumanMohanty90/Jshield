import { Reveal } from "./primitives";

const STEPS = [
  {
    title: "Assess",
    desc: "We evaluate your current DPDP readiness through gap assessments, privacy control reviews, regulatory mapping and risk prioritisation.",
  },
  {
    title: "Discover",
    desc: "Discover and classify personal data, map data flows, build a centralised inventory and surface shadow data across systems.",
  },
  {
    title: "Implement",
    desc: "Stand up consent and notice management, DSAR workflows, governance controls and policy frameworks aligned to DPDP obligations.",
  },
  {
    title: "Govern",
    desc: "Continuous monitoring, audit reporting, breach readiness and governance oversight keep you compliant as obligations evolve.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-we-help" className="bg-slate-950 py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">How we help</span>
          <h2 className="mt-3 text-3xl font-bold leading-[1.1] tracking-tight text-white text-pretty sm:text-4xl lg:whitespace-nowrap">
            From assessment to continuous governance
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-slate-400">
            A guided path through the full DPDP compliance journey, with every stage visible at a glance.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="how-card">
            <div className="how-rail">
              {STEPS.map((s, i) => (
                <div key={s.title} className="how-step">
                  <span className="how-marker">{i + 1}</span>
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