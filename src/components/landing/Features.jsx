import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Database,
  ShieldCheck,
  Cookie,
  Building2,
  AlertTriangle,
  FileText,
  MessageSquareWarning,
  UserCog,
} from "lucide-react";
import { Reveal } from "./primitives";

const ITEMS = [
  { icon: LayoutDashboard, title: "Command Center", desc: "A live compliance score and cross-module activity feed in one glance." },
  { icon: Database, title: "Data Discovery", desc: "Map personal data across systems with automated PII classification and risk scoring." },
  { icon: ShieldCheck, title: "Consent Management", desc: "Purpose-based consents with tamper-proof records, artifacts and one-click withdrawal." },
  { icon: Cookie, title: "Cookie Manager", desc: "Scan, categorize and control every cookie across your digital properties." },
  { icon: Building2, title: "Vendor Risk", desc: "Track DPAs, audit cycles and risk scores for every third-party processor." },
  { icon: AlertTriangle, title: "Breach Response", desc: "Detect, investigate and notify the DPB within the 72-hour statutory window." },
  { icon: FileText, title: "ROPA", desc: "Maintain Records of Processing Activities with legal basis and retention built in." },
  { icon: MessageSquareWarning, title: "Grievances", desc: "Resolve data principal grievances with SLA-aware routing and escalation." },
  { icon: UserCog, title: "Data Principal Rights", desc: "Fulfil access, correction, erasure and portability requests on deadline." },
];

export default function Features() {
  return (
    <section id="features" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            One platform. Nine workflows.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Stop stitching together spreadsheets. PrivGuard covers the full DPDP lifecycle in connected modules.
          </p>
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((it, i) => {
            const Icon = it.icon;
            return (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-sky-50 text-indigo-600 ring-1 ring-indigo-100">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-slate-900">{it.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{it.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}