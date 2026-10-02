const LOGOS = ["VeriFintech", "Nova Health", "Bharat Retail", "Skyline Bank", "OrbitMart", "Pinnacle HR"];

export default function TrustBar() {
  return (
    <section className="border-b border-slate-200 bg-white py-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-400">
          Trusted by data protection teams across India
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {LOGOS.map((l) => (
            <span key={l} className="font-mono text-sm font-semibold tracking-tight text-slate-400">
              {l}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}