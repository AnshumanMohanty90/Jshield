import { Reveal } from "./primitives";

const STEPS = [
  {
    title: "Assess",
    desc: (
      <>
        We evaluate your current DPDP readiness through{" "}
        <strong className="whitespace-nowrap font-semibold text-slate-200">gap assessments</strong>, privacy control
        reviews, regulatory mapping and risk prioritisation.
      </>
    ),
  },
  {
    title: "Discover",
    desc: (
      <>
        Discover and classify personal data, map data flows, build a centralised inventory and surface{" "}
        <strong className="whitespace-nowrap font-semibold text-slate-200">shadow data</strong> across systems.
      </>
    ),
  },
  {
    title: "Implement",
    desc: (
      <>
        Stand up{" "}
        <strong className="font-semibold text-slate-200">consent and notice management</strong>, DSAR workflows,
        governance controls and policy frameworks aligned to DPDP obligations.
      </>
    ),
  },
  {
    title: "Govern",
    desc: (
      <>
        Continuous monitoring, audit reporting,{" "}
        <strong className="whitespace-nowrap font-semibold text-slate-200">breach readiness</strong> and governance
        oversight keep you compliant as obligations evolve.
      </>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="how-we-help" className="bg-slate-950 py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">How we help</span>
          <h2 className="mt-3 text-4xl font-bold leading-[1.05] tracking-tight text-white text-pretty sm:text-5xl">
            From first data scan to audit-ready in{" "}
            <span className="whitespace-nowrap bg-gradient-to-r from-indigo-400 to-sky-300 bg-clip-text italic text-transparent">
              30 days
            </span>
            .
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-slate-400">
            From assessment to continuous governance: a guided path through the full DPDP compliance journey, with
            every stage visible at a glance.
          </p>
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