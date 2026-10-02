import React from "react";
import EntityModule from "@/components/dpdp/EntityModule";
import { UserCog, Inbox, Clock, CheckCircle2 } from "lucide-react";

const TYPES = ["Access", "Correction", "Erasure", "Portability", "Grievance", "Nomination"];
const STATUSES = ["Received", "Under Review", "Fulfilled", "Rejected"];

export default function RightsRequests() {
  return (
    <EntityModule
      entityName="RightsRequest"
      title="Data Principal Rights (DPRM)"
      subtitle="Simplify data rights requests with automated, real-time workflows. Handle access, correction, erasure, portability, and nomination requests."
      icon={UserCog}
      extraStats={(items) => [
        { label: "Total Requests", value: items.length, icon: Inbox, tone: "cyan" },
        { label: "Pending", value: items.filter((i) => i.status === "Received" || i.status === "Under Review").length, icon: Clock, tone: "amber" },
        { label: "Fulfilled", value: items.filter((i) => i.status === "Fulfilled").length, icon: CheckCircle2, tone: "emerald" },
        { label: "Rejected", value: items.filter((i) => i.status === "Rejected").length, icon: UserCog, tone: "rose" },
      ]}
      columns={[
        { key: "principal_name", label: "Principal", className: "font-medium text-slate-900" },
        { key: "request_type", label: "Request Type" },
        { key: "assigned_to", label: "Assigned" },
        { key: "sla_deadline", label: "SLA Deadline", type: "datetime" },
        { key: "status", label: "Status", badge: true },
      ]}
      formFields={[
        { key: "principal_name", label: "Data Principal Name", placeholder: "Full name" },
        { key: "principal_email", label: "Principal Email", placeholder: "email@example.com" },
        { key: "request_type", label: "Request Type", type: "select", options: TYPES },
        { key: "description", label: "Request Details", type: "textarea" },
        { key: "status", label: "Status", type: "select", options: STATUSES, default: "Received" },
        { key: "assigned_to", label: "Assigned To", placeholder: "e.g. DPO Office" },
        { key: "sla_deadline", label: "SLA Deadline", type: "datetime" },
        { key: "response", label: "Response / Outcome", type: "textarea" },
      ]}
    />
  );
}