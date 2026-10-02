import React from "react";
import { cn } from "@/lib/utils";

const RISK_STYLES = {
  Critical: "bg-rose-50 text-rose-700 ring-rose-600/20",
  High: "bg-orange-50 text-orange-700 ring-orange-600/20",
  Medium: "bg-amber-50 text-amber-700 ring-amber-600/20",
  Low: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
};

const SEVERITY_STYLES = {
  Critical: "bg-rose-600 text-white",
  High: "bg-orange-500 text-white",
  Medium: "bg-amber-400 text-amber-950",
  Low: "bg-emerald-500 text-white",
};

const STATUS_TONES = {
  Active: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Granted: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Resolved: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Fulfilled: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Classified: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Mapped: "bg-sky-50 text-sky-700 ring-sky-600/20",
  Pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
  Draft: "bg-slate-100 text-slate-600 ring-slate-500/20",
  Review: "bg-amber-50 text-amber-700 ring-amber-600/20",
  Expired: "bg-slate-100 text-slate-500 ring-slate-400/20",
  Withdrawn: "bg-rose-50 text-rose-700 ring-rose-600/20",
  Onboarding: "bg-indigo-50 text-indigo-700 ring-indigo-600/20",
  Offboarded: "bg-slate-100 text-slate-500 ring-slate-400/20",
  Scanning: "bg-sky-50 text-sky-700 ring-sky-600/20",
  Detected: "bg-rose-50 text-rose-700 ring-rose-600/20",
  Investigating: "bg-orange-50 text-orange-700 ring-orange-600/20",
  Contained: "bg-amber-50 text-amber-700 ring-amber-600/20",
  Notified: "bg-indigo-50 text-indigo-700 ring-indigo-600/20",
  Open: "bg-rose-50 text-rose-700 ring-rose-600/20",
  Acknowledged: "bg-sky-50 text-sky-700 ring-sky-600/20",
  "In Progress": "bg-amber-50 text-amber-700 ring-amber-600/20",
  Escalated: "bg-orange-50 text-orange-700 ring-orange-600/20",
  Received: "bg-sky-50 text-sky-700 ring-sky-600/20",
  "Under Review": "bg-amber-50 text-amber-700 ring-amber-600/20",
  Rejected: "bg-rose-50 text-rose-700 ring-rose-600/20",
  Blocked: "bg-rose-50 text-rose-700 ring-rose-600/20",
  Archived: "bg-slate-100 text-slate-500 ring-slate-400/20",
  Implemented: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Partial: "bg-amber-50 text-amber-700 ring-amber-600/20",
  Planned: "bg-slate-100 text-slate-600 ring-slate-500/20",
  Gap: "bg-rose-50 text-rose-700 ring-rose-600/20",
  Approved: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Overdue: "bg-rose-50 text-rose-700 ring-rose-600/20",
  Complete: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  "Not Started": "bg-slate-100 text-slate-600 ring-slate-500/20",
  "Board Notified": "bg-indigo-50 text-indigo-700 ring-indigo-600/20",
  "Principals Notified": "bg-sky-50 text-sky-700 ring-sky-600/20",
};

export function RiskBadge({ level, score }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className={cn(
          "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset",
          RISK_STYLES[level] || "bg-slate-100 text-slate-600 ring-slate-400/20"
        )}
      >
        {level}
      </span>
      {typeof score === "number" && (
        <span className="text-xs font-mono text-slate-400">{score}</span>
      )}
    </span>
  );
}

export function SeverityBadge({ severity }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold",
        SEVERITY_STYLES[severity] || "bg-slate-200 text-slate-700"
      )}
    >
      {severity}
    </span>
  );
}

export function StatusBadge({ status }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset",
        STATUS_TONES[status] || "bg-slate-100 text-slate-600 ring-slate-400/20"
      )}
    >
      {status}
    </span>
  );
}

export function PriorityBadge({ priority }) {
  const tones = {
    Critical: "bg-rose-600 text-white",
    High: "bg-orange-500 text-white",
    Medium: "bg-amber-400 text-amber-950",
    Low: "bg-emerald-500 text-white",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold",
        tones[priority] || "bg-slate-200 text-slate-700"
      )}
    >
      {priority}
    </span>
  );
}