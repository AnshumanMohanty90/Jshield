import LandingLayout from "@/components/landing/LandingLayout";
import PageHero from "@/components/landing/PageHero";
import Section from "@/components/landing/Section";
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

      <Section tone narrow>
        <h2 className="text-white text-balance">Where should we activate your trial?</h2>
        <p className="mt-2 text-[18px] leading-[1.6] text-slate-300">Use your work email. Personal addresses are not accepted.</p>
        <div className="mt-8">
          <LeadForm
            intent="trial"
            sourcePage="/trial"
            fields={[
              { name: "name", label: "Full name", placeholder: "Priya Sharma" },
              { name: "work_email", label: "Work email", type: "email", placeholder: "priya@yourcompany.com" },
              { name: "company", label: "Company name", placeholder: "Your company name" },
              { name: "designation", label: "Designation", placeholder: "For example, Head of Compliance" },
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