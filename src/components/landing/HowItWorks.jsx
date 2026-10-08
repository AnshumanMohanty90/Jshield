import { ClipboardCheck, Radar, ShieldCheck, TrendingUp } from "lucide-react";
import { Reveal } from "./primitives";

const STEPS = [
  {
    title: "Assess",
    icon: ClipboardCheck,
    desc: <>We evaluate your current DPDP readiness through <strong className="font-semibold text-slate-200">gap assessments</strong>, privacy control reviews, regulatory mapping and risk prioritisation.</>,
  },
  {
    title: "Discover",
    icon: Radar,
    desc: <>Discover and classify personal data, map data flows, build a centralised inventory and surface <strong className="font-semibold text-slate-200">shadow data</strong> across systems.</>,
  },
  {
    title: "Implement",
    icon: ShieldCheck,
    desc: <>Stand up <strong className="font-semibold text-slate-200">consent and notice management</strong>, DSAR workflows, governance controls and policy frameworks aligned to DPDP obligations.</>,
  },
  {
    title: "Govern",
    icon: TrendingUp,
    desc: <>Continuous monitoring, audit reporting, <strong className="font-semibold text-slate-200">breach readiness</strong> and governance oversight keep you compliant as obligations evolve.</>,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-we-help" className="bg-slate-950 py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">How we help</span>
          <h2 className="mt-3 text-3xl font-bold leading-[1.1] tracking-tight text-white text-pretty sm:text-4xl lg:whitespace-nowrap">
            From assessment to <span className="italic text-indigo-300">continuous governance</span>
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-slate-400">
            A guided path through the full DPDP compliance journey, with every stage visible at a glance.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="how-card">
            <div className="how-rail">
              {STEPS.map((s) => (
                <div key={s.title} className="how-step">
                  <span className="how-marker"><s.icon className="h-5 w-5" /></span>
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