export default function Section({ id, tone = false, narrow = false, children, className = "" }) {
  return (
    <section id={id} className={`w-full py-10 lg:py-16 ${tone ? "bg-[#0D1428]" : "bg-slate-950"} ${className}`}>
      <div className={`mx-auto px-5 sm:px-8 ${narrow ? "max-w-3xl" : "max-w-7xl"}`}>{children}</div>
    </section>
  );
}