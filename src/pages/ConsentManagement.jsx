import React, { useState } from "react";
import EntityModule from "@/components/dpdp/EntityModule";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ShieldCheck, CheckCircle2, Clock, FileStack, FileKey } from "lucide-react";

const LEGAL_BASIS = ["Consent", "Legitimate Use", "Legal Obligation", "Vital Interest"];
const PURPOSE_STATUSES = ["Active", "Pending", "Draft", "Expired"];
const CONSENT_STATUSES = ["Granted", "Withdrawn", "Pending", "Expired"];
const CHANNELS = ["Web", "Mobile App", "Offline", "API", "Email"];

function genId() {
  return "PC-" + Math.floor(1000 + Math.random() * 9000) + "-" + Math.floor(1000 + Math.random() * 9000);
}
function genHash() {
  return Array.from({ length: 12 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
}

export default function ConsentManagement() {
  const [tab, setTab] = useState("purposes");

  return (
    <Tabs value={tab} onValueChange={setTab} className="w-full">
      <div className="mx-auto max-w-7xl px-5 pt-8 sm:px-8">
        <TabsList className="bg-slate-100">
          <TabsTrigger value="purposes" className="gap-1.5"><ShieldCheck className="h-4 w-4" /> Purposes</TabsTrigger>
          <TabsTrigger value="records" className="gap-1.5"><FileKey className="h-4 w-4" /> Consent Records & Artifacts</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="purposes" className="mt-0">
        <EntityModule
          entityName="ConsentPurpose"
          title="Consent Purposes"
          subtitle="Define purpose limitations and the governance blueprint that will survive a regulator audit."
          icon={ShieldCheck}
          extraStats={(items) => [
            { label: "Total Purposes", value: items.length, icon: FileStack, tone: "indigo" },
            { label: "Active", value: items.filter((i) => i.status === "Active").length, icon: CheckCircle2, tone: "emerald" },
            { label: "Pending", value: items.filter((i) => i.status === "Pending").length, icon: Clock, tone: "amber" },
            { label: "Total Consents", value: items.reduce((s, i) => s + (i.consents_count || 0), 0).toLocaleString(), icon: ShieldCheck, tone: "sky" },
          ]}
          columns={[
            { key: "name", label: "Purpose", className: "font-medium text-slate-900" },
            { key: "description", label: "Description", className: "max-w-xs truncate" },
            { key: "legal_basis", label: "Legal Basis" },
            { key: "retention_period", label: "Retention" },
            { key: "consents_count", label: "Consents", type: "number" },
            { key: "status", label: "Status", badge: true },
          ]}
          formFields={[
            { key: "name", label: "Purpose Name", placeholder: "e.g. Onboarding Notice" },
            { key: "description", label: "Description", type: "textarea" },
            { key: "legal_basis", label: "Legal Basis", type: "select", options: LEGAL_BASIS },
            { key: "retention_period", label: "Retention Period", placeholder: "e.g. 7 years" },
            { key: "consents_count", label: "Active Consents Count", type: "number", default: 0 },
            { key: "status", label: "Status", type: "select", options: PURPOSE_STATUSES, default: "Active" },
          ]}
        />
      </TabsContent>

      <TabsContent value="records" className="mt-0">
        <EntityModule
          entityName="ConsentRecord"
          title="Consent Records & Artifacts"
          subtitle="Every consent is cryptographically stamped with a unique ID and timestamp — tamper-proof proof of consent, retrievable by the data subject anytime."
          icon={FileKey}
          columns={[
            { key: "artifact_id", label: "Artifact ID", className: "font-mono text-xs text-indigo-600" },
            { key: "principal_name", label: "Principal", className: "font-medium text-slate-900" },
            { key: "purpose", label: "Purpose" },
            { key: "channel", label: "Channel" },
            { key: "hash", label: "Hash", render: (r) => <span className="font-mono text-xs text-slate-400">{r.hash}</span> },
            { key: "timestamp", label: "Timestamp", type: "datetime" },
            { key: "involves_children", label: "Children", type: "boolean" },
            { key: "parental_consent_verified", label: "Parental Consent", type: "boolean" },
            { key: "status", label: "Status", badge: true },
          ]}
          formFields={[
            { key: "principal_name", label: "Data Principal Name", placeholder: "Full name" },
            { key: "principal_email", label: "Principal Email", placeholder: "email@example.com" },
            { key: "purpose", label: "Purpose", placeholder: "e.g. Onboarding Notice" },
            { key: "status", label: "Status", type: "select", options: CONSENT_STATUSES, default: "Granted" },
            { key: "channel", label: "Collection Channel", type: "select", options: CHANNELS },
            { key: "artifact_id", label: "Artifact ID", placeholder: "Auto-generated if blank", default: genId() },
            { key: "hash", label: "Consent Hash", placeholder: "Auto-generated if blank", default: genHash() },
            { key: "timestamp", label: "Timestamp", type: "datetime", default: new Date().toISOString() },
            { key: "involves_children", label: "Involves Children's Data", type: "boolean", default: false },
            { key: "parental_consent_verified", label: "Parental Consent Verified", type: "boolean", default: false },
          ]}
        />
      </TabsContent>
    </Tabs>
  );
}