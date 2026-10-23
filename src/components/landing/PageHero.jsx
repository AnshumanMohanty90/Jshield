import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function PageHero({ eyebrow, title, subtitle, primary, secondary }) {
  return (
    <section className="bg-slate-950 pb-12 pt-32 sm:pb-20 sm:pt-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {eyebrow && (
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
            {eyebrow}
          </span>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-3 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl text-pretty"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-400"
        >
          {subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.14 }}
          className="mt-7 flex flex-col gap-3 sm:flex-row"
        >
          {primary &&
            (primary.to.startsWith("#") ? (
              <a
                href={primary.to}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:shadow-indigo-500/50"
              >
                {primary.label}
              </a>
            ) : (
              <Link
                to={primary.to}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:shadow-indigo-500/50"
              >
                {primary.label}
              </Link>
            ))}
          {secondary && (
            <Link
              to={secondary.to}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              {secondary.label}
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  );
}