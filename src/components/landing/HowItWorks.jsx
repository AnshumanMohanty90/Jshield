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
    <section id="how-we-help" className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="how-card" tabIndex={0} aria-label="How we help: from assessment to continuous governance">
            <header className="how-head">
              <div className="how-intro">
                <div className="how-eyebrow">How we help</div>
                <h2 className="how-title">From assessment to continuous governance</h2>
                <p className="how-lede">A guided path through the full DPDP compliance journey.</p>
              </div>
              <div className="how-deadline">
                <span className="how-datecopy">Deadline</span>
                <strong className="how-date">13 May 2027</strong>
              </div>
            </header>
            <div className="how-rail">
              {STEPS.map((s, i) => (
                <article className="how-step" key={s.title}>
                  <span className="how-marker">{i + 1}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}