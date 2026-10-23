import LandingLayout from "@/components/landing/LandingLayout";
import PageHero from "@/components/landing/PageHero";
import CTASection from "@/components/landing/CTASection";
import LeadForm, { COMPANY_SIZES } from "@/components/landing/LeadForm";
import usePageTitle from "@/hooks/usePageTitle";

export default function Trial() {
  usePageTitle("Free trial | JShield");

  return (
    <LandingLayout>
      <PageHero
        eyebrow="Free 10-day trial"
        title="Start your free trial."
        subtitle="Activate a 10-day trial with every JShield module. No payment details needed."
      />

      <section className="bg-slate-950 py-10 sm:py-16">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <h2 className="font-semibold text-white">Where should we activate your trial?</h2>
          <p className="mt-1 text-sm text-slate-400">Use your work email. Personal addresses are not accepted.</p>
          <div className="mt-6">
            <LeadForm
              intent="trial"
              sourcePage="/trial"
              fields={[
                { name: "name", label: "Full name", placeholder: "Priya Sharma" },
                { name: "work_email", label: "Work email", type: "email", placeholder: "you@company.com" },
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
              submitLabel="Start free trial"
              thankYou="Thank you. Your trial request is in. We will email your login details to you."
            />
          </div>
        </div>
      </section>

      <CTASection />
    </LandingLayout>
  );
}