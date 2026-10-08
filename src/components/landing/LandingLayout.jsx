import Nav from "./Nav";
import Footer from "./Footer";

export default function LandingLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950">
      <Nav />
      {children}
      <Footer />
    </div>
  );
}