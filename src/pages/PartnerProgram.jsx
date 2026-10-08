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
    desc: "Product teams embedding Jaguard's consent, breach and audit capabilities into their own platforms.",
    earn: "Revenue share on co-sold and integrated deals",
  },
  {
    title: "System Integrators",
    desc: "Implementation teams connecting Jaguard to enterprise estates such as CRM, HRMS and core systems.",
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
    desc: "Build recurring income from support, training and advisory work wrapped around every Jaguard deployment.",
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
    title: "Zero platform licensing cost for clients",
    desc: "Your economics come from implementation, training and advisory, keeping the client's entry barrier low.",
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
        title="Build a DPDP practice with Jaguard"
        subtitle="Join the ecosystem of consultants, technology teams and advisors helping Indian enterprises become compliant, while building a high-margin services revenue line on India's fastest-growing regulatory mandate."
        primary={{ label: "Apply to become a partner", to: "/contact" }}
        secondary={{ label: "Explore the solution", to: "/#solution" }}
      />

      <section className="bg-slate-950 py-12">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="max-w-2xl">
            <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl text-balance">
              Who we partner with
            </h2>
            <p className="mt-3 text-lg text-slate-400">
              Five partnership tracks, each with a clear commercial model.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {PARTNER_TYPES.map((p, i) => (
              <Reveal key={p.title} className="border-t border-white/10 pt-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-white">{p.title}</h3>
                  <span className="text-xs text-slate-600">{String(i + 1).padStart(2, "0")}</span>
                </div>
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
            <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl text-balance">
              Why partners choose Jaguard
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
            <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl text-balance">
              How it works
            </h2>
            <p className="mt-3 text-lg text-slate-400">From application to first engagement in three steps.</p>
          </Reveal>
          <div className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} className="border-t border-white/10 pt-5">
                <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">Step {i + 1}</span>
                <h3 className="mt-1 text-base font-semibold text-white">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{s.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Partner with a platform built for India's privacy mandate"
        subtitle="Tell us about your practice and we will shape a track around it."
        primary={{ label: "Apply to become a partner", to: "/contact" }}
        secondary={{ label: "Take the readiness assessment", to: "/assessment" }}
      />
    </LandingLayout>
  );
}