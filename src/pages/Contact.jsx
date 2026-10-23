import LandingLayout from "@/components/landing/LandingLayout";
import LeadForm, { COMPANY_SIZES } from "@/components/landing/LeadForm";
import usePageTitle from "@/hooks/usePageTitle";

const CHANNELS = [
  { label: "Email", value: "contact@jshield.com", href: "mailto:contact@jshield.com" },
  { label: "Office", value: "Bengaluru, India" },
];

export default function Contact() {
  usePageTitle("Contact | JShield");

  return (
    <LandingLayout>
      <section className="bg-slate-950 pb-12 pt-32 sm:pb-20 sm:pt-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl text-balance">
            Questions about JShield?
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300 text-pretty">
            Write to us at contact@jshield.com or use the form.
          </p>
        </div>
      </section>

      <section className="bg-slate-950 py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-x-8 gap-y-10 lg:grid-cols-5">
            <div className="lg:col-span-2">
              {CHANNELS.map((c) => (
                <div key={c.label} className="border-t border-white/10 py-5">
                  <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">{c.label}</div>
                  <div className="mt-1 text-sm font-medium text-slate-100">
                    {c.href ? (
                      <a href={c.href} className="transition-colors hover:text-white">{c.value}</a>
                    ) : (
                      c.value
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-3">
              <LeadForm
                intent="contact"
                sourcePage="/contact"
                fields={[
                  { name: "name", label: "Full name", placeholder: "Anita Rao" },
                  { name: "work_email", label: "Work email", type: "email", placeholder: "anita@company.in" },
                  { name: "company", label: "Company", placeholder: "VeriFintech" },
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
                    placeholder: "Tell us where you are today",
                    rows: 4,
                  },
                ]}
                submitLabel="Send"
                thankYou="Thank you. Our team will be in touch."
              />
            </div>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
}