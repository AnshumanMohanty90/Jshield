import LandingLayout from "@/components/landing/LandingLayout";
import PageHero from "@/components/landing/PageHero";
import CtaBand from "@/components/landing/CtaBand";
import { Reveal } from "@/components/landing/primitives";
import { Check, X } from "lucide-react";

const APPLIES = [
  "Customer, employee or patient records held in any computer, application or website",
  "Details collected on paper first, then typed or photographed into a digital system",
  "Organizations outside India that offer goods or services to people in India online",
];

const EXEMPT = [
  "Information a person has chosen to make public themselves",
  "Purely personal or household use of data",
  "Processing needed to enforce a legal right or comply with a court order",
  "Defined government functions such as national security, under prescribed safeguards",
];

const ROLES = [
  { title: "Data Principal", desc: "The individual the data belongs to. The Act restores their say over how it is used." },
  { title: "Data Fiduciary", desc: "Your organization. It decides why and how personal data is processed, and answers for it." },
  { title: "Significant Data Fiduciary", desc: "A fiduciary notified as significant. It carries additional duties such as impact assessments and audits." },
  { title: "Data Processor", desc: "Vendors and platforms that process data on your instructions. You remain accountable for them." },
  { title: "Consent Manager", desc: "A single accountable interface through which principals review and manage the consents they have given." },
  { title: "Data Protection Board", desc: "The digital-first regulator. It fields complaints, runs inquiries and imposes penalties." },
];

const OBLIGATIONS = [
  { title: "Notice", desc: "Tell people what you collect, why, and how to exercise their rights before you collect." },
  { title: "Consent", desc: "Take a clear, specific and informed yes. No pre-ticked boxes, no bundled purposes." },
  { title: "Purpose limitation", desc: "Data collected for one purpose cannot quietly become data used for another." },
  { title: "Accuracy", desc: "Keep records correct and complete enough for the purpose they serve." },
  { title: "Retention and erasure", desc: "Erase personal data once the purpose is served and consent is withdrawn or expires." },
  { title: "Security safeguards", desc: "Protect data with reasonable technical and operational controls, including for children." },
  { title: "Breach notification", desc: "Inform affected principals and report to the Board without delay when data is compromised." },
  { title: "Principal rights", desc: "Honor requests for access, correction, erasure and grievance redressal on deadline." },
  { title: "Children's data", desc: "Process a child's data only with verifiable parental consent, and never track or target them." },
  { title: "Grievance redressal", desc: "Publish a grievance officer and respond to principals within the prescribed timelines." },
];

const DATES = [
  { year: "2017", text: "The Supreme Court holds privacy to be a fundamental right, setting the constitutional foundation." },
  { year: "August 2023", text: "The DPDP Act receives Presidential assent as India's first dedicated digital personal data law." },
  { year: "November 2025", text: "The DPDP Rules are notified. The compliance clock starts on a staggered commencement schedule." },
  { year: "Ahead", text: "Several substantive obligations become enforceable in phases, roughly eighteen months from notification." },
];

export default function DPDPAct() {
  return (
    <LandingLayout>
      <PageHero
        eyebrow="The law, explained"
        title="The DPDP Act, in the language of operators"
        subtitle="The Digital Personal Data Protection Act, 2023 governs how every organization in India collects, uses, stores and shares personal data. Here is what it expects of you, without the legal fog."
        primary={{ label: "Take the DPDP readiness assessment", to: "/assessment" }}
        secondary={{ label: "See how Jaguard solves it", to: "/#solution" }}
      />

      <section className="bg-slate-950 py-12">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="max-w-2xl">
            <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl text-pretty">
              Does it apply to you?
            </h2>
            <p className="mt-3 text-lg text-slate-400">
              Almost certainly. If your organization keeps personal details in any digital form, the Act covers it. There is no
              small business exemption, and enforcement begins with a single complaint.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-emerald-400">Covered by the law</h3>
              <ul className="mt-4 space-y-3">
                {APPLIES.map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-300">
                    <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                      <Check className="h-3 w-3" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-500">Outside its scope</h3>
              <ul className="mt-4 space-y-3">
                {EXEMPT.map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-300">
                    <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-white/10 text-slate-400">
                      <X className="h-3 w-3" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-900/50 py-12">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="max-w-2xl">
            <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl text-pretty">
              Who is who under the Act
            </h2>
            <p className="mt-3 text-lg text-slate-400">Six roles carry the entire law. Every obligation maps to one of them.</p>
          </Reveal>
          <div className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {ROLES.map((r) => (
              <Reveal key={r.title} className="border-t border-white/10 pt-5">
                <h3 className="text-base font-semibold text-white">{r.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{r.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-12">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="max-w-2xl">
            <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl text-pretty">
              What the Act expects of you
            </h2>
            <p className="mt-3 text-lg text-slate-400">
              Ten obligations define a compliant data practice. Each one is a promise to the people whose data you hold.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {OBLIGATIONS.map((o, i) => (
              <Reveal key={o.title} className="border-t border-white/10 pt-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-white">{o.title}</h3>
                  <span className="text-xs text-slate-600">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{o.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900/50 py-12">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="max-w-2xl">
            <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl text-pretty">
              The timeline that matters
            </h2>
            <p className="mt-3 text-lg text-slate-400">
              The dates below follow the official commencement schedule. Jaguard's weekwise readiness plan is a recommended
              preparation sequence, separate from the statutory calendar.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {DATES.map((d) => (
              <Reveal key={d.year} className="border-t border-white/10 pt-5">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-indigo-400">{d.year}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{d.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-12">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="max-w-2xl">
            <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl text-pretty">
              What non-compliance costs
            </h2>
            <p className="mt-3 text-lg text-slate-400">
              The Data Protection Board sets penalties after inquiry. The ceiling is high enough to end most businesses.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-900 p-8">
              <div className="text-4xl font-bold tracking-tight text-white">₹250 crore</div>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                The maximum penalty for failing to protect personal data with adequate security safeguards.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900 p-8">
              <div className="text-4xl font-bold tracking-tight text-white">₹50 crore</div>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                The maximum for most other violations, from consent failures to neglected principal rights.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Turn the law into an operating plan"
        subtitle="Score your readiness against every obligation in fourteen questions, then let Jaguard close the gaps."
        primary={{ label: "Take the DPDP readiness assessment", to: "/assessment" }}
        secondary={{ label: "Talk to sales", to: "/contact" }}
      />
    </LandingLayout>
  );
}