import { ArrowRight } from "lucide-react";
import { Reveal } from "./primitives";

export default function BetterWithJago() {
  return (
    <section className="bg-slate-950 py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="rounded-3xl border border-white/10 bg-slate-900/60 px-6 py-10 shadow-2xl shadow-black/40 sm:px-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">Better with Jago</span>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl text-pretty">
            Compliance built in from the start.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-slate-400 text-pretty">
            When your teams use Jago to ask questions or update records, consent and access rules already apply, so
            there is no separate compliance project.
          </p>
          <a
            href="https://jagotech.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-7 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            See Jago AI <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}