import { useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { submitLead } from "@/lib/submitLead";
import { cn } from "@/lib/utils";
import { workEmailError } from "@/lib/workEmail";

export const COMPANY_SIZES = ["1 to 50", "51 to 200", "201 to 500", "501 to 1,000", "Over 1,000"];

const INPUT_CLASS =
  "h-11 w-full rounded-lg border border-white/10 bg-slate-900 px-3 text-sm text-slate-100 placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20";

const AUTOCOMPLETE = {
  name: "name",
  work_email: "email",
  company: "organization",
  designation: "organization-title",
};

function validate(field, value) {
  const v = String(value ?? "").trim();
  if (field.name === "work_email") return workEmailError(v);
  if (field.required !== false && !v) {
    if (field.requiredMessage) return field.requiredMessage;
    if (/\?\s*$/.test(field.label)) return field.type === "select" ? "Please choose an answer." : "Please answer this question.";
    const what = field.label.replace(/\s*\(optional\)$/i, "").toLowerCase();
    return field.type === "select" ? `Please choose your ${what}.` : `Please enter your ${what}.`;
  }
  return "";
}

export default function LeadForm({
  intent,
  sourcePage,
  score = null,
  fields,
  submitLabel,
  thankYou,
  extra = {},
  onDone,
}) {
  const [form, setForm] = useState(() => Object.fromEntries(fields.map((f) => [f.name, ""])));
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  // Honeypot: real visitors never see or fill this field.
  const [honeypot, setHoneypot] = useState("");
  const inputRefs = useRef({});
  const submissionId = useRef("");
  const errorRef = useRef(null);

  const set = (name, value) => {
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: "" }));
  };

  const blur = (field) => {
    setErrors((e) => ({ ...e, [field.name]: validate(field, form[field.name]) }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setFormError("");
    if (honeypot) {
      // Filled by a bot: show the normal thank-you and save nothing.
      setDone(true);
      return;
    }
    const next = Object.fromEntries(fields.map((f) => [f.name, validate(f, form[f.name])]));
    setErrors(next);
    const firstBad = fields.find((f) => next[f.name]);
    if (firstBad) {
      inputRefs.current[firstBad.name]?.focus();
      return;
    }
    setSubmitting(true);
    try {
      const clean = Object.fromEntries(Object.entries(form).map(([k, v]) => [k, typeof v === "string" ? v.trim() : v]));
      if (clean.work_email) clean.work_email = clean.work_email.toLowerCase();
      if (!submissionId.current) submissionId.current = crypto.randomUUID();
      const payload = { intent, source_page: sourcePage, submission_id: submissionId.current, ...clean, ...extra };
      if (score != null) payload.readiness_score = score;
      await submitLead(payload);
      setDone(true);
      onDone?.();
    } catch {
      setFormError("We could not send this. Your details are still here. Please try again or write to");
      window.setTimeout(() => errorRef.current?.focus(), 0);
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="rounded-xl bg-emerald-500/10 px-5 py-5 text-sm leading-relaxed text-emerald-300">
        {thankYou}
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4" noValidate>
      {fields.map((f) => {
        const inputId = `${intent}-${f.name}`;
        const errorId = `${inputId}-error`;
        const error = errors[f.name];
        const fieldProps = {
          id: inputId,
          value: form[f.name],
          onChange: (e) => set(f.name, e.target.value),
          onBlur: () => blur(f),
          "aria-invalid": error ? "true" : undefined,
          "aria-describedby": error ? errorId : undefined,
          autoComplete: AUTOCOMPLETE[f.name],
          required: f.required !== false,
          maxLength: f.type === "textarea" ? 2000 : 160,
          ref: (el) => (inputRefs.current[f.name] = el),
        };
        return (
          <div key={f.name} className="space-y-1.5">
            <label htmlFor={inputId} className="text-sm font-medium text-slate-300">
              {f.label}
            </label>
            {f.type === "select" ? (
              <select
                {...fieldProps}
                className={cn(INPUT_CLASS, error && "border-rose-400/60 bg-rose-500/10 focus:border-rose-400 focus:ring-rose-500/20")}
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
                {...fieldProps}
                rows={f.rows || 4}
                placeholder={f.placeholder}
                className={cn(
                  INPUT_CLASS,
                  "resize-none py-3",
                  error && "border-rose-400/60 bg-rose-500/10 focus:border-rose-400 focus:ring-rose-500/20"
                )}
              />
            ) : (
              <input
                {...fieldProps}
                type={f.type || "text"}
                placeholder={f.placeholder}
                className={cn(INPUT_CLASS, error && "border-rose-400/60 bg-rose-500/10 focus:border-rose-400 focus:ring-rose-500/20")}
              />
            )}
            {error ? (
              <p id={errorId} role="alert" className="text-sm text-rose-400">
                {error}
              </p>
            ) : (
              f.name === "work_email" &&
              f.hint && <p className="text-xs text-slate-400">{f.hint}</p>
            )}
          </div>
        );
      })}

      {/* Honeypot field: hidden from people and screen readers, tempting to bots. */}
      <input
        type="text"
        name="company_website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="pointer-events-none absolute -left-[9999px] -top-[9999px] h-0 w-0 opacity-0"
      />

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-70"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending...
          </>
        ) : (
          submitLabel
        )}
      </button>
      {formError && (
        <p ref={errorRef} tabIndex={-1} role="alert" className="text-sm text-rose-400 outline-none">
          {formError}{" "}
          <a href="mailto:contact@jagoai.com" className="whitespace-nowrap underline underline-offset-2">
            contact@jagoai.com
          </a>
          .
        </p>
      )}
      <p className="text-center text-xs text-slate-400">We do not share your details.</p>
    </form>
  );
}
