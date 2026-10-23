import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Reveal } from "./primitives";

const INDUSTRIES = [
  {
    key: "bfsi",
    label: "Banks and lenders",
    headline: "Protect financial and customer data",
    line: "Lenders use JShield to take consent at loan sign-up and prove it later.",
    points: [
      "Consent for every loan and card product",
      "Customer data kept only as long as RBI rules allow",
      "Audit reports ready to send",
    ],
  },
  {
    key: "saas",
    label: "Software companies",
    headline: "Scale privacy across cloud apps",
    line: "Software companies use JShield to show clients where their data sits and who can see it.",
    points: [
      "Clear rules on who can see customer data",
      "Automated privacy work",
      "Customer requests handled at scale",
      "Data mapped across every customer and tenant",
    ],
  },
  {
    key: "health",
    label: "Healthcare",
    headline: "Protect sensitive health data",
    line: "Hospitals and clinics use JShield to record patient consent and control who opens records.",
    points: [
      "Patient consent on record",
      "Controlled access to health records",
      "Keep only the data you need, only as long as you need it",
      "Risk review for clinical processing",
    ],
  },
  {
    key: "retail",
    label: "Retail and e-commerce",
    headline: "Track consent across commerce",
    line: "Retailers use JShield to manage marketing consent and cookie choices across web and app.",
    points: [
      "Marketing consent tracked",
      "Clear rules for sharing data with third parties",
      "Cookie and pixel control",
      "Customer requests answered on deadline",
    ],
  },
  {
    key: "edtech",
    label: "Education",
    headline: "Protect student and school data",
    line: "Schools and colleges use JShield to take parent consent for student data.",
    points: [
      "Parent consent workflows",
      "Controlled retention practices",
      "One place for every privacy task",
      "Vendor contracts on file",
    ],
  },
];

export default function Industries() {
  const [active, setActive] = useState("bfsi");
  const ind = INDUSTRIES.find((i) => i.key === active);

  return (
    <section className="bg-slate-900/50 py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">Built for your sector</span>
          <h2 className="mt-3 text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl text-pretty">
            Built for how your sector handles customer data.
          </h2>
          <p className="mt-3 text-lg text-slate-400 text-pretty">
            Each sector collects and keeps customer data in its own way. JShield comes set up for yours, so you are
            audit-ready in{" "}
            <strong className="whitespace-nowrap font-semibold text-white">30 days</strong>.
          </p>
        </Reveal>

        <div className="mt-8 flex flex-wrap gap-2">
          {INDUSTRIES.map((i) => (
            <button
              key={i.key}
              onClick={() => setActive(i.key)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                active === i.key
                  ? "bg-white text-slate-900"
                  : "bg-white/5 text-slate-300 ring-1 ring-white/10 hover:bg-white/10"
              }`}
            >
              {i.label}
            </button>
          ))}
        </div>

        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-10"
        >
          <div>
            <h3 className="text-xl font-semibold text-white">{ind.headline}</h3>
            <p className="mt-2 text-sm text-slate-400">{ind.line}</p>
          </div>
          <div className="grid gap-0 sm:grid-cols-2">
            {ind.points.map((p) => (
              <div key={p} className="flex items-start gap-2.5 border-t border-white/10 py-3.5">
                <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                  <Check className="h-3 w-3" />
                </span>
                <span className="text-sm text-slate-300">{p}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}