import { Link } from "react-router-dom";
import Section from "./Section";
import SectionHeading from "./SectionHeading";
import { Reveal } from "./primitives";

const FRAMEWORKS = [
  {
    name: "DPDP Act",
    where: "India",
    desc: "Notices, consent records, customer requests and breach reporting under India's data law.",
    to: "/dpdp-act",
    cta: "Read the DPDP Act guide",
  },
  {
    name: "GDPR",
    where: "EU and UK",
    desc: "Record of processing, impact assessments, rights requests, breaches and data transfers.",
    to: "/gdpr",
    cta: "See how JShield runs GDPR",
  },
  {
    name: "SOC 2",
    where: "Security assurance",
    desc: "Controls mapped to the Trust Services Criteria, with evidence collected through the audit period.",
    to: "/soc-2",
    cta: "See how JShield runs SOC 2",
  },
];

export default function Frameworks() {
  return (
    <Section id="frameworks">
      <SectionHeading
        label="One control, many frameworks"
        title="Run the DPDP Act, GDPR and SOC 2 from one place."
        intro="Access control, vendor risk, incident response, notices and consent show up in all three. JShield tracks each control once and links its evidence to every framework that needs it."
      />
      <Reveal className="mt-8 grid gap-x-10 gap-y-8 md:grid-cols-3">
        {FRAMEWORKS.map((f) => (
          <Link key={f.name} to={f.to} className="row-hover group -mx-3 block rounded-lg px-3 py-3">
            <p className="text-[14px] font-medium uppercase tracking-wider text-slate-400">{f.where}</p>
            <h3 className="mt-2 text-white">{f.name}</h3>
            <p className="mt-2 text-[18px] leading-[1.6] text-slate-300 text-pretty">{f.desc}</p>
            <span className="mt-3 inline-flex min-h-[44px] items-center font-semibold text-indigo-300 group-hover:text-white">
              {f.cta}
            </span>
          </Link>
        ))}
      </Reveal>
    </Section>
  );
}
