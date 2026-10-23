import LandingLayout from "@/components/landing/LandingLayout";
import PageHero from "@/components/landing/PageHero";
import CtaBand from "@/components/landing/CtaBand";
import { Reveal } from "@/components/landing/primitives";

const PARTNER_TYPES = [
  {
    title: "Consulting Partners",
    desc: "Privacy, risk and compliance advisors guiding enterprises from assessment to operational implementation.",
    earn: "Referral commission on every client introduced",
  },
  {
    title: "Technology Partners",
    desc: "Product teams embedding JShield's consent, breach and audit capabilities into their own platforms.",
    earn: "Revenue share on co-sold and integrated deals",
  },
  {
    title: "System Integrators",
    desc: "Implementation teams connecting JShield to enterprise estates such as CRM, HRMS and core systems.",
    earn: "Reseller margin plus your own implementation fees",
  },
  {
    title: "Law Firms and Advisory",
    desc: "Legal and regulatory advisors who need audit-ready evidence packs behind their client opinions.",
    earn: "Referral fee for every client introduction",
  },
  {
    title: "Resellers and Distributors",
    desc: "Regional and vertical specialists carrying DPDP readiness into sectors where it has reached board priority.",
    earn: "Wholesale pricing with volume-based discount tiers",
  },
];

const ADVANTAGES = [
  {
    title: "Durable services revenue",
    desc: "Build recurring income from support, training and advisory work wrapped around every JShield deployment.",
  },
  {
    title: "A complete platform to stand behind",
    desc: "Eleven connected modules cover the full DPDP lifecycle, so your recommendations never hit a capability gap.",
  },
  {
    title: "Dedicated partner enablement",
    desc: "Technical training, co-selling support, marketing collateral and a partner success manager assigned to you.",
  },
  {
    title: "Simple commercials",
    desc: "One clear price keeps the client's entry barrier low, while your revenue comes from implementation, training and advisory.",
  },
];

const STEPS = [
  { title: "Apply", desc: "Send your practice details through the contact page and tell us how you work with clients." },
  { title: "Get reviewed", desc: "Our partnerships team reviews every application within two business days." },
  { title: "Start earning", desc: "Complete onboarding, then run your first co-sold engagement with our support behind you." },
];

export default function PartnerProgram() {
  return (
    <LandingLayout>
      <PageHero
        eyebrow="Partner program"
        title="Build a compliance practice with JShield"
        subtitle="Help Indian companies meet the data law and build a steady services revenue line alongside ours. Five partner tracks, each with a clear way to earn."
        primary={{ label: "Apply to become a partner", to: "/contact" }}
        secondary={{ label: "Start free trial", to: "/trial" }}
      />

      <section className="bg-slate-950 py-12">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="max-w-2xl">
            <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl text-pretty">
              Who we partner with
            </h2>
            <p className="mt-3 text-lg text-slate-400">
              Five partnership tracks, each with a clear commercial model.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {PARTNER_TYPES.map((p) => (
              <Reveal key={p.title} className="border-t border-white/10 pt-5">
                <h3 className="text-base font-semibold text-white">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{p.desc}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-indigo-400">{p.earn}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900/50 py-12">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="max-w-2xl">
            <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl text-pretty">
              Why partners choose JShield
            </h2>
            <p className="mt-3 text-lg text-slate-400">
              A partnership designed around your economics, not just ours.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {ADVANTAGES.map((a) => (
              <Reveal key={a.title} className="border-t border-white/10 pt-5">
                <h3 className="text-base font-semibold text-white">{a.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{a.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-12">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="max-w-2xl">
            <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl text-pretty">
              How it works
            </h2>
            <p className="mt-3 text-lg text-slate-400">From application to first engagement in three steps.</p>
          </Reveal>
          <div className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-3">
            {STEPS.map((s) => (
              <Reveal key={s.title} className="border-t border-white/10 pt-5">
                <h3 className="text-base font-semibold text-white">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{s.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Partner with the platform built for India's data law"
        subtitle="Tell us about your practice and we will shape a track around it."
        primary={{ label: "Apply to become a partner", to: "/contact" }}
        secondary={{ label: "Check your readiness", to: "/assessment" }}
      />
    </LandingLayout>
  );
}