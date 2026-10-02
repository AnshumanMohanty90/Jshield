import { Reveal } from "./primitives";
import { Network, Workflow, FileCheck } from "lucide-react";

const STEPS = [
  { icon: Network, title: "Connect your data", desc: "Map systems and data flows. PrivGuard classifies personal data and scores risk automatically." },
  { icon: Workflow, title: "Automate workflows", desc: "Consent, ROPA, vendor risk and grievance SLAs run on connected pipelines — not spreadsheets." },
  { icon: FileCheck, title: "Stay audit-ready", desc: "Every action is logged with artifacts. Generate regulator-ready exports in a click." },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            From scattered to operational in three steps
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} delay={i * 0.1} className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-sky-500 text-white shadow-lg shadow-indigo-200">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="mt-4 text-xs font-semibold uppercase tracking-widest text-indigo-600">Step {i + 1}</div>
                <h3 className="mt-1 text-lg font-semibold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.desc}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}