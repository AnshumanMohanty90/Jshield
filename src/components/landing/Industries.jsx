import { useState } from "react";
import { motion } from "framer-motion";
import { Landmark, Cloud, HeartPulse, ShoppingCart, GraduationCap, Check } from "lucide-react";
import { Reveal } from "./primitives";

const INDUSTRIES = [
  {
    key: "bfsi",
    icon: Landmark,
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
    icon: Cloud,
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
    icon: HeartPulse,
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
    icon: ShoppingCart,
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
    icon: GraduationCap,
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
  const Icon = ind.icon;

  return (
    <section className="bg-slate-50 py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600">By industry</span>
          <h2 className="mt-3 text-3xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-4xl text-balance">
            DPDP controls, tailored to how you process data
          </h2>
          <p className="mt-3 text-lg text-slate-600">
            Different industries process personal data differently, and need different privacy controls.
          </p>
        </Reveal>

        <div className="mt-8 flex flex-wrap gap-2">
          {INDUSTRIES.map((i) => {
            const IIcon = i.icon;
            return (
              <button
                key={i.key}
                onClick={() => setActive(i.key)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                  active === i.key ? "bg-slate-900 text-white" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100"
                }`}
              >
                <IIcon className="h-4 w-4" /> {i.label}
              </button>
            );
          })}
        </div>

        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-10"
        >
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-sky-500 text-white">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-slate-900">{ind.headline}</h3>
            <p className="mt-2 text-sm text-slate-600">
              {ind.label} teams use Jaguard to operationalise DPDP without slowing the business.
            </p>
          </div>
          <div className="grid gap-0 sm:grid-cols-2">
            {ind.points.map((p) => (
              <div key={p} className="flex items-start gap-2.5 border-t border-slate-200 py-3.5">
                <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Check className="h-3 w-3" />
                </span>
                <span className="text-sm text-slate-700">{p}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}