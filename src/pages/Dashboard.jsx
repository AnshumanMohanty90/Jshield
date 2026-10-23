import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { PageHeader, StatCard } from "@/components/dpdp/Shell";
import { RiskBadge, SeverityBadge, StatusBadge, PriorityBadge } from "@/components/dpdp/Badges";
import {
  ShieldCheck, Database, Building2, AlertTriangle, MessageSquareWarning,
  UserCog, Cookie, FileText, ArrowRight, Activity, FileSearch, Lock,
} from "lucide-react";
import {
  PieChart, Pie, Cell, ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis,
} from "recharts";

const MODULES = [
  { label: "Data Discovery", to: "/data-discovery", icon: Database, tone: "text-sky-600 bg-sky-50" },
  { label: "Consent Management", to: "/consents", icon: ShieldCheck, tone: "text-indigo-600 bg-indigo-50" },
  { label: "Cookie Manager", to: "/cookies", icon: Cookie, tone: "text-amber-600 bg-amber-50" },
  { label: "Vendor Risk", to: "/vendors", icon: Building2, tone: "text-violet-600 bg-violet-50" },
  { label: "Breach & Incidents", to: "/breaches", icon: AlertTriangle, tone: "text-rose-600 bg-rose-50" },
  { label: "Data record", to: "/ropa", icon: FileText, tone: "text-emerald-600 bg-emerald-50" },
  { label: "Grievances", to: "/grievances", icon: MessageSquareWarning, tone: "text-orange-600 bg-orange-50" },
  { label: "Data Principal Rights", to: "/rights", icon: UserCog, tone: "text-cyan-600 bg-cyan-50" },
  { label: "DPIA", to: "/dpia", icon: FileSearch, tone: "text-indigo-600 bg-indigo-50" },
  { label: "Security Safeguards", to: "/security-safeguards", icon: Lock, tone: "text-emerald-600 bg-emerald-50" },
];

const RISK_COLORS = { Critical: "#e11d48", High: "#f97316", Medium: "#f59e0b", Low: "#10b981" };

function timeLeft(deadline) {
  if (!deadline) return null;
  const ms = new Date(deadline).getTime() - Date.now();
  if (ms <= 0) return "Overdue";
  const hrs = Math.floor(ms / 3600000);
  if (hrs > 24) return `${Math.floor(hrs / 24)}d ${hrs % 24}h left`;
  return `${hrs}h left`;
}

export default function Dashboard() {
  const [data, setData] = useState({
    assets: [], consents: [], purposes: [], vendors: [], breaches: [],
    grievances: [], rights: [], cookies: [], dpias: [], controls: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsub = [];
    const load = async () => {
      const [assets, consents, purposes, vendors, breaches, grievances, rights, cookies, dpias, controls] =
        await Promise.all([
          base44.entities.DataAsset.list("-updated_date", 200),
          base44.entities.ConsentRecord.list("-updated_date", 200),
          base44.entities.ConsentPurpose.list("-updated_date", 200),
          base44.entities.Vendor.list("-updated_date", 200),
          base44.entities.BreachIncident.list("-updated_date", 200),
          base44.entities.Grievance.list("-updated_date", 200),
          base44.entities.RightsRequest.list("-updated_date", 200),
          base44.entities.Cookie.list("-updated_date", 200),
          base44.entities.DPIA.list("-updated_date", 200),
          base44.entities.SecurityControl.list("-updated_date", 200),
        ]);
      setData({ assets, consents, purposes, vendors, breaches, grievances, rights, cookies, dpias, controls });
      setLoading(false);
    };
    load();
    Object.keys({ DataAsset: 1, ConsentRecord: 1, Vendor: 1, BreachIncident: 1, Grievance: 1, RightsRequest: 1, DPIA: 1, SecurityControl: 1 }).forEach((e) => {
      unsub.push(base44.entities[e].subscribe(load));
    });
    return () => unsub.forEach((u) => u && u());
  }, []);

  const metrics = useMemo(() => {
    const granted = data.consents.filter((c) => c.status === "Granted").length;
    const openGrievances = data.grievances.filter((g) => g.status !== "Resolved").length;
    const mappedAssets = data.assets.filter((a) => a.status !== "Scanning").length;
    const vendorsAtRisk = data.vendors.filter((v) => v.risk_level === "High" || v.risk_level === "Critical").length;
    const activeIncidents = data.breaches.filter((b) => b.status !== "Resolved").length;
    const openRights = data.rights.filter((r) => r.status !== "Fulfilled" && r.status !== "Rejected").length;
    const highRiskAssets = data.assets.filter((a) => a.risk_level === "High" || a.risk_level === "Critical").length;
    const controlGaps = data.controls.filter((c) => c.status === "Gap" || c.status === "Planned").length;
    const dpiasOverdue = data.dpias.filter((d) => d.status === "Overdue").length;
    const complianceScore = Math.max(0, Math.round(100 - (activeIncidents * 6 + vendorsAtRisk * 4 + openGrievances * 3 + highRiskAssets * 2 + controlGaps * 3 + dpiasOverdue * 4)));
    return { granted, openGrievances, mappedAssets, vendorsAtRisk, activeIncidents, openRights, highRiskAssets, controlGaps, dpiasOverdue, complianceScore };
  }, [data]);

  const riskDistribution = useMemo(() => {
    const counts = { Critical: 0, High: 0, Medium: 0, Low: 0 };
    data.assets.forEach((a) => { if (counts[a.risk_level] !== undefined) counts[a.risk_level]++; });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [data.assets]);

  const recentBreaches = data.breaches.slice(0, 4);
  const slaGrievances = data.grievances
    .filter((g) => g.status !== "Resolved")
    .sort((a, b) => new Date(a.sla_deadline) - new Date(b.sla_deadline))
    .slice(0, 4);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center py-32">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 space-y-8">
      <PageHeader
        title="DPDP Command Center"
        subtitle="A unified 360° view of privacy operations across consent, governance, and risk, aligned with the Digital Personal Data Protection Act, 2023."
      />

      {/* Top row: compliance score + stat cards */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-[#0B1120] to-slate-900 p-6 text-white shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-indigo-300/80">Compliance Score</p>
              <p className="mt-1 text-sm text-slate-400">Real-time posture across every JShield module</p>
            </div>
            <Activity className="h-5 w-5 text-indigo-400" />
          </div>
          <div className="relative mt-4 h-44">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                innerRadius="72%" outerRadius="100%" data={[{ value: metrics.complianceScore }]}
                startAngle={90} endAngle={-270}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar background={{ fill: "rgba(255,255,255,0.08)" }} dataKey="value" cornerRadius={20}
                  fill={metrics.complianceScore >= 80 ? "#34d399" : metrics.complianceScore >= 60 ? "#fbbf24" : "#fb7185"} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-semibold tracking-tight">{metrics.complianceScore}</span>
              <span className="text-xs text-slate-400">/ 100</span>
            </div>
          </div>
          <p className="mt-2 text-center text-xs text-slate-400">
            {metrics.complianceScore >= 80 ? "Audit-ready posture" : metrics.complianceScore >= 60 ? "Action recommended" : "Critical gaps detected"}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:col-span-2">
          <StatCard label="Active Consents" value={metrics.granted.toLocaleString()} delta="↑ 8% wk" tone="indigo" icon={ShieldCheck} />
          <StatCard label="Data Assets Mapped" value={metrics.mappedAssets} tone="sky" icon={Database} />
          <StatCard label="Vendors at Risk" value={metrics.vendorsAtRisk} tone="rose" icon={Building2} />
          <StatCard label="Active Incidents" value={metrics.activeIncidents} tone="amber" icon={AlertTriangle} />
          <StatCard label="Open Grievances" value={metrics.openGrievances} tone="orange" icon={MessageSquareWarning} />
          <StatCard label="Rights Requests" value={metrics.openRights} tone="emerald" icon={UserCog} />
        </div>
      </div>

      {/* Modules grid */}
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-3">Compliance Modules</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {MODULES.map((m) => {
            const Icon = m.icon;
            return (
              <Link
                key={m.to}
                to={m.to}
                className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${m.tone}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-900">{m.label}</span>
                  <ArrowRight className="h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-slate-500" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Risk distribution + recent incidents */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900">Data Risk Distribution</h3>
          <p className="text-xs text-slate-500">Across {data.assets.length} mapped assets</p>
          <div className="mt-4 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={riskDistribution} dataKey="value" nameKey="name" innerRadius={48} outerRadius={72} paddingAngle={3}>
                  {riskDistribution.map((entry) => (
                    <Cell key={entry.name} fill={RISK_COLORS[entry.name]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 space-y-1.5">
            {riskDistribution.map((r) => (
              <div key={r.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-slate-600">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: RISK_COLORS[r.name] }} />
                  {r.name}
                </span>
                <span className="font-medium text-slate-900">{r.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900">Recent Breach Activity</h3>
            <Link to="/breaches" className="text-xs font-medium text-indigo-600 hover:text-indigo-700">View all</Link>
          </div>
          <div className="mt-4 space-y-3">
            {recentBreaches.map((b) => (
              <div key={b.id} className="flex items-start gap-3 rounded-lg border border-slate-100 p-3">
                <div className="mt-0.5"><SeverityBadge severity={b.severity} /></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{b.title}</p>
                  <p className="text-xs text-slate-500">
                    {b.affected_records.toLocaleString()} records · {new Date(b.detected_date).toLocaleString()}
                  </p>
                </div>
                <StatusBadge status={b.status} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SLA grievances */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Grievances: SLA Watch</h3>
            <p className="text-xs text-slate-500">DPDP-mandated response timelines</p>
          </div>
          <Link to="/grievances" className="text-xs font-medium text-indigo-600 hover:text-indigo-700">Manage</Link>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wide text-slate-500">
                <th className="pb-2 font-medium">Ticket</th>
                <th className="pb-2 font-medium">Principal</th>
                <th className="pb-2 font-medium">Type</th>
                <th className="pb-2 font-medium">Priority</th>
                <th className="pb-2 font-medium">SLA</th>
                <th className="pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {slaGrievances.map((g) => {
                const left = timeLeft(g.sla_deadline);
                return (
                  <tr key={g.id} className="py-2">
                    <td className="py-3 font-mono text-xs text-slate-500">{g.ticket_id}</td>
                    <td className="py-3 text-slate-900">{g.principal_name}</td>
                    <td className="py-3 text-slate-600">{g.grievance_type}</td>
                    <td className="py-3"><PriorityBadge priority={g.priority} /></td>
                    <td className={`py-3 text-xs font-medium ${left === "Overdue" ? "text-rose-600" : "text-slate-600"}`}>{left}</td>
                    <td className="py-3"><StatusBadge status={g.status} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}