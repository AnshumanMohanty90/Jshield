import React from "react";
import EntityModule from "@/components/dpdp/EntityModule";
import { FileText, CheckCircle2, Clock, Archive } from "lucide-react";

const CATEGORIES = ["Identity", "Financial", "Behavioural", "Health", "Contact", "Biometric", "Usage Data", "Employment"];
const LEGAL_BASIS = ["Consent", "Legitimate Use", "Legal Obligation", "Vital Interest"];
const STATUSES = ["Active", "Review", "Draft", "Archived"];

export default function ROPA() {
  return (
    <EntityModule
      entityName="ROPAEntry"
      title="Records of Processing Activities (ROPA)"
      subtitle="Auto-generate and maintain ROPA documentation as required under the DPDP Act. Track processing activities, data categories, and retention periods."
      icon={FileText}
      extraStats={(items) => [
        { label: "Total Activities", value: items.length, icon: FileText, tone: "emerald" },
        { label: "Active", value: items.filter((i) => i.status === "Active").length, icon: CheckCircle2, tone: "emerald" },
        { label: "Under Review", value: items.filter((i) => i.status === "Review").length, icon: Clock, tone: "amber" },
        { label: "Drafts", value: items.filter((i) => i.status === "Draft").length, icon: Archive, tone: "slate" },
      ]}
      columns={[
        { key: "activity_name", label: "Activity", className: "font-medium text-slate-900" },
        { key: "purpose", label: "Purpose", className: "max-w-xs truncate" },
        { key: "data_category", label: "Category" },
        { key: "data_subjects", label: "Subjects" },
        { key: "retention_period", label: "Retention" },
        { key: "legal_basis", label: "Legal Basis" },
        { key: "transfer_destination", label: "Cross-Border" },
        { key: "owner", label: "Owner" },
        { key: "status", label: "Status", badge: true },
      ]}
      formFields={[
        { key: "activity_name", label: "Processing Activity", placeholder: "e.g. Customer Onboarding" },
        { key: "purpose", label: "Purpose", placeholder: "Why this processing happens" },
        { key: "data_category", label: "Data Category", type: "select", options: CATEGORIES },
        { key: "data_subjects", label: "Data Subjects", placeholder: "e.g. Customers, Employees" },
        { key: "retention_period", label: "Retention Period", placeholder: "e.g. 7 years" },
        { key: "legal_basis", label: "Legal Basis", type: "select", options: LEGAL_BASIS },
        { key: "transfer_destination", label: "Cross-Border Transfer Destination", placeholder: "e.g. None, EU, US, Singapore" },
        { key: "owner", label: "Activity Owner", placeholder: "e.g. Onboarding Team" },
        { key: "status", label: "Status", type: "select", options: STATUSES, default: "Active" },
      ]}
    />
  );
}