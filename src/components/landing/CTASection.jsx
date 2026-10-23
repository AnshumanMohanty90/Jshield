import { Link } from "react-router-dom";
import { ArrowRight, MessageSquare } from "lucide-react";
import { Reveal } from "./primitives";

export default function CTASection() {
  return (
    <section className="bg-slate-950 py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-sky-500 px-6 py-12 text-center shadow-2xl shadow-indigo-500/20 sm:px-12">
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl text-pretty">
              See where you stand today.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-indigo-100">
              Get your readiness score within the first hour.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/assessment"
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Check your readiness <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <MessageSquare className="h-4 w-4" /> Talk to us
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}