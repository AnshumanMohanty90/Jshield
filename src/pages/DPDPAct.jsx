import LandingLayout from "@/components/landing/LandingLayout";
import PageHero from "@/components/landing/PageHero";
import CtaBand from "@/components/landing/CtaBand";
import { Reveal } from "@/components/landing/primitives";
import usePageTitle from "@/hooks/usePageTitle";

const APPLIES = [
  "Customer, employee or patient records held in any computer, application or website",
  "Details collected on paper first, then typed or photographed into a digital system",
  "Organisations outside India that offer goods or services to people in India online",
];

const EXEMPT = [
  "Information a person has chosen to make public themselves",
  "Purely personal or household use of data",
  "Processing needed to enforce a legal right or comply with a court order",
  "Defined government functions such as national security, under prescribed safeguards",
];

const ROLES = [
  { title: "Data Principal", desc: "The individual the data belongs to. The Act restores their say over how it is used." },
  { title: "Data Fiduciary", desc: "Your organisation. It decides why and how personal data is processed, and answers for it." },
  { title: "Significant Data Fiduciary", desc: "A fiduciary notified as significant. It carries additional duties such as impact assessments and audits." },
  { title: "Data Processor", desc: "Vendors and platforms that process data on your instructions. You remain accountable for them." },
  { title: "Consent Manager", desc: "A single accountable interface through which principals review and manage the consents they have given." },
  { title: "Data Protection Board", desc: "The regulator. It hears complaints, runs inquiries and sets penalties." },
];

const OBLIGATIONS = [
  { title: "Notice", desc: "Tell people what you collect, why, and how to exercise their rights before you collect." },
  { title: "Consent", desc: "Take a clear, specific and informed yes. No pre-ticked boxes, no bundled purposes." },
  { title: "Purpose limitation", desc: "Data collected for one purpose cannot quietly become data used for another." },
  { title: "Accuracy", desc: "Keep records correct and complete enough for the purpose they serve." },
  { title: "Retention and erasure", desc: "Erase personal data once the purpose is served and consent is withdrawn or expires." },
  { title: "Security safeguards", desc: "Protect data with reasonable technical and operational controls, including for children." },
  { title: "Breach notification", desc: "Inform affected principals and report to the Board without delay when data is compromised." },
  { title: "Customer requests", desc: "Answer requests to see, correct or delete their data, and resolve complaints, within the set deadlines." },
  { title: "Children's data", desc: "Process a child's data only with verifiable parental consent, and never track or target them." },
  { title: "Grievance redressal", desc: "Publish a grievance officer and respond to principals within the prescribed timelines." },
];

const DATES = [
  { year: "2017", text: "The Supreme Court holds privacy to be a fundamental right, setting the constitutional foundation." },
  { year: "August 2023", text: "The DPDP Act receives Presidential assent as India's first dedicated digital personal data law." },
  { year: "November 2025", text: "The DPDP Rules are notified. The compliance clock starts on a staggered commencement schedule." },
  { year: "13 MAY 2027", text: "The main duties apply in full." },
];

export default function DPDPAct() {
  usePageTitle("DPDP Act explained | JShield");
  return (
    <LandingLayout>
      <PageHero
        eyebrow="The DPDP Act, explained"
        title="What the law asks of you, in plain words."
        subtitle="The DPDP Act is India's law for personal data. It says what a company may collect, what it must do in return and what it costs to get it wrong. Here is the whole of it, without the legal language."
        primary={{ label: "Check your readiness", to: "/assessment" }}
        secondary={{ label: "See how JShield solves it", to: "/#solution" }}
      />

      <section className="bg-slate-950 py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="max-w-2xl">
            <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl text-pretty">
              Does it apply to you?
            </h2>
            <p className="mt-3 text-lg text-slate-400">
              Almost certainly. If your company keeps customer or employee details in any digital form, the law covers
              it. There is no small business exemption, and enforcement begins with a single complaint.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-x-8 gap-y-10 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-emerald-400">Covered by the law</h3>
              <ul className="mt-4">
                {APPLIES.map((t) => (
                  <li key={t} className="border-t border-white/10 py-3 text-sm leading-relaxed text-slate-300">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-500">Outside its scope</h3>
              <ul className="mt-4">
                {EXEMPT.map((t) => (
                  <li key={t} className="border-t border-white/10 py-3 text-sm leading-relaxed text-slate-300">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-900/50 py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="max-w-2xl">
            <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl text-pretty">
              Who is who under the Act
            </h2>
            <p className="mt-3 text-lg text-slate-400">
              Six roles carry the whole law. Every duty maps to one of them, and you will meet each term below before
              it is used.
            </p>
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

      <section className="bg-slate-950 py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="max-w-2xl">
            <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl text-pretty">
              What the Act expects of you
            </h2>
            <p className="mt-3 text-lg text-slate-400">
              Each duty in the law is a promise to the people whose data you hold.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {OBLIGATIONS.map((o) => (
              <Reveal key={o.title} className="border-t border-white/10 pt-5">
                <h3 className="text-base font-semibold text-white">{o.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{o.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900/50 py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="max-w-2xl">
            <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl text-pretty">
              The timeline that matters
            </h2>
            <p className="mt-3 text-lg text-slate-400">
              These dates follow the official schedule set by the government. The biggest one is 13 May 2027, when the
              rules apply in full.
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

      <section className="bg-slate-950 py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="max-w-2xl">
            <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl text-pretty">
              What non-compliance costs
            </h2>
            <p className="mt-3 text-lg text-slate-400">
              The Data Protection Board, India's data regulator, handles enforcement. Penalties depend on the breach
              and are set after an inquiry.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            <div className="border-t border-white/10 pt-5">
              <div className="text-4xl font-bold tracking-tight text-white">Rs 250 crore</div>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                The maximum penalty for failing to protect personal data with adequate security safeguards.
              </p>
            </div>
            <div className="border-t border-white/10 pt-5">
              <div className="text-4xl font-bold tracking-tight text-white">Rs 50 crore</div>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                The maximum for most other violations, from consent failures to neglected principal rights.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Know where you stand before the deadline."
        subtitle="Fourteen questions, a readiness score and a prioritised action list, in three minutes."
        primary={{ label: "Check your readiness", to: "/assessment" }}
        secondary={{ label: "Start free trial", to: "/trial" }}
      />
    </LandingLayout>
  );
}