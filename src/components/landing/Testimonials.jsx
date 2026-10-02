import { Reveal } from "./primitives";
import { Star } from "lucide-react";

const QUOTES = [
  {
    quote: "We replaced three spreadsheets and a shared drive with PrivGuard. Our ROPA is finally living documentation.",
    name: "Anita Rao",
    role: "DPO, VeriFintech",
    initials: "AR",
  },
  {
    quote: "The breach SLA tracking alone justified the rollout. We know exactly where we stand against the 72-hour window.",
    name: "Karan Mehta",
    role: "Head of Privacy, Nova Health",
    initials: "KM",
  },
  {
    quote: "Consent artifacts with cryptographic hashes made our last audit the smoothest I've ever run.",
    name: "Priya Nair",
    role: "Compliance Lead, Bharat Retail",
    initials: "PN",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Privacy teams sleep better with PrivGuard
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {QUOTES.map((q, i) => (
            <Reveal key={q.name} delay={i * 0.08} className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-700">"{q.quote}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-sky-500 text-xs font-semibold text-white">
                  {q.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">{q.name}</div>
                  <div className="text-xs text-slate-500">{q.role}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}