import { CtaPrimary, CtaSecondary } from "./Buttons";

export default function PageHero({ eyebrow, title, subtitle }) {
  return (
    <section className="bg-slate-950 pb-14 pt-32 lg:pb-[88px] lg:pt-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {eyebrow && <p className="text-[16px] font-semibold text-indigo-400">{eyebrow}</p>}
        <h1 className="mt-3 font-bold leading-[1.1] tracking-tight text-white text-balance">{title}</h1>
        {subtitle && (
          <p className="mt-4 max-w-[68ch] text-[17px] leading-[1.6] text-slate-200 text-pretty">{subtitle}</p>
        )}
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <CtaPrimary to="/assessment">Check your readiness</CtaPrimary>
          <CtaSecondary to="/trial">Start free trial</CtaSecondary>
        </div>
      </div>
    </section>
  );
}