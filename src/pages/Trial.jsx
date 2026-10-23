import { Link } from "react-router-dom";
import LandingLayout from "@/components/landing/LandingLayout";
import PageHero from "@/components/landing/PageHero";
import LeadForm, { COMPANY_SIZES } from "@/components/landing/LeadForm";
import usePageTitle from "@/hooks/usePageTitle";

export default function Trial() {
  usePageTitle("Free trial | JShield");

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
              Use your work email. Our team verifies every request personally and replies within one working day.
            </p>
            <div className="mt-6">
              <LeadForm
                intent="trial"
                sourcePage="/trial"
                fields={[
                  { name: "name", label: "Full name", placeholder: "Priya Sharma" },
                  {
                    name: "work_email",
                    label: "Work email",
                    type: "email",
                    placeholder: "you@company.com",
                    hint: "Use your work email. Personal addresses are not accepted.",
                  },
                  { name: "company", label: "Company name", placeholder: "Acme Pvt Ltd" },
                  { name: "designation", label: "Designation", placeholder: "Data Protection Officer" },
                  {
                    name: "company_size",
                    label: "Company size",
                    type: "select",
                    options: COMPANY_SIZES,
                    placeholder: "Select company size",
                  },
                ]}
                submitLabel="Request trial activation"
                thankYou="Thank you. We will confirm your trial within one working day. Your first readiness score is ready within an hour of activation."
                footnote="Our team activates every trial personally. No credit card required."
              />
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-slate-400">
            Prefer a guided walkthrough first?{" "}
            <Link to="/contact" className="text-slate-200 underline-offset-2 hover:text-white hover:underline">
              Talk to us
            </Link>
            .
          </p>
        </div>
      </section>
    </LandingLayout>
  );
}