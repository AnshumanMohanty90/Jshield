import { useEffect, useRef, useState } from "react";

// Fires true once, as soon as the element should be shown.
//
// Content must never stay hidden, so a plain IntersectionObserver is not enough:
// a visitor who jumps down (End key, anchor link, fast scroll, back/forward scroll
// restore) can pass a section without ever intersecting it. This hook reveals the
// element when:
// - the observer reports it intersecting, or
// - its top is at or above the bottom of the viewport (checked on scroll and
//   resize, so sections already passed are covered), or
// - a hashchange or popstate jump happens, or
// - 1.5 seconds have passed, as an absolute fallback.
// Skipped entirely (returns true immediately) when reduced motion is preferred.
export function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return undefined;
    }

    let revealed = false;
    let raf = 0;
    const timers = [];

    const cleanup = () => {
      if (raf) cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("scroll", onViewportChange);
      window.removeEventListener("resize", onViewportChange);
      window.removeEventListener("hashchange", onJump);
      window.removeEventListener("popstate", onJump);
      timers.forEach(clearTimeout);
    };

    const reveal = () => {
      if (revealed) return;
      revealed = true;
      cleanup();
      setInView(true);
    };

    const check = () => {
      raf = 0;
      if (revealed) return;
      // Top at or above the bottom of the viewport: includes everything the
      // visitor has already scrolled or jumped past.
      if (el.getBoundingClientRect().top < window.innerHeight) reveal();
    };

    const onViewportChange = () => {
      if (!raf && !revealed) raf = requestAnimationFrame(check);
    };

    // After an anchor or history jump the browser scrolls asynchronously,
    // so re-check on the next frames rather than immediately.
    const onJump = () => {
      onViewportChange();
      timers.push(setTimeout(check, 100), setTimeout(check, 400));
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) reveal();
      },
      { threshold }
    );
    observer.observe(el);

    window.addEventListener("scroll", onViewportChange, { passive: true });
    window.addEventListener("resize", onViewportChange);
    window.addEventListener("hashchange", onJump);
    window.addEventListener("popstate", onJump);
    // Absolute fallback: nothing stays hidden for more than 1.5 seconds.
    timers.push(setTimeout(reveal, 1500));

    check();

    return cleanup;
  }, [threshold]);

  return [ref, inView];
}

// One short fade-up (12px, 300ms) starting when 15% of the element is visible.
// Never leaves content faded; skipped under prefers-reduced-motion.
export function Reveal({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView(0.15);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(12px)",
        transition: "opacity 300ms ease-out, transform 300ms ease-out",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// Counts a number up once, when the element is shown.
// Uses the same reveal triggers as Reveal, so a jumped-past counter still runs.
export function AnimatedNumber({ value, duration = 1.6, suffix = "", prefix = "" }) {
  const [ref, inView] = useInView(0.15);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(value * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}