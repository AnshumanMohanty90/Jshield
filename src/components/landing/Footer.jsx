import { Link } from "react-router-dom";
import BrandLockup from "./BrandLockup";

const COLS = [
  {
    title: "Solution",
    links: [
      ["Solution overview", "/#solution"],
      ["DPDP Act", "/dpdp-act"],
      ["GDPR", "/gdpr"],
      ["SOC 2", "/soc-2"],
      ["Partner programme", "/partners"],
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
      ["Privacy Policy", "/privacy"],
      ["Terms", "/terms"],
      ["DPDP Statement", "/dpdp-statement"],
      ["Sub-processors", "/sub-processors"],
      ["Refund Policy", "/refund-policy"],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900/30 text-slate-400">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-16">
        <div className="grid gap-8 md:grid-cols-5">
          <div className="md:col-span-2">
            <Link to="/" aria-label="JShield home">
              <BrandLockup className="h-12 w-12" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              JShield helps companies meet data protection laws, from finding personal data to
              reporting breaches.
            </p>
            <a
              href="mailto:contact@jagoai.com"
              className="mt-3 inline-flex min-h-[44px] md:min-h-6 items-center text-sm text-slate-300 underline-offset-2 transition-colors hover:text-white hover:underline"
            >
              contact@jagoai.com
            </a>
          </div>
          {COLS.map((c) => (
            <div key={c.title}>
              <div className="text-[16px] font-semibold text-indigo-400">{c.title}</div>
              <ul className="mt-4 space-y-2.5">
                {c.links.map(([label, to]) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="inline-flex min-h-[44px] md:min-h-6 items-center text-sm transition-colors hover:text-white"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-[16px] text-slate-300">
            © 2026 Jago AI Technologies Private Limited. JShield is part of{" "}
            <a
              href="https://jagotech.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] md:min-h-6 items-baseline underline-offset-2 transition-colors hover:text-white hover:underline"
            >
              Jago AI
            </a>
            . Built for data protection teams.
          </p>
        </div>
      </div>
    </footer>
  );
}