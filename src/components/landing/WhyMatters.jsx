import { motion } from "framer-motion";
import { ShieldAlert, ClipboardCheck, Gauge } from "lucide-react";
import { Reveal, AnimatedNumber } from "./primitives";

const CARDS = [
  {
    icon: ShieldAlert,
    title: "Rising regulatory risk",
    stat: 250,
    prefix: "₹",
    suffix: " Cr",
    statLabel: "maximum penalty under DPDP",
    desc: "The DPDP Act introduces penalties up to ₹250 crore alongside mounting scrutiny on consent, data principal rights and breach handling.",
  },
  {
    icon: ClipboardCheck,
    title: "Mandatory privacy operations",
    stat: 8,
    suffix: "",
    statLabel: "core DPDP obligations",
    desc: "Consent, rights requests, SDF duties, breach response and grievance redressal are now operational requirements — not legal footnotes.",
  },
  {
    icon: Gauge,
    title: "Continuous compliance readiness",
    stat: 72,
    suffix: "h",
    statLabel: "breach notification window",
    desc: "Enterprises need centralized visibility, governance workflows and audit readiness to keep pace with evolving DPDP obligations.",
  },
];

export default function WhyMatters() {
  return (
    <section className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600">Why it matters now</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            DPDP compliance is now an operational business requirement
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            The Act has transformed how Indian organizations manage personal data — and who is accountable when they don't.
          </p>
        </Reveal>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {CARDS.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-rose-600 ring-1 ring-rose-100">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="mt-5 flex items-end gap-1.5">
                  <span className="text-4xl font-bold tracking-tight text-slate-900">
                    <AnimatedNumber value={c.stat} prefix={c.prefix} suffix={c.suffix} />
                  </span>
                </div>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-400">{c.statLabel}</p>
                <h3 className="mt-4 text-base font-semibold text-slate-900">{c.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{c.desc}</p>
                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-indigo-100 opacity-0 blur-2xl transition group-hover:opacity-100" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}