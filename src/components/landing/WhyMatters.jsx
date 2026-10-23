import { motion } from "framer-motion";
import { Reveal } from "./primitives";

const CARDS = [
  { pre: "Up to", stat: "Rs 250 crore", label: "fine for a single breach" },
  { pre: "", stat: "7", label: "duties every company must run" },
  { pre: "", stat: "72 hours", label: "to report a breach" },
];

export default function WhyMatters() {
  return (
    <section className="bg-slate-950 py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">Why it matters now</span>
          <h2 className="mt-3 text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl text-pretty">
            From 13 May 2027, the law asks for proof.
          </h2>
          <p className="mt-3 text-lg text-slate-400 text-pretty">
            India's Digital Personal Data Protection Act (DPDP) sets how companies collect, use and protect customer
            data.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-8 sm:grid-cols-3 sm:gap-0">
          {CARDS.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`sm:px-8 ${i > 0 ? "sm:border-l sm:border-white/10" : ""}`}
            >
              {c.pre && <p className="text-sm font-medium text-slate-400">{c.pre}</p>}
              <div className="text-4xl font-bold tracking-tight text-white text-pretty">{c.stat}</div>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{c.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}