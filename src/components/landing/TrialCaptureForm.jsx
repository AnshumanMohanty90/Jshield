import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { workEmailError } from "@/lib/workEmail";

const INPUT_CLASS =
  "h-11 w-full rounded-lg border border-white/10 bg-slate-900 px-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20";

export default function TrialCaptureForm({ source = "Trial Page", score = null, tier = "", summary = "" }) {
  const [form, setForm] = useState({ full_name: "", work_email: "", company_name: "", designation: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [emailHint, setEmailHint] = useState("");
  const [done, setDone] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    const missing = Object.values(form).some((v) => !v.trim());
    const emailProblem = form.work_email.trim() ? workEmailError(form.work_email) : "Enter your work email.";
    setEmailHint(emailProblem || "");
    if (missing || emailProblem) {
      if (missing) setError("Please fill in all fields so our team can activate your trial.");
      return;
    }
    setSubmitting(true);
    try {
      const payload = { ...form, source };
      if (score != null) payload.score = score;
      if (tier) payload.tier = tier;
      if (summary) payload.summary = summary;
      await base44.functions.invoke("submitTrialRequest", payload);
      setDone(true);
    } catch (err) {
      const message = err?.response?.data?.error || err?.data?.error || err?.message || "";
      if (/work email|personal/i.test(message)) {
        setEmailHint(message);
      } else {
        setError(message || "Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-5 py-5 text-sm leading-relaxed text-emerald-300">
        Thank you. Your trial request is with our team. We will reach out on your work email to activate your trial
        within one business day.
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      {error && <div className="rounded-lg bg-rose-500/10 px-4 py-3 text-sm text-rose-300">{error}</div>}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-300">Full name</label>
          <input
            type="text"
            value={form.full_name}
            onChange={(e) => setForm({ ...form, full_name: e.target.value })}
            placeholder="Priya Sharma"
            className={INPUT_CLASS}
            required
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-300">Designation</label>
          <input
            type="text"
            value={form.designation}
            onChange={(e) => setForm({ ...form, designation: e.target.value })}
            placeholder="Data Protection Officer"
            className={INPUT_CLASS}
            required
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-300">Work email</label>
        <input
          type="email"
          value={form.work_email}
          onChange={(e) => {
            setForm({ ...form, work_email: e.target.value });
            if (emailHint) setEmailHint(workEmailError(e.target.value) || "");
          }}
          onBlur={() => setEmailHint(form.work_email.trim() ? workEmailError(form.work_email) || "" : "")}
          placeholder="you@company.com"
          className={`h-11 w-full rounded-lg border px-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition ${
            emailHint
              ? "border-rose-400/50 bg-rose-500/10 focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20"
              : "border-white/10 bg-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          }`}
          required
        />
        {emailHint ? (
          <p className="text-xs text-rose-400">{emailHint}</p>
        ) : (
          <p className="text-xs text-slate-500">Use your work email. Personal addresses are not accepted.</p>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-300">Company name</label>
        <input
          type="text"
          value={form.company_name}
          onChange={(e) => setForm({ ...form, company_name: e.target.value })}
          placeholder="Acme Pvt Ltd"
          className={INPUT_CLASS}
          required
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:shadow-indigo-500/50 disabled:opacity-70"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
          </>
        ) : (
          <>
            Request trial activation <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </>
        )}
      </button>
      <p className="text-center text-xs text-slate-500">
        Our team activates every trial personally. No credit card required.
      </p>
    </form>
  );
}