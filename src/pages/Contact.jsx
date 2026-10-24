import LandingLayout from "@/components/landing/LandingLayout";
import PageHero from "@/components/landing/PageHero";
import Section from "@/components/landing/Section";
import CTASection from "@/components/landing/CTASection";
import LeadForm, { COMPANY_SIZES } from "@/components/landing/LeadForm";
import usePageTitle from "@/hooks/usePageTitle";

const CHANNELS = [
  { label: "Email", value: "contact@jshield.com", href: "mailto:contact@jshield.com" },
  { label: "Office", value: "Bengaluru, India" },
];

export default function Contact() {
  const isPricing = new URLSearchParams(window.location.search).get("intent") === "pricing";
  usePageTitle(isPricing ? "Get pricing | JShield" : "Contact | JShield");

  const fields = isPricing
    ? [
        { name: "name", label: "Full name" },
        { name: "work_email", label: "Work email", type: "email" },
        { name: "company", label: "Company" },
        {
          name: "company_size",
          label: "Company size",
          type: "select",
          options: COMPANY_SIZES,
          placeholder: "Select company size",
        },
        {
          name: "message",
          label: "Where does customer data sit today?",
          type: "textarea",
          rows: 4,
        },
      ]
    : [
        { name: "name", label: "Full name" },
        { name: "work_email", label: "Work email", type: "email" },
        { name: "company", label: "Company" },
        {
          name: "company_size",
          label: "Company size",
          type: "select",
          options: COMPANY_SIZES,
          placeholder: "Select company size",
        },
        {
          name: "message",
          label: "What do you need help with?",
          type: "textarea",
          rows: 4,
        },
      ];

  return (
    <LandingLayout>
      <PageHero
        eyebrow={isPricing ? "Pricing" : "Contact"}
        title={isPricing ? "Get JShield pricing for your company." : "Questions about JShield?"}
        subtitle={
          isPricing
            ? "Tell us your company size and where personal data sits today. We will send you a quote."
            : "Write to us at contact@jshield.com or use the form."
        }
      />

      <Section tone>
        <div className="grid gap-x-8 gap-y-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            {CHANNELS.map((c) => (
              <div key={c.label} className="py-5 first:pt-0">
                <div className="text-[16px] font-semibold text-slate-400">{c.label}</div>
                <div className="mt-1 text-[18px] leading-[1.6] text-slate-200">
                  {c.href ? (
                    <a
                      href={c.href}
                      className="inline-flex min-h-[44px] items-center transition-colors hover:text-white"
                    >
                      {c.value}
                    </a>
                  ) : (
                    c.value
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3">
            <LeadForm
              intent={isPricing ? "pricing" : "contact"}
              sourcePage={isPricing ? "/contact?intent=pricing" : "/contact"}
              fields={fields}
              submitLabel={isPricing ? "Get my quote" : "Send"}
              thankYou={
                isPricing
                  ? "Thank you. We will email your quote to you."
                  : "Thank you. Our team will be in touch."
              }
            />
          </div>
        </div>
      </Section>

      <CTASection />
    </LandingLayout>
  );
}