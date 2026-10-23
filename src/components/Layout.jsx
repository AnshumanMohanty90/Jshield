import React, { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, Database, ShieldCheck, Cookie, Building2,
  AlertTriangle, FileText, MessageSquareWarning, UserCog,
  Shield, ChevronLeft, Menu, FileSearch, Lock,
} from "lucide-react";

const NAV = [
  { label: "Command Center", to: "/", icon: LayoutDashboard },
  {
    group: "Privacy Governance",
    items: [
      { label: "Data Discovery", to: "/data-discovery", icon: Database },
      { label: "Consent Management", to: "/consents", icon: ShieldCheck },
      { label: "Cookie Manager", to: "/cookies", icon: Cookie },
      { label: "DPIA", to: "/dpia", icon: FileSearch },
    ],
  },
  {
    group: "Risk and compliance",
    items: [
      { label: "Security Safeguards", to: "/security-safeguards", icon: Lock },
      { label: "Vendor Risk", to: "/vendors", icon: Building2 },
      { label: "Breaches", to: "/breaches", icon: AlertTriangle },
    ],
  },
  {
    group: "Records and rights",
    items: [
      { label: "Data record", to: "/ropa", icon: FileText },
      { label: "Grievances", to: "/grievances", icon: MessageSquareWarning },
      { label: "Data Principal Rights", to: "/rights", icon: UserCog },
    ],
  },
];

export default function Layout() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (to) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  const SidebarContent = (
    <div className="flex h-full flex-col bg-[#0B1120] text-slate-300">
      <div className="flex items-center gap-2.5 px-5 h-16 border-b border-white/5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-sky-500 shadow-lg shadow-indigo-500/20">
          <Shield className="h-5 w-5 text-white" />
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold text-white tracking-tight">JShield</div>
          <div className="text-[10px] uppercase tracking-widest text-indigo-300/70">by Jago AI</div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        <Link
          to="/dashboard"
          onClick={() => setMobileOpen(false)}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            isActive("/dashboard")
              ? "bg-indigo-500/15 text-white ring-1 ring-inset ring-indigo-400/30"
              : "text-slate-400 hover:bg-white/5 hover:text-white"
          )}
        >
          <LayoutDashboard className="h-4 w-4" />
          Command Center
        </Link>

        {NAV.filter((n) => n.group).map((section) => (
          <div key={section.group}>
            <div className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
              {section.group}
            </div>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                      active
                        ? "bg-indigo-500/15 text-white ring-1 ring-inset ring-indigo-400/30"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/5 px-5 py-4">
        <div className="rounded-lg bg-white/5 p-3">
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            DPDP Act 2023 Aligned
          </div>
          <p className="mt-1.5 text-[11px] leading-relaxed text-slate-500">
            Continuous monitoring across every JShield module.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 w-64 z-40">
        {SidebarContent}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-64">
            <button
              className="absolute -right-10 top-4 flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white"
              onClick={() => setMobileOpen(false)}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            {SidebarContent}
          </div>
        </div>
      )}

      <div className="lg:pl-64">
        {/* Mobile top bar */}
        <div className="lg:hidden sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-slate-200 bg-white px-4">
          <button
            onClick={() => setMobileOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-indigo-600" />
            <span className="font-semibold text-slate-900">JShield</span>
          </div>
        </div>

        <main className="min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
}