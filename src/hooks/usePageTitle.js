import { useEffect } from "react";

function setMeta(selector, create, attr, value) {
  let el = document.head.querySelector(selector);
  if (!el) { el = create(); document.head.appendChild(el); }
  el.setAttribute(attr, value);
}

export default function usePageTitle(title, description) {
  useEffect(() => {
    document.title = title;
    if (description) {
      setMeta('meta[name="description"]', () => { const m = document.createElement("meta"); m.setAttribute("name", "description"); return m; }, "content", description);
      setMeta('meta[property="og:description"]', () => { const m = document.createElement("meta"); m.setAttribute("property", "og:description"); return m; }, "content", description);
    }
    setMeta('meta[property="og:title"]', () => { const m = document.createElement("meta"); m.setAttribute("property", "og:title"); return m; }, "content", title);
    if (/^Page not found/.test(title)) {
      document.head.querySelector('link[rel="canonical"]')?.remove();
    } else {
      setMeta('link[rel="canonical"]', () => { const l = document.createElement("link"); l.setAttribute("rel", "canonical"); return l; }, "href", "https://jshield.ai" + window.location.pathname);
    }
  }, [title, description]);
}
