import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

const COLS = [
  {
    title: "Platform",
    links: [
      ["Data Discovery", "/#features"],
      ["Consent Management", "/#features"],
      ["Breach Response", "/#features"],
      ["ROPA", "/#features"],
    ],
  },
  {
    title: "Company",
    links: [
      ["Pricing", "/pricing"],
      ["Security", "/security"],
      ["Contact", "/contact"],
      ["Console", "/dashboard"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Privacy Policy", "/security"],
      ["Terms", "/security"],
      ["DPDP Statement", "/security"],
      ["Sub-processors", "/security"],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-sky-500">
                <Shield className="h-5 w-5 text-white" />
              </span>
              <span className="leading-tight">
                <span className="block text-lg font-semibold text-white">Jaguard</span>
                <span className="block text-[10px] uppercase tracking-widest text-indigo-300/70">by Jago AI</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              The privacy operations platform that operationalizes India's DPDP Act, from data discovery to breach response.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> DPDP Act 2023 Aligned
            </div>
          </div>
          {COLS.map((c) => (
            <div key={c.title}>
              <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">{c.title}</div>
              <ul className="mt-4 space-y-2.5">
                {c.links.map(([label, to]) => (
                  <li key={label}>
                    <Link to={to} className="text-sm transition-colors hover:text-white">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} Jago AI. All rights reserved.</p>
          <p className="text-xs text-slate-500">Built for data protection teams in India.</p>
        </div>
      </div>
    </footer>
  );
}