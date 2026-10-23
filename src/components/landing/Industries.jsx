import { useState } from "react";
import { motion } from "framer-motion";
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
    <section className="bg-slate-900/50 py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">Built for your sector</span>
          <h2 className="mt-3 font-bold leading-[1.1] tracking-tight text-white text-balance">
            Set up for your sector.
          </h2>
          <p className="mt-3 max-w-[68ch] text-[17px] leading-[1.6] text-slate-400 text-pretty">
            JShield comes ready with the consent forms, retention rules and reports your sector needs.
          </p>
        </Reveal>

        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 border-b border-white/10">
          {INDUSTRIES.map((i) => (
            <button
              key={i.key}
              onClick={() => setActive(i.key)}
              className={`-mb-px border-b-2 pb-3 text-sm font-medium transition ${
                active === i.key
                  ? "border-white text-white"
                  : "border-transparent text-slate-400 hover:text-slate-200"
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
            <h3 className="font-semibold text-white">{ind.headline}</h3>
            <p className="mt-2 text-sm text-slate-400">{ind.line}</p>
          </div>
          <ul className="sm:grid sm:grid-cols-2 sm:gap-x-8">
            {ind.points.map((p) => (
              <li key={p} className="border-t border-white/10 py-3.5 text-sm text-slate-300">
                {p}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}