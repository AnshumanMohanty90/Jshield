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
  FileSearch,
  Lock,
} from "lucide-react";
import { Reveal } from "./primitives";

const ITEMS = [
  { icon: LayoutDashboard, title: "Command Center", desc: "A live compliance score and cross-module activity feed in a single view." },
  { icon: Database, title: "Data Discovery", desc: "Map personal data across systems with automated classification and risk scoring." },
  { icon: ShieldCheck, title: "Consent Management", desc: "Purpose-based consents with tamper-proof records, artifacts and one-click withdrawal." },
  { icon: Cookie, title: "Cookie Manager", desc: "Scan, categorise and control every cookie across your digital properties." },
  { icon: Building2, title: "Vendor Risk", desc: "Track data processing agreements, audit cycles and risk scores for every processor." },
  { icon: AlertTriangle, title: "Breach Response", desc: "Detect, investigate and notify the Data Protection Board within the 72-hour window." },
  { icon: FileText, title: "ROPA", desc: "Maintain records of processing with legal basis and retention built in." },
  { icon: MessageSquareWarning, title: "Grievances", desc: "Resolve data principal grievances with SLA-aware routing and escalation." },
  { icon: UserCog, title: "Data Principal Rights", desc: "Fulfil access, correction, erasure and portability requests on deadline." },
  { icon: FileSearch, title: "DPIA", desc: "Run Data Protection Impact Assessments for high-risk and SDF processing with residual risk tracking." },
  { icon: Lock, title: "Security Safeguards", desc: "Track all seven Rule 6 controls — encryption, access, masking, monitoring, logs, response and DPAs." },
];

export default function Features() {
  return (
    <section id="features" className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600">Platform</span>
          <h2 className="mt-3 text-3xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-4xl text-balance">One platform. Eleven workflows.</h2>
          <p className="mt-3 text-lg text-slate-600">
            Stop stitching spreadsheets together. Jaguard covers the full DPDP lifecycle across connected modules.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((it, i) => {
            const Icon = it.icon;
            return (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.05 }}
                className="group border-t border-slate-200 pt-5 transition-colors hover:border-indigo-400"
              >
                <div className="flex items-center justify-between">
                  <Icon className="h-5 w-5 text-indigo-600" />
                  <span className="text-xs text-slate-400">{String(i + 1).padStart(2, "0")}</span>
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