import { Link } from "react-router-dom";
import LandingLayout from "@/components/landing/LandingLayout";
import PageHero from "@/components/landing/PageHero";
import TrialCaptureForm from "@/components/landing/TrialCaptureForm";

export default function Trial() {
  return (
    <LandingLayout>
      <PageHero
        eyebrow="Free 10-day trial"
        title="Start your free trial."
        subtitle="Tell us who you are and our team will activate your 10-day trial with full access to every JShield module. No credit card required."
      />

      <section className="bg-slate-950 pb-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 shadow-lg shadow-black/40 sm:p-8">
            <h2 className="text-lg font-semibold text-white">Where should we activate your trial?</h2>
            <p className="mt-1 text-sm text-slate-400">
              Use your work email. Our team verifies every request personally and reaches out within one business day.
            </p>
            <div className="mt-6">
              <TrialCaptureForm source="Trial Page" />
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-slate-400">
            Prefer a guided walkthrough first?{" "}
            <Link to="/contact" className="text-slate-200 underline-offset-2 hover:text-white hover:underline">
              Talk to sales
            </Link>
            .
          </p>
        </div>
      </section>
    </LandingLayout>
  );
}