import { useState } from "react";
import LandingLayout from "@/components/landing/LandingLayout";
import { Reveal } from "@/components/landing/primitives";
import { Mail, Phone, Clock, MapPin, Check, ArrowRight } from "lucide-react";

const CHANNELS = [
  { icon: Mail, label: "Email", value: "hello@privguard.app" },
  { icon: Phone, label: "Sales", value: "+91 80 4000 0000" },
  { icon: Clock, label: "Hours", value: "Mon–Fri, 9am–6pm IST" },
  { icon: MapPin, label: "Office", value: "Bengaluru, India" },
];

const INPUT_CLS =
  "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20";

function Field({ label, children }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      {children}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", size: "", message: "" });
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setErr("Please fill in your name, email and message.");
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      setErr("Enter a valid email address.");
      return;
    }
    setErr("");
    setSent(true);
  };

  return (
    <LandingLayout>
      <section className="bg-slate-950 pb-16 pt-28">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Let's get you audit-ready</h1>
          <p className="mt-4 text-lg text-slate-300">
            Book a personalized demo or talk to our privacy team — we typically reply within one business day.
          </p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-5">
            <div className="space-y-4 lg:col-span-2">
              {CHANNELS.map((c) => {
                const Icon = c.icon;
                return (
                  <div key={c.label} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-widest text-slate-400">{c.label}</div>
                      <div className="text-sm font-medium text-slate-900">{c.value}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="lg:col-span-3">
              <Reveal className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                {sent ? (
                  <div className="flex flex-col items-center py-10 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <Check className="h-7 w-7" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-slate-900">
                      Thanks, {form.name.split(" ")[0]}!
                    </h3>
                    <p className="mt-2 max-w-sm text-sm text-slate-600">
                      Our privacy team has received your request and will reply within one business day.
                    </p>
                    <button
                      onClick={() => {
                        setSent(false);
                        setForm({ name: "", email: "", company: "", size: "", message: "" });
                      }}
                      className="mt-6 text-sm font-medium text-indigo-600 hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={submit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Full name *">
                        <input
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className={INPUT_CLS}
                          placeholder="Anita Rao"
                        />
                      </Field>
                      <Field label="Work email *">
                        <input
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className={INPUT_CLS}
                          placeholder="anita@company.in"
                        />
                      </Field>
                      <Field label="Company">
                        <input
                          value={form.company}
                          onChange={(e) => setForm({ ...form, company: e.target.value })}
                          className={INPUT_CLS}
                          placeholder="VeriFintech"
                        />
                      </Field>
                      <Field label="Team size">
                        <input
                          value={form.size}
                          onChange={(e) => setForm({ ...form, size: e.target.value })}
                          className={INPUT_CLS}
                          placeholder="50–200"
                        />
                      </Field>
                    </div>
                    <Field label="How can we help? *">
                      <textarea
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        rows={4}
                        className={`${INPUT_CLS} resize-none`}
                        placeholder="Tell us about your DPDP readiness goals…"
                      />
                    </Field>
                    {err && <p className="text-sm text-rose-600">{err}</p>}
                    <button
                      type="submit"
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:shadow-indigo-300"
                    >
                      Send message <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </button>
                  </form>
                )}
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
}