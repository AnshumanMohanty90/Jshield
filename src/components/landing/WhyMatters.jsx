import { motion } from "framer-motion";
import { Reveal, AnimatedNumber } from "./primitives";

const CARDS = [
  {
    stat: 250,
    prefix: "₹",
    suffix: " Cr",
    statLabel: "maximum penalty under DPDP",
    title: "Rising regulatory risk",
    desc: "The DPDP Act sets penalties as high as ₹250 crore and raises scrutiny across consent, data principal rights and breach handling.",
  },
  {
    stat: 8,
    suffix: "",
    statLabel: "core DPDP obligations",
    title: "Mandatory privacy operations",
    desc: "Consent, rights requests, significant data fiduciary duties, breach response and grievance redressal are operational duties now, not legal footnotes.",
  },
  {
    stat: 72,
    suffix: "h",
    statLabel: "breach notification window",
    title: "Continuous readiness",
    desc: "Centralised visibility, governance workflows and audit readiness are what keep an enterprise aligned as the rules evolve.",
  },
];

export default function WhyMatters() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600">Why it matters now</span>
          <h2 className="mt-3 text-3xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-4xl text-balance">
            DPDP compliance is now an operational business requirement
          </h2>
          <p className="mt-3 text-lg text-slate-600">
            The Act has changed how Indian organisations manage personal data, and who answers when they do not.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-0">
          {CARDS.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`sm:px-8 ${i > 0 ? "sm:border-l sm:border-slate-200" : ""}`}
            >
              <div className="flex items-end gap-1.5">
                <span className="text-4xl font-bold tracking-tight text-slate-900">
                  <AnimatedNumber value={c.stat} prefix={c.prefix} suffix={c.suffix} />
                </span>
              </div>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-400">{c.statLabel}</p>
              <h3 className="mt-5 text-base font-semibold text-slate-900">{c.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}