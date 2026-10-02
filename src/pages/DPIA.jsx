import React from "react";
import EntityModule from "@/components/dpdp/EntityModule";
import { FileSearch, CheckCircle2, Clock, AlertTriangle } from "lucide-react";

const RISK_LEVELS = ["Low", "Medium", "High", "Critical"];
const STATUSES = ["Draft", "In Progress", "Under Review", "Approved", "Overdue"];

export default function DPIA() {
  return (
    <EntityModule
      entityName="DPIA"
      title="Data Protection Impact Assessments (DPIA)"
      subtitle="Mandatory for Significant Data Fiduciaries under DPDP Rule 12. Assess high-risk processing, document residual risk, and keep annual reviews audit-ready."
      icon={FileSearch}
      extraStats={(items) => [
        { label: "Total DPIAs", value: items.length, icon: FileSearch, tone: "indigo" },
        { label: "Approved", value: items.filter((i) => i.status === "Approved").length, icon: CheckCircle2, tone: "emerald" },
        { label: "In Progress", value: items.filter((i) => i.status === "In Progress" || i.status === "Under Review").length, icon: Clock, tone: "amber" },
        { label: "High/Critical Risk", value: items.filter((i) => ["High", "Critical"].includes(i.risk_level)).length, icon: AlertTriangle, tone: "rose" },
      ]}
      columns={[
        { key: "activity_name", label: "Activity", className: "font-medium text-slate-900" },
        { key: "risk_level", label: "Inherent Risk", badge: true },
        { key: "residual_risk", label: "Residual" },
        { key: "is_sdf", label: "SDF", type: "boolean" },
        { key: "owner", label: "Owner" },
        { key: "next_review_date", label: "Next Review", type: "date" },
        { key: "status", label: "Status", badge: true },
      ]}
      formFields={[
        { key: "activity_name", label: "Processing Activity", placeholder: "e.g. AI-based credit scoring" },
        { key: "description", label: "Assessment Description", type: "textarea" },
        { key: "risk_level", label: "Inherent Risk Level", type: "select", options: RISK_LEVELS },
        { key: "risk_score", label: "Risk Score (0-100)", type: "number" },
        { key: "residual_risk", label: "Residual Risk", type: "select", options: RISK_LEVELS },
        { key: "mitigations", label: "Mitigation Measures", type: "textarea" },
        { key: "is_sdf", label: "Significant Data Fiduciary", type: "boolean", default: false },
        { key: "status", label: "Status", type: "select", options: STATUSES, default: "Draft" },
        { key: "assessment_date", label: "Assessment Date", type: "date" },
        { key: "next_review_date", label: "Next Review Date", type: "date" },
        { key: "owner", label: "Assessment Owner", placeholder: "e.g. Privacy Office" },
      ]}
    />
  );
}