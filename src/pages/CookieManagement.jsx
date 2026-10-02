import React from "react";
import EntityModule from "@/components/dpdp/EntityModule";
import { Cookie, CheckCircle2, ShieldX, Eye } from "lucide-react";

const CATEGORIES = ["Strictly Necessary", "Functional", "Analytics", "Marketing", "Third-Party"];
const STATUSES = ["Active", "Blocked", "Review"];

export default function CookieManagement() {
  return (
    <EntityModule
      entityName="Cookie"
      title="Cookie Manager"
      subtitle="Auto-scan, categorize and deploy consent banners. Block scripts pre-consent and keep full audit logs always on."
      icon={Cookie}
      extraStats={(items) => [
        { label: "Total Cookies", value: items.length, icon: Cookie, tone: "amber" },
        { label: "Active", value: items.filter((i) => i.status === "Active").length, icon: CheckCircle2, tone: "emerald" },
        { label: "Blocked", value: items.filter((i) => i.status === "Blocked").length, icon: ShieldX, tone: "rose" },
        { label: "Needs Review", value: items.filter((i) => i.status === "Review").length, icon: Eye, tone: "sky" },
      ]}
      columns={[
        { key: "name", label: "Cookie", className: "font-mono text-xs text-slate-900" },
        { key: "category", label: "Category" },
        { key: "purpose", label: "Purpose", className: "max-w-xs truncate" },
        { key: "provider", label: "Provider" },
        { key: "consent_required", label: "Consent", type: "boolean" },
        { key: "retention", label: "Retention" },
        { key: "status", label: "Status", badge: true },
      ]}
      formFields={[
        { key: "name", label: "Cookie Name", placeholder: "e.g. _ga" },
        { key: "category", label: "Category", type: "select", options: CATEGORIES },
        { key: "purpose", label: "Purpose", placeholder: "What this cookie does" },
        { key: "provider", label: "Provider / Domain", placeholder: "e.g. google.com" },
        { key: "consent_required", label: "Consent Required", type: "boolean", default: true },
        { key: "retention", label: "Retention Duration", placeholder: "e.g. 2 years" },
        { key: "status", label: "Status", type: "select", options: STATUSES, default: "Active" },
      ]}
    />
  );
}