import LandingLayout from "@/components/landing/LandingLayout";
import PageHero from "@/components/landing/PageHero";
import Section from "@/components/landing/Section";
import CTASection from "@/components/landing/CTASection";
import LeadForm, { COMPANY_SIZES } from "@/components/landing/LeadForm";
import usePageTitle from "@/hooks/usePageTitle";

export default function Trial() {
  usePageTitle("Free trial | JShield", "Start a free JShield trial and see your consent, data mapping and breach reporting gaps in your own data.");

  return (
    <LandingLayout>
      <PageHero
        eyebrow="Free 10-day trial"
        title="Try every JShield module free for 10 days."
        subtitle="No payment details needed. We email your login details once the trial is set up."
      />

      <Section tone narrow>
        <h2 className="text-white text-balance">Tell us about your company to set up the trial.</h2>
        <p className="mt-2 text-[18px] leading-[1.6] text-slate-200">Use your work email. Personal addresses are not accepted.</p>
        <div className="mt-8">
          <LeadForm
            intent="trial"
            sourcePage="/trial"
            fields={[
              { name: "name", label: "Full name" },
              { name: "work_email", label: "Work email", type: "email" },
              { name: "company", label: "Company name" },
              { name: "designation", label: "Designation" },
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
      </Section>

      <CTASection />
    </LandingLayout>
  );
}