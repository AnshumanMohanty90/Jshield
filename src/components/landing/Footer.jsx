import { Link } from "react-router-dom";
import BrandLockup from "./BrandLockup";

const COLS = [
  {
    title: "Solution",
    links: [
      ["Solution overview", "/#solution"],
      ["DPDP Act", "/dpdp-act"],
      ["Partner program", "/partners"],
      ["Readiness assessment", "/assessment"],
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
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="grid gap-8 md:grid-cols-5">
          <div className="md:col-span-2">
            <Link to="/" aria-label="Jaguard home">
              <BrandLockup className="h-12 w-12" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              The privacy operations platform that operationalizes India's DPDP Act, from data discovery to breach response.
            </p>
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