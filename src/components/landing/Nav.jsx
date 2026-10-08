import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ClipboardCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Image } from "@/components/ui/image";

const LOGO_URL =
  "https://media.base44.com/images/public/6abfe638fec4c87c5794805b/310448946_generated_df1a9fe9.png";

const LINKS = [
  { label: "Solution", to: "/#solution" },
  { label: "DPDP Act", to: "/dpdp-act" },
  { label: "Partner program", to: "/partners" },
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
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "transition-all duration-300",
          scrolled ? "bg-slate-950/80 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
        )}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link to="/" aria-label="Jaguard home">
            <Image
              src={LOGO_URL}
              alt="Jaguard"
              fittingType="fit"
              className="h-11 w-11 rounded-lg"
            />
          </Link>

          <div className="hidden items-center gap-6 lg:flex">
            {LINKS.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/assessment"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              <ClipboardCheck className="h-4 w-4" />
              Take the DPDP readiness assessment
            </Link>
          </div>

          <button className="text-white lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-slate-950/95 px-5 py-4 backdrop-blur-xl lg:hidden">
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
            <Link
              to="/assessment"
              className="mt-2 flex items-center gap-2 rounded-lg bg-white px-3 py-2.5 text-sm font-semibold text-slate-900"
            >
              <ClipboardCheck className="h-4 w-4" />
              Take the DPDP readiness assessment
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}