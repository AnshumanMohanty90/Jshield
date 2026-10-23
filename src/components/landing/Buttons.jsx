import { Link } from "react-router-dom";

export const primaryCtaClass =
  "inline-flex min-h-[44px] items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:shadow-indigo-500/50";
export const secondaryCtaClass =
  "inline-flex min-h-[44px] items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10";

export function CtaPrimary({ to, children, className = "" }) {
  return (
    <Link to={to} className={`${primaryCtaClass} ${className}`}>
      {children}
    </Link>
  );
}

export function CtaSecondary({ to, children, className = "" }) {
  return (
    <Link to={to} className={`${secondaryCtaClass} ${className}`}>
      {children}
    </Link>
  );
}