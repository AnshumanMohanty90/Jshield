import { Mail, MapPin } from "lucide-react";
import LandingLayout from "@/components/landing/LandingLayout";
import { Reveal } from "@/components/landing/primitives";
import LeadForm, { COMPANY_SIZES } from "@/components/landing/LeadForm";
import usePageTitle from "@/hooks/usePageTitle";

const CHANNELS = [
  { icon: Mail, label: "Email", value: "contact@jagoshield.com", href: "mailto:contact@jagoshield.com" },
  { icon: MapPin, label: "Office", value: "Bengaluru, India" },
];

export default function Contact() {
  usePageTitle("Contact | JShield");

  return (
    <LandingLayout>
      <section className="bg-slate-950 pb-14 pt-28">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl text-pretty">
            Questions about JShield?
          </h1>
          <p className="mt-4 text-lg text-slate-300">Write to us at contact@jagoshield.com or use the form.</p>
        </div>
      </section>

      <section className="bg-slate-950 py-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-5">
            <div className="space-y-4 lg:col-span-2">
              {CHANNELS.map((c) => {
                const Icon = c.icon;
                return (
                  <div key={c.label} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-900 p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">{c.label}</div>
                      <div className="text-sm font-medium text-slate-100">
                        {c.href ? (
                          <a href={c.href} className="transition-colors hover:text-white">{c.value}</a>
                        ) : (
                          c.value
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="lg:col-span-3">
              <Reveal className="rounded-2xl border border-white/10 bg-slate-900 p-6 sm:p-8">
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
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
}