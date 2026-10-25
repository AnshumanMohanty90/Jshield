import Nav from "./Nav";
import Footer from "./Footer";
import StickyCta from "./StickyCta";

export default function LandingLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 public-page">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-slate-900"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main-content">{children}</main>
      <Footer />
      <StickyCta />
    </div>
  );
}