import React from "react";
import EntityModule from "@/components/dpdp/EntityModule";
import { Building2, ShieldCheck, AlertTriangle, FileSignature } from "lucide-react";

const RISK_LEVELS = ["Low", "Medium", "High", "Critical"];
const STATUSES = ["Active", "Review", "Onboarding", "Offboarded"];

export default function VendorRisk() {
  return (
    <EntityModule
      entityName="Vendor"
      title="Vendor / Third-Party Risk"
      subtitle="Centralized vendor lifecycle management with audits, compliance tracking, risk monitoring, and secure operational oversight."
      icon={Building2}
      extraStats={(items) => [
        { label: "Total Vendors", value: items.length, icon: Building2, tone: "violet" },
        { label: "Active", value: items.filter((i) => i.status === "Active").length, icon: ShieldCheck, tone: "emerald" },
        { label: "High/Critical Risk", value: items.filter((i) => ["High", "Critical"].includes(i.risk_level)).length, icon: AlertTriangle, tone: "rose" },
        { label: "DPA Signed", value: items.filter((i) => i.dpa_signed).length, icon: FileSignature, tone: "sky" },
      ]}
      columns={[
        { key: "name", label: "Vendor", className: "font-medium text-slate-900" },
        { key: "type", label: "Service Type" },
        { key: "data_access", label: "Data Access", className: "max-w-xs truncate" },
        { key: "risk_level", label: "Risk", badge: true },
        { key: "dpa_signed", label: "DPA", type: "boolean" },
        { key: "data_localised", label: "Localised", type: "boolean" },
        { key: "transfer_destination", label: "Transfer To" },
        { key: "contract_expiry", label: "Contract Expiry", type: "date" },
        { key: "status", label: "Status", badge: true },
      ]}
      formFields={[
        { key: "name", label: "Vendor Name", placeholder: "e.g. Salesforce CRM" },
        { key: "type", label: "Service Type", placeholder: "e.g. CRM Platform" },
        { key: "status", label: "Status", type: "select", options: STATUSES, default: "Active" },
        { key: "risk_level", label: "Risk Level", type: "select", options: RISK_LEVELS },
        { key: "risk_score", label: "Risk Score (0-100)", type: "number" },
        { key: "data_access", label: "Data Access Scope", placeholder: "What data they can access" },
        { key: "dpa_signed", label: "DPA Signed", type: "boolean", default: false },
        { key: "data_localised", label: "Data Localised in India", type: "boolean", default: false },
        { key: "transfer_destination", label: "Cross-Border Transfer Destination", placeholder: "e.g. None, EU, US" },
        { key: "contract_expiry", label: "Contract Expiry", type: "date" },
        { key: "last_audit", label: "Last Audit Date", type: "date" },
      ]}
    />
  );
}