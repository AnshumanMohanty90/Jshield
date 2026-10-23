import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import DeadlineTracker from "./DeadlineTracker";
import BrandLockup from "./BrandLockup";

const PRODUCT_GROUPS = [
  {
    title: "What JShield does",
    links: [
      { label: "Customer consent", desc: "Record and prove every permission", to: "/#solution" },
      { label: "Breach response", desc: "Report within the legal time limit", to: "/#solution" },
      { label: "Data record", desc: "One live list of the personal data you hold", to: "/#solution" },
      { label: "How it works", desc: "Four steps to ready", to: "/how-we-help" },
    ],
  },
  {
    title: "Get started",
    links: [
      { label: "Readiness check", desc: "Your score in 3 minutes", to: "/assessment" },
      { label: "Free trial", desc: "10 days, every module", to: "/trial" },
      { label: "Security", desc: "How we protect your data", to: "/security" },
    ],
  },
];

const NAV_LINKS = [
  { label: "DPDP Act guide", to: "/dpdp-act" },
  { label: "Pricing", to: "/pricing" },
  { label: "Partners", to: "/partners" },
  { label: "Jago AI", to: "https://jagotech.ai", external: true },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [productExpanded, setProductExpanded] = useState(false);
  const { pathname } = useLocation();

  const hoverTimer = useRef(null);
  const productBtnRef = useRef(null);
  const firstMenuLinkRef = useRef(null);
  const menuBtnRef = useRef(null);
  const drawerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setDrawerOpen(false);
  }, [pathname]);

  const openMenuDelayed = () => {
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setMenuOpen(true), 80);
  };
  const closeMenuDelayed = () => {
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setMenuOpen(false), 120);
  };
  const closeMenu = () => {
    clearTimeout(hoverTimer.current);
    setMenuOpen(false);
  };

  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e) => {
      if (productBtnRef.current?.parentElement?.contains(e.target)) return;
      closeMenu();
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [menuOpen]);

  const onProductTriggerKey = (e) => {
    if (e.key === "Escape" && menuOpen) {
      closeMenu();
      productBtnRef.current?.focus();
    } else if ((e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") && !menuOpen) {
      e.preventDefault();
      clearTimeout(hoverTimer.current);
      setMenuOpen(true);
      requestAnimationFrame(() => firstMenuLinkRef.current?.focus());
    }
  };

  const onMenuPanelKey = (e) => {
    if (e.key === "Escape") {
      closeMenu();
      productBtnRef.current?.focus();
    }
  };

  useEffect(() => {
    if (!drawerOpen) return;
    document.body.style.overflow = "hidden";
    const drawer = drawerRef.current;
    const focusables = () => Array.from(drawer.querySelectorAll("a[href], button:not([disabled])"));
    focusables()[0]?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") {
        setDrawerOpen(false);
        return;
      }
      if (e.key === "Tab") {
        const list = focusables();
        const first = list[0];
        const last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    const onDown = (e) => {
      if (!drawer.contains(e.target)) setDrawerOpen(false);
    };
    drawer.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.body.style.overflow = "";
      drawer.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
      menuBtnRef.current?.focus();
    };
  }, [drawerOpen]);

  const linkClass =
    "inline-flex min-h-[44px] items-center px-3 text-sm font-medium text-slate-300 transition-colors hover:text-white";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <DeadlineTracker />
      <div
        className={cn(
          "transition-all duration-300",
          scrolled ? "border-b border-white/10 bg-slate-950/80 backdrop-blur-xl" : "bg-transparent"
        )}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link to="/" aria-label="JShield home" className="flex items-center">
            <BrandLockup className="h-11 w-11" />
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            <div className="relative" onMouseEnter={openMenuDelayed} onMouseLeave={closeMenuDelayed}>
              <button
                ref={productBtnRef}
                type="button"
                aria-haspopup="true"
                aria-expanded={menuOpen}
                onClick={() => (menuOpen ? closeMenu() : (clearTimeout(hoverTimer.current), setMenuOpen(true)))}
                onKeyDown={onProductTriggerKey}
                className={cn(linkClass, menuOpen && "text-white")}
              >
                Product
              </button>
              {menuOpen && (
                <div
                  onKeyDown={onMenuPanelKey}
                  className="absolute left-0 top-full w-[600px] border-b border-white/10 bg-slate-950/95 shadow-xl backdrop-blur-xl"
                >
                  <div className="grid grid-cols-2 gap-x-10 px-6 pb-6 pt-4">
                    {PRODUCT_GROUPS.map((g) => (
                      <div key={g.title}>
                        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">{g.title}</p>
                        <div className="mt-1">
                          {g.links.map((l, i) => (
                            <Link
                              key={l.label}
                              ref={g.title === "What JShield does" && i === 0 ? firstMenuLinkRef : undefined}
                              to={l.to}
                              onClick={closeMenu}
                              className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-white/5"
                            >
                              <span className="block text-sm font-medium text-slate-100">{l.label}</span>
                              <span className="mt-0.5 block text-xs leading-relaxed text-slate-400">{l.desc}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {NAV_LINKS.map((l) =>
              l.external ? (
                <a key={l.label} href={l.to} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {l.label}
                </a>
              ) : (
                <Link key={l.label} to={l.to} className={linkClass}>
                  {l.label}
                </Link>
              )
            )}
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <Link to="/login" className={linkClass}>
              Sign in
            </Link>
            <Link
              to="/assessment"
              className="inline-flex min-h-[44px] items-center rounded-lg bg-gradient-to-r from-indigo-500 to-sky-500 px-4 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Check your readiness
            </Link>
          </div>

          <button
            ref={menuBtnRef}
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="inline-flex min-h-[44px] items-center px-3 text-sm font-medium text-white lg:hidden"
          >
            Menu
          </button>
        </nav>
      </div>

      {drawerOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Site menu">
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />
          <div
            ref={drawerRef}
            className="absolute inset-y-0 right-0 flex w-[88%] max-w-sm flex-col border-l border-white/10 bg-slate-950"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-2 py-2">
              <span className="px-3 text-sm font-semibold text-white">Menu</span>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="inline-flex min-h-[44px] items-center px-3 text-sm font-medium text-slate-300 hover:text-white"
              >
                Close
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-2 py-2">
              <button
                type="button"
                aria-expanded={productExpanded}
                onClick={() => setProductExpanded((v) => !v)}
                className="flex min-h-[44px] w-full items-center px-3 text-left text-sm font-medium text-slate-100"
              >
                Product
              </button>
              {productExpanded && (
                <div className="pb-2 pl-4">
                  {PRODUCT_GROUPS.map((g) => (
                    <div key={g.title} className="border-t border-white/10 py-2">
                      <p className="px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-slate-400">
                        {g.title}
                      </p>
                      {g.links.map((l) => (
                        <Link
                          key={l.label}
                          to={l.to}
                          onClick={() => setDrawerOpen(false)}
                          className="flex min-h-[44px] items-center px-3 text-sm text-slate-300 hover:text-white"
                        >
                          {l.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
              {NAV_LINKS.map((l) =>
                l.external ? (
                  <a
                    key={l.label}
                    href={l.to}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setDrawerOpen(false)}
                    className="flex min-h-[44px] items-center border-t border-white/10 px-3 text-sm font-medium text-slate-100"
                  >
                    {l.label}
                  </a>
                ) : (
                  <Link
                    key={l.label}
                    to={l.to}
                    onClick={() => setDrawerOpen(false)}
                    className="flex min-h-[44px] items-center border-t border-white/10 px-3 text-sm font-medium text-slate-100"
                  >
                    {l.label}
                  </Link>
                )
              )}
              <Link
                to="/login"
                onClick={() => setDrawerOpen(false)}
                className="flex min-h-[44px] items-center border-t border-white/10 px-3 text-sm font-medium text-slate-100"
              >
                Sign in
              </Link>
            </div>
            <div className="border-t border-white/10 p-5">
              <Link
                to="/assessment"
                onClick={() => setDrawerOpen(false)}
                className="inline-flex min-h-[44px] w-full items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 px-6 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30"
              >
                Check your readiness
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}