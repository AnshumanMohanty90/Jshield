import { AnimatedNumber, Reveal } from "./primitives";

const STATS = [
  { value: 11, suffix: "", label: "Connected compliance modules" },
  { value: 100, suffix: "%", label: "ROPA coverage target" },
  { value: 72, suffix: "h", label: "Breach notification window" },
  { value: 30, suffix: " days", label: "To audit-ready posture" },
];

export default function Stats() {
  return (
    <section className="bg-slate-950 py-12">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 sm:px-8 lg:grid-cols-4">
        {STATS.map((s) => (
          <Reveal key={s.label} className="text-center">
            <div className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              <AnimatedNumber value={s.value} suffix={s.suffix} />
            </div>
            <div className="mt-2 text-sm text-slate-400">{s.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}