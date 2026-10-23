import { Link } from "react-router-dom";
import { Reveal } from "./primitives";

export default function CtaBand({ title, subtitle, primary, secondary }) {
  return (
    <section className="bg-slate-950 py-10 sm:py-16">
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl text-pretty">
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-slate-400">{subtitle}</p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            {primary.to.startsWith("#") ? (
              <a
                href={primary.to}
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:shadow-indigo-500/50"
              >
                {primary.label}
              </a>
            ) : (
              <Link
                to={primary.to}
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:shadow-indigo-500/50"
              >
                {primary.label}
              </Link>
            )}
            {secondary && (
              <Link
                to={secondary.to}
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {secondary.label}
              </Link>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}