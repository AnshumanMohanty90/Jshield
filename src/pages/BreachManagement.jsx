import React from "react";
import EntityModule from "@/components/dpdp/EntityModule";
import { AlertTriangle, Activity, Bell, CheckCircle2 } from "lucide-react";

const SEVERITIES = ["Critical", "High", "Medium", "Low"];
const STATUSES = ["Detected", "Investigating", "Contained", "Notified", "Resolved"];

export default function BreachManagement() {
  return (
    <EntityModule
      entityName="BreachIncident"
      title="Breach & Incident Management"
      subtitle="Detect, monitor, and respond to unauthorized data activities. Track both stages of DPDP breach notification — the Data Protection Board within 72 hours, and affected Data Principals thereafter."
      icon={AlertTriangle}
      extraStats={(items) => [
        { label: "Total Incidents", value: items.length, icon: Activity, tone: "rose" },
        { label: "Active", value: items.filter((i) => i.status !== "Resolved").length, icon: AlertTriangle, tone: "amber" },
        { label: "Regulator Notified", value: items.filter((i) => i.regulator_notified).length, icon: Bell, tone: "sky" },
        { label: "Resolved", value: items.filter((i) => i.status === "Resolved").length, icon: CheckCircle2, tone: "emerald" },
      ]}
      columns={[
        { key: "title", label: "Incident", className: "font-medium text-slate-900" },
        { key: "severity", label: "Severity", badge: true },
        { key: "affected_records", label: "Records", type: "number" },
        { key: "assigned_to", label: "Assigned" },
        { key: "detected_date", label: "Detected", type: "datetime" },
        { key: "regulator_notified", label: "DPB Notified", type: "boolean" },
        { key: "board_notified_date", label: "Board Notified", type: "datetime" },
        { key: "principals_notified_date", label: "Principals Notified", type: "datetime" },
        { key: "notification_stage", label: "Stage" },
        { key: "status", label: "Status", badge: true },
      ]}
      formFields={[
        { key: "title", label: "Incident Title", placeholder: "e.g. Unusual data export detected" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "severity", label: "Severity", type: "select", options: SEVERITIES },
        { key: "status", label: "Status", type: "select", options: STATUSES, default: "Detected" },
        { key: "affected_records", label: "Affected Records", type: "number" },
        { key: "root_cause", label: "Root Cause", placeholder: "e.g. Compromised credentials" },
        { key: "assigned_to", label: "Assigned To", placeholder: "e.g. Security Ops" },
        { key: "detected_date", label: "Detected Date", type: "datetime" },
        { key: "regulator_notified", label: "Regulator Notified (DPB)", type: "boolean", default: false },
        { key: "board_notified_date", label: "Board Notified Date", type: "datetime" },
        { key: "principals_notified_date", label: "Principals Notified Date", type: "datetime" },
        { key: "notification_stage", label: "Notification Stage", type: "select", options: ["Not Started", "Board Notified", "Principals Notified", "Complete"], default: "Not Started" },
      ]}
    />
  );
}