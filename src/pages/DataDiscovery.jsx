import React from "react";
import EntityModule from "@/components/dpdp/EntityModule";
import { Database, ShieldAlert, Map, CheckCircle2 } from "lucide-react";

const CATEGORIES = ["Identity", "Financial", "Behavioural", "Health", "Contact", "Biometric", "Usage Data", "Employment"];
const RISK_LEVELS = ["Low", "Medium", "High", "Critical"];
const STATUSES = ["Scanning", "Mapped", "Classified", "Review"];

export default function DataDiscovery() {
  return (
    <EntityModule
      entityName="DataAsset"
      title="Data Discovery"
      subtitle="Automated scanning and AI classification of personal data across every system in your stack. You can't protect what you can't see."
      icon={Database}
      extraStats={(items) => [
        { label: "Total Assets", value: items.length, icon: Database, tone: "sky" },
        { label: "Classified", value: items.filter((i) => i.status === "Classified").length, icon: CheckCircle2, tone: "emerald" },
        { label: "High/Critical Risk", value: items.filter((i) => ["High", "Critical"].includes(i.risk_level)).length, icon: ShieldAlert, tone: "rose" },
        { label: "Still Scanning", value: items.filter((i) => i.status === "Scanning").length, icon: Map, tone: "amber" },
      ]}
      columns={[
        { key: "name", label: "Asset", className: "font-medium text-slate-900" },
        { key: "system", label: "System" },
        { key: "data_category", label: "Category" },
        { key: "pii_types", label: "PII Types", className: "max-w-xs truncate" },
        { key: "risk_level", label: "Risk", badge: true },
        { key: "owner", label: "Owner" },
        { key: "status", label: "Status", badge: true },
        { key: "last_scan", label: "Last Scan", type: "date" },
      ]}
      formFields={[
        { key: "name", label: "Asset Name", placeholder: "e.g. Customer Onboarding DB" },
        { key: "system", label: "System / Source", placeholder: "e.g. CRM Database" },
        { key: "data_category", label: "Data Category", type: "select", options: CATEGORIES },
        { key: "pii_types", label: "PII Types", placeholder: "e.g. Name, Email, PAN" },
        { key: "risk_level", label: "Risk Level", type: "select", options: RISK_LEVELS },
        { key: "risk_score", label: "Risk Score (0-100)", type: "number" },
        { key: "owner", label: "Data Owner", placeholder: "e.g. Data Engineering" },
        { key: "status", label: "Status", type: "select", options: STATUSES, default: "Mapped" },
        { key: "location", label: "Storage Location", placeholder: "e.g. AWS Mumbai" },
        { key: "last_scan", label: "Last Scanned", type: "date" },
      ]}
    />
  );
}