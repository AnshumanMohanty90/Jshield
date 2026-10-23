import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { workEmailError } from "@/lib/workEmail";

export const COMPANY_SIZES = ["1 to 50", "51 to 200", "201 to 500", "501 to 1,000", "Over 1,000"];

const INPUT_CLASS =
  "h-11 w-full rounded-lg border border-white/10 bg-slate-900 px-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20";

const EMAIL_BAD_CLASS =
  "h-11 w-full rounded-lg border border-rose-400/50 bg-rose-500/10 px-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20";

export default function LeadForm({ intent, sourcePage, score = null, fields, submitLabel, thankYou }) {
  const [form, setForm] = useState(() => Object.fromEntries(fields.map((f) => [f.name, ""])));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [emailHint, setEmailHint] = useState("");
  const [done, setDone] = useState(false);

  const set = (name, value) => {
    setForm((f) => ({ ...f, [name]: value }));
    if (name === "work_email" && emailHint) setEmailHint(workEmailError(value) || "");
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    const missing = fields.some((f) => f.required !== false && !String(form[f.name] || "").trim());
    if (missing) {
      setError("Please fill in all required fields.");
      return;
    }
    if (fields.some((f) => f.name === "work_email")) {
      const hint = workEmailError(form.work_email) || "Enter your work email.";
      setEmailHint(hint);
      if (hint) return;
    }
    setSubmitting(true);
    try {
      const payload = { intent, source_page: sourcePage, ...form };
      if (score != null) payload.readiness_score = score;
      await base44.functions.invoke("captureLead", payload);
      setDone(true);
    } catch (err) {
      const message = err?.response?.data?.error || err?.data?.error || err?.message || "";
      if (/work email/i.test(message)) setEmailHint(message);
      else setError(message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-5 py-5 text-sm leading-relaxed text-emerald-300">
        {thankYou}
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      {error && <div className="rounded-lg bg-rose-500/10 px-4 py-3 text-sm text-rose-300">{error}</div>}

      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((f) => {
          const isEmail = f.name === "work_email";
          const fullWidth = f.type === "textarea" || f.full;
          return (
            <div key={f.name} className={`space-y-1.5 ${fullWidth ? "sm:col-span-2" : ""}`}>
              <label className="text-sm font-medium text-slate-300">{f.label}</label>
              {f.type === "select" ? (
                <select
                  value={form[f.name]}
                  onChange={(e) => set(f.name, e.target.value)}
                  className={INPUT_CLASS}
                  required={f.required !== false}
                >
                  <option value="" disabled>
                    {f.placeholder || "Select an option"}
                  </option>
                  {f.options.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              ) : f.type === "textarea" ? (
                <textarea
                  value={form[f.name]}
                  onChange={(e) => set(f.name, e.target.value)}
                  rows={f.rows || 4}
                  placeholder={f.placeholder}
                  className={`${INPUT_CLASS} resize-none py-3`}
                  required={f.required !== false}
                />
              ) : (
                <input
                  type={f.type || "text"}
                  value={form[f.name]}
                  onChange={(e) => set(f.name, e.target.value)}
                  onBlur={isEmail ? () => setEmailHint(form.work_email.trim() ? workEmailError(form.work_email) || "" : "") : undefined}
                  placeholder={f.placeholder}
                  className={isEmail && emailHint ? EMAIL_BAD_CLASS : INPUT_CLASS}
                  required={f.required !== false}
                />
              )}
              {isEmail &&
                (emailHint ? (
                  <p className="text-xs text-rose-400">{emailHint}</p>
                ) : (
                  f.hint && <p className="text-xs text-slate-500">{f.hint}</p>
                ))}
            </div>
          );
        })}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:shadow-indigo-500/50 disabled:opacity-70"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending...
          </>
        ) : (
          <>
            {submitLabel} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </>
        )}
      </button>
      <p className="text-center text-xs text-slate-500">We do not share your details.</p>
    </form>
  );
}