import Nav from "./Nav";
import Footer from "./Footer";

export default function LandingLayout({ children }) {
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      {children}
      <Footer />
    </div>
  );
}