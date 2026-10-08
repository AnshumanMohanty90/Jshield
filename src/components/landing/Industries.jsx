import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Reveal } from "./primitives";

const INDUSTRIES = [
  {
    key: "bfsi",
    label: "BFSI & NBFC",
    headline: "Protect financial and customer data",
    points: [
      "Consent governance for financial products",
      "Audit-ready compliance workflows",
      "Breach response and regulatory reporting",
      "RBI-aligned data retention controls",
    ],
  },
  {
    key: "saas",
    label: "SaaS & Technology",
    headline: "Scale privacy across cloud-native apps",
    points: [
      "User data governance and minimisation",
      "Automated privacy operations",
      "Scalable DSAR workflows",
      "Multi-tenant data mapping",
    ],
  },
  {
    key: "health",
    label: "Healthcare & Pharma",
    headline: "Govern sensitive health data",
    points: [
      "Patient consent management",
      "Controlled access to health records",
      "Data minimisation and retention",
      "DPIA for clinical processing",
    ],
  },
  {
    key: "retail",
    label: "E-Commerce & Retail",
    headline: "Track consent across commerce",
    points: [
      "Marketing consent tracking",
      "Third-party data sharing governance",
      "Cookie and pixel management",
      "Customer rights on demand",
    ],
  },
  {
    key: "edtech",
    label: "EdTech & Education",
    headline: "Protect student and institutional data",
    points: [
      "Parental consent workflows",
      "Controlled retention practices",
      "Centralised privacy management",
      "Vendor and platform DPAs",
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
            DPDP controls, <em className="text-indigo-300">tailored</em> to how you process data
          </h2>
          <p className="mt-3 text-lg text-slate-400">
            Different industries process personal data differently, and need different privacy controls. Whatever your
            sector, Jaguard's guided sequence takes you from first data scan to an audit-ready posture in{" "}
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
            <p className="mt-2 text-sm text-slate-400">
              {ind.label} teams use Jaguard to operationalise DPDP without slowing the business.
            </p>
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