import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Shield, Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Platform", to: "/#features" },
  { label: "Pricing", to: "/pricing" },
  { label: "Security", to: "/security" },
  { label: "Contact", to: "/contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "bg-slate-950/80 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-sky-500 shadow-lg shadow-indigo-500/20">
            <Shield className="h-5 w-5 text-white" />
          </span>
          <span className="text-lg font-semibold text-white tracking-tight">JagoAI</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <Link key={l.label} to={l.to} className="text-sm font-medium text-slate-300 transition-colors hover:text-white">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link to="/login" className="text-sm font-medium text-slate-200 hover:text-white">
            Sign in
          </Link>
          <Link
            to="/register"
            className="group inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            Get started
            <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
          </Link>
        </div>

        <button className="text-white md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-slate-950/95 px-5 py-4 backdrop-blur-xl md:hidden">
          <div className="space-y-1">
            {LINKS.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-200 hover:bg-white/5"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="mt-3 flex gap-3">
            <Link to="/login" className="flex-1 rounded-lg border border-white/15 px-4 py-2.5 text-center text-sm font-medium text-white">
              Sign in
            </Link>
            <Link to="/register" className="flex-1 rounded-lg bg-white px-4 py-2.5 text-center text-sm font-semibold text-slate-900">
              Get started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}