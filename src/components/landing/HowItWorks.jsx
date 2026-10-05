import { useState } from "react";
import { motion } from "framer-motion";
import { ClipboardList, Search, Wrench, Compass } from "lucide-react";
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
  const [active, setActive] = useState(0);
  const step = STEPS[active];
  const Icon = step.icon;

  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600">How we help</span>
          <h2 className="mt-3 text-3xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-4xl text-balance">
            From assessment to continuous governance
          </h2>
          <p className="mt-3 text-lg text-slate-600">A guided path through the full DPDP compliance journey.</p>
        </Reveal>

        <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="divide-y divide-slate-200">
            {STEPS.map((s, i) => {
              const SIcon = s.icon;
              const on = i === active;
              return (
                <button
                  key={s.title}
                  onClick={() => setActive(i)}
                  className="flex w-full items-start gap-4 py-5 text-left"
                >
                  <span
                    className={`flex h-11 w-11 flex-none items-center justify-center rounded-xl transition ${
                      on ? "bg-gradient-to-br from-indigo-500 to-sky-500 text-white" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <SIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600">Step {i + 1}</span>
                    <h3 className={`mt-0.5 text-base font-semibold ${on ? "text-slate-900" : "text-slate-700"}`}>
                      {s.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">
                      {on ? s.desc : "Tap to see how Jaguard runs this stage."}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col justify-center rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-sky-500 p-8 text-white shadow-xl shadow-indigo-200"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
              <Icon className="h-7 w-7" />
            </div>
            <h3 className="mt-5 text-2xl font-semibold">{step.title}</h3>
            <p className="mt-3 leading-relaxed text-indigo-100">{step.desc}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}