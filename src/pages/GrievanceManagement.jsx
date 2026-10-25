import React from "react";
import EntityModule from "@/components/dpdp/EntityModule";
import { MessageSquareWarning, Inbox, Clock, CheckCircle2 } from "lucide-react";

const TYPES = ["Data Deletion Request", "Access to Personal Data", "Consent Withdrawal", "Incorrect Data Correction", "Grievance Redressal", "Data Portability"];
const STATUSES = ["Open", "Acknowledged", "In Progress", "Escalated", "Resolved"];
const PRIORITIES = ["Low", "Medium", "High", "Critical"];

export default function GrievanceManagement() {
  return (
    <EntityModule
      entityName="Grievance"
      title="Grievance Management"
      subtitle="Track, manage, and resolve grievances from data principals within DPDP-mandated timelines. Automated acknowledgment, SLA tracking, and escalation."
      icon={MessageSquareWarning}
      extraStats={(items) => [
        { label: "Total Grievances", value: items.length, icon: Inbox, tone: "orange" },
        { label: "Open", value: items.filter((i) => i.status !== "Resolved").length, icon: Clock, tone: "rose" },
        { label: "Escalated", value: items.filter((i) => i.status === "Escalated").length, icon: MessageSquareWarning, tone: "amber" },
        { label: "Resolved", value: items.filter((i) => i.status === "Resolved").length, icon: CheckCircle2, tone: "emerald" },
      ]}
      columns={[
        { key: "ticket_id", label: "Ticket", className: "font-mono text-xs text-slate-500" },
        { key: "principal_name", label: "Principal", className: "font-medium text-slate-900" },
        { key: "grievance_type", label: "Type" },
        { key: "priority", label: "Priority", badge: true },
        { key: "sla_deadline", label: "SLA Deadline", type: "datetime" },
        { key: "status", label: "Status", badge: true },
      ]}
      formFields={[
        { key: "ticket_id", label: "Ticket ID", placeholder: "e.g. GR-1042" },
        { key: "principal_name", label: "Data Principal Name", placeholder: "Full name" },
        { key: "principal_email", label: "Principal Email", placeholder: "" },
        { key: "grievance_type", label: "Grievance Type", type: "select", options: TYPES },
        { key: "description", label: "Description", type: "textarea" },
        { key: "priority", label: "Priority", type: "select", options: PRIORITIES, default: "Medium" },
        { key: "status", label: "Status", type: "select", options: STATUSES, default: "Open" },
        { key: "sla_deadline", label: "SLA Deadline", type: "datetime" },
        { key: "resolution", label: "Resolution Notes", type: "textarea" },
      ]}
    />
  );
}