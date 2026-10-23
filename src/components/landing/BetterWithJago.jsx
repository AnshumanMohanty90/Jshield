import { Reveal } from "./primitives";

export default function BetterWithJago() {
  return (
    <section className="bg-slate-950 py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">Better with Jago</span>
          <h2 className="mt-3 text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl text-balance">
            Compliance built in from the start.
          </h2>
          <p className="mt-3 text-lg text-slate-400 text-pretty">
            When your teams use Jago to ask questions or update records, consent and access rules already apply, so
            there is no separate compliance project.
          </p>
          <a
            href="https://jagotech.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            See Jago AI
          </a>
        </Reveal>
      </div>
    </section>
  );
}