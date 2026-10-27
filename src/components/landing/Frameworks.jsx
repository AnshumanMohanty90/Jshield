import { useState } from "react";
import { Link } from "react-router-dom";
import { CtaPrimary, CtaSecondary } from "./Buttons";
import Section from "./Section";
import SectionHeading from "./SectionHeading";
import { Reveal } from "./primitives";

const FRAMEWORKS = [
  {
    name: "DPDP Act",
    where: "India",
    desc: "Notices, consent records, customer requests and breach reports under India's law.",
    to: "/dpdp-act",
    cta: "Read the DPDP Act guide",
    q: "Do you handle personal data in digital form in India, or of people in India?",
    yes: "Likely applies to you",
    no: "Probably not required. Check with your adviser.",
  },
  {
    name: "GDPR",
    where: "EU and UK",
    desc: "Data records, risk reviews, customer requests, breaches and transfers out of Europe.",
    to: "/gdpr",
    cta: "Read the GDPR guide",
    q: "Are you based in the EU or UK, or do you sell to or track people there?",
    yes: "Likely applies to you",
    no: "Probably not required. Check with your adviser.",
  },
  {
    name: "SOC 2",
    where: "Security assurance",
    desc: "Security controls mapped to SOC 2, with evidence collected as you work.",
    to: "/soc-2",
    cta: "Read the SOC 2 guide",
    q: "Do business customers ask for proof of your security before they buy?",
    yes: "Your buyers expect it",
    no: "Optional for now",
  },
];

export default function Frameworks() {
  const [answers, setAnswers] = useState({});
  const set = (name, v) => setAnswers((a) => ({ ...a, [name]: v }));
  const answered = Object.keys(answers).length;
  const laws = ["DPDP Act", "GDPR"].filter((n) => answers[n] === true);
  const soc2 = answers["SOC 2"] === true;
  const applies = soc2 ? [...laws, "SOC 2"] : laws;
  const summary = laws.length
    ? `${laws.join(" and ")} ${laws.length > 1 ? "likely apply" : "likely applies"} to you${soc2 ? ", and your buyers expect SOC 2" : ""}. JShield runs ${applies.length > 1 ? "them" : "it"} from one record.`
    : soc2
      ? "Your buyers expect SOC 2. JShield collects its evidence as you work."
      : "On these answers, none of the three looks required. JShield covers all three if that changes.";

  return (
    <Section id="frameworks">
      <SectionHeading
        label="Which rules apply to you"
        title="One record covers the DPDP Act, GDPR and SOC 2."
        intro="Answer three questions to see which apply to you. A control shared by all three is tracked once."
      />
      <Reveal className="mt-6 grid gap-x-10 gap-y-8 md:grid-cols-3">
        {FRAMEWORKS.map((f) => {
          const a = answers[f.name];
          return (
            <div key={f.name} className="-mx-3 rounded-lg px-3 py-2">
              <p className="text-[14px] font-medium text-slate-300">{f.where}</p>
              <h3 className="mt-2 text-white">{f.name}</h3>
              <p className="mt-3 text-[16px] font-semibold leading-snug text-slate-200 text-pretty">{f.q}</p>
              <div role="group" aria-label={f.q} className="mt-3 flex gap-2">
                {[
                  [true, "Yes"],
                  [false, "No"],
                ].map(([v, label]) => (
                  <button
                    key={label}
                    type="button"
                    aria-pressed={a === v}
                    onClick={() => set(f.name, v)}
                    className={`min-h-[44px] min-w-[72px] rounded-lg border px-4 text-[16px] font-semibold transition-colors ${
                      a === v ? "border-[1.5px] border-indigo-300 bg-indigo-500/30 text-white" : "border-white/40 text-slate-100 hover:border-indigo-300 hover:bg-indigo-500/[0.12]"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <p
                className={`mt-3 min-h-[24px] text-[16px] font-semibold ${a === true ? "text-emerald-300" : "text-slate-300"}`}
                aria-live="polite"
              >
                {a === true ? f.yes : a === false ? f.no : ""}
              </p>
              <p className="mt-1 text-[16px] leading-[1.6] text-slate-200 text-pretty">{f.desc}</p>
              <Link to={f.to} className="mt-2 inline-flex min-h-[44px] items-center font-semibold text-indigo-300 hover:text-white">
                {f.cta}
              </Link>
            </div>
          );
        })}
      </Reveal>
      {answered > 0 && (
        <div className="mt-6 flex flex-col gap-4 rounded-xl bg-white/[0.03] px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[18px] leading-[1.6] text-slate-200 text-pretty">
            {summary}
            <span className="mt-1 block text-[14px] text-slate-300">Indicative only, not legal advice.</span>
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-none">
            {applies.includes("DPDP Act") ? (
              <CtaPrimary to="/assessment">Check your DPDP readiness</CtaPrimary>
            ) : (
              <CtaPrimary to="/trial">Start free trial</CtaPrimary>
            )}
            <CtaSecondary to="/contact?intent=pricing">Get pricing</CtaSecondary>
          </div>
        </div>
      )}
    </Section>
  );
}
