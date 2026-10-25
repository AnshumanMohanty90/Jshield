import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import { primaryCtaClass } from "./Buttons";

// Phone-only call to action that appears once the hero has scrolled away, hides near the
// closing call to action and the footer, and can be dismissed for the visit.
export default function StickyCta() {
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);
  const [closed, setClosed] = useState(() => {
    try {
      return window.sessionStorage.getItem("js_sticky_closed") === "1";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const onScroll = () => {
      const end = document.querySelector("#final-cta, footer");
      const nearEnd = end ? end.getBoundingClientRect().top < window.innerHeight : false;
      // Step aside while the law checker, which needs the bottom of the screen, is in view.
      const busy = [...document.querySelectorAll("#frameworks, [data-hide-sticky]")].some((el) => {
        const r = el.getBoundingClientRect();
        return r.top < window.innerHeight && r.bottom > 0;
      });
      const on = window.scrollY > 640 && !nearEnd && !busy;
      setShow(on);
      document.documentElement.classList.toggle("sticky-on", on);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    if (closed || /^\/(assessment|trial|contact)/.test(pathname)) document.documentElement.classList.remove("sticky-on");
  }, [closed, pathname]);

  if (closed || /^\/(assessment|trial|contact)/.test(pathname)) return null;

  return (
    <div
      className={`sticky-cta md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-slate-950/95 px-4 pt-3 backdrop-blur transition-transform duration-300 ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
      aria-hidden={!show}
    >
      <div className="flex items-center gap-3">
        <Link to="/assessment" tabIndex={show ? 0 : -1} className={`${primaryCtaClass} flex-1 justify-center`}>
          Check your readiness
        </Link>
        <button
          type="button"
          onClick={() => {
            setClosed(true);
            document.documentElement.classList.remove("sticky-on");
            try {
              window.sessionStorage.setItem("js_sticky_closed", "1");
            } catch {
              /* storage blocked */
            }
          }}
          tabIndex={show ? 0 : -1}
          aria-label="Hide this bar"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-slate-300 hover:text-white"
        >
          <X aria-hidden="true" className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
