import { useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
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
  if (field.required !== false && !v) return "Please fill in this field.";
  return "";
}

export default function LeadForm({ intent, sourcePage, score = null, fields, submitLabel, thankYou, extra = {} }) {
  const [form, setForm] = useState(() => Object.fromEntries(fields.map((f) => [f.name, ""])));
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const inputRefs = useRef({});

  const set = (name, value) => {
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: "" }));
  };

  const blur = (field) => {
    setErrors((e) => ({ ...e, [field.name]: validate(field, form[field.name]) }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setFormError("");
    const next = Object.fromEntries(fields.map((f) => [f.name, validate(f, form[f.name])]));
    setErrors(next);
    const firstBad = fields.find((f) => next[f.name]);
    if (firstBad) {
      inputRefs.current[firstBad.name]?.focus();
      return;
    }
    setSubmitting(true);
    try {
      const payload = { intent, source_page: sourcePage, ...form, ...extra };
      if (score != null) payload.readiness_score = score;
      await base44.functions.invoke("captureLead", payload);
      setDone(true);
    } catch {
      setFormError("Something went wrong. Please try again in a moment.");
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
    <form onSubmit={submit} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((f) => {
          const fullWidth = f.type === "textarea" || f.full;
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
            ref: (el) => (inputRefs.current[f.name] = el),
          };
          return (
            <div key={f.name} className={`space-y-1.5 ${fullWidth ? "sm:col-span-2" : ""}`}>
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
                <p id={errorId} className="text-xs text-rose-400">
                  {error}
                </p>
              ) : (
                f.name === "work_email" &&
                f.hint && <p className="text-xs text-slate-400">{f.hint}</p>
              )}
            </div>
          );
        })}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="group inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:shadow-indigo-500/50 disabled:opacity-70"
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
        <p role="alert" className="text-xs text-rose-400">
          {formError}
        </p>
      )}
      <p className="text-center text-xs text-slate-400">We do not share your details.</p>
    </form>
  );
}