import { ClipboardList, Search, Wrench, Compass, ArrowDown } from "lucide-react";
import { Reveal } from "./primitives";

const STEPS = [
  {
    icon: ClipboardList,
    title: "Assess",
    desc: "We evaluate your current DPDP readiness through gap assessments, privacy control reviews, regulatory mapping and risk prioritisation.",
  },
  {
    icon: Search,
    title: "Discover",
    desc: "Discover and classify personal data, map data flows, build a centralised inventory and surface shadow data across systems.",
  },
  {
    icon: Wrench,
    title: "Implement",
    desc: "Stand up consent and notice management, DSAR workflows, governance controls and policy frameworks aligned to DPDP obligations.",
  },
  {
    icon: Compass,
    title: "Govern",
    desc: "Continuous monitoring, audit reporting, breach readiness and governance oversight keep you compliant as obligations evolve.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-we-help" className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600">How we help</span>
          <h2 className="mt-3 text-3xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-4xl text-balance">
            From assessment to continuous governance
          </h2>
          <p className="mt-3 text-lg text-slate-600">A guided path through the full DPDP compliance journey.</p>
        </Reveal>

        <div className="mx-auto mt-10 max-w-3xl">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.title}>
                <div className="flex items-start gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-sky-500 text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600">Step {i + 1}</span>
                    <h3 className="mt-0.5 text-base font-semibold text-slate-900">{s.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{s.desc}</p>
                  </div>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="flex justify-center py-1.5">
                    <ArrowDown className="h-5 w-5 text-indigo-400" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}