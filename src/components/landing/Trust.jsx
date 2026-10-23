import { Link } from "react-router-dom";
import { Reveal } from "./primitives";

const ITEMS = [
  { title: "Stored in India", desc: "Your data is stored in India." },
  { title: "Encrypted", desc: "Encrypted in transit and at rest." },
  { title: "Logged", desc: "Every action is recorded and cannot be changed later." },
  { title: "Certification", desc: "ISO 27001 and SOC 2 certification under way." },
];

export default function Trust() {
  return (
    <section className="bg-slate-950 py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">Trust</span>
          <h2 className="mt-3 font-bold leading-[1.1] tracking-tight text-white text-balance">
            We hold your data to the same rules we help you meet.
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.05} className="border-t border-white/10 pt-5">
              <h3 className="font-semibold text-white">{t.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{t.desc}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1} className="mt-8">
          <Link
            to="/security"
            className="inline-flex min-h-[44px] items-center text-sm text-slate-200 underline-offset-4 hover:text-white hover:underline"
          >
            Read about security
          </Link>
        </Reveal>
      </div>
    </section>
  );
}