import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
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
  const [open, setOpen] = useState(0);

  return (
    <section id="how-we-help" className="bg-slate-950 py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">How we help</span>
          <h2 className="mt-3 text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl text-balance">
            From assessment to continuous governance
          </h2>
          <p className="mt-3 text-lg text-slate-400">
            A guided path through the full DPDP compliance journey. Select a stage to see what happens inside it.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="how-card">
            <div className="how-rail">
              {STEPS.map((s, i) => {
                const isOpen = open === i;
                return (
                  <button
                    key={s.title}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`how-panel-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className={`how-step ${isOpen ? "is-open" : ""}`}
                  >
                    <span className="how-marker">{i + 1}</span>
                    <span className="how-stephead">
                      <span className="how-steptitle">{s.title}</span>
                      <ChevronDown className={`how-chevron ${isOpen ? "is-open" : ""}`} />
                    </span>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.span
                          id={`how-panel-${i}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="how-panel"
                        >
                          <span className="how-desc">{s.desc}</span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}