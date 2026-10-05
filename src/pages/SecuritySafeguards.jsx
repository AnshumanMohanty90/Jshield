import React from "react";
import EntityModule from "@/components/dpdp/EntityModule";
import { Lock, CheckCircle2, AlertTriangle, Clock } from "lucide-react";

const CONTROLS = [
  "Encryption",
  "Access Control",
  "Data Masking",
  "Monitoring",
  "Log Retention",
  "Incident Response",
  "DPA Safeguards",
];
const STATUSES = ["Implemented", "Partial", "Planned", "Gap"];

export default function SecuritySafeguards() {
  return (
    <EntityModule
      entityName="SecurityControl"
      title="Security Safeguards Register"
      subtitle="Track the seven mandatory technical and organisational controls under DPDP Rule 6: encryption, access control, masking, monitoring, 1-year log retention, incident response, and processor safeguards."
      icon={Lock}
      extraStats={(items) => [
        { label: "Total Controls", value: items.length, icon: Lock, tone: "indigo" },
        { label: "Implemented", value: items.filter((i) => i.status === "Implemented").length, icon: CheckCircle2, tone: "emerald" },
        { label: "Partial", value: items.filter((i) => i.status === "Partial").length, icon: Clock, tone: "amber" },
        { label: "Gaps", value: items.filter((i) => i.status === "Gap").length, icon: AlertTriangle, tone: "rose" },
      ]}
      columns={[
        { key: "control_id", label: "Rule 6 Control" },
        { key: "control_name", label: "Control", className: "font-medium text-slate-900" },
        { key: "status", label: "Status", badge: true },
        { key: "owner", label: "Owner" },
        { key: "last_reviewed", label: "Last Reviewed", type: "date" },
        { key: "evidence", label: "Evidence", className: "max-w-xs truncate" },
      ]}
      formFields={[
        { key: "control_name", label: "Control Name", placeholder: "e.g. AES-256 at-rest encryption" },
        { key: "control_id", label: "Rule 6 Control", type: "select", options: CONTROLS },
        { key: "status", label: "Implementation Status", type: "select", options: STATUSES, default: "Planned" },
        { key: "owner", label: "Control Owner", placeholder: "e.g. SecOps Lead" },
        { key: "last_reviewed", label: "Last Reviewed", type: "date" },
        { key: "evidence", label: "Evidence / Artifact", placeholder: "Link or reference to proof" },
        { key: "notes", label: "Notes", type: "textarea" },
      ]}
    />
  );
}