import { Reveal } from "./primitives";

export default function SectionHeading({ label, title, intro }) {
  return (
    <Reveal className="max-w-2xl">
      {label && <p className="text-[16px] font-semibold text-indigo-300">{label}</p>}
      <h2 className="mt-3 text-white text-balance">{title}</h2>
      {intro && (
        <p className="mt-4 max-w-[68ch] text-[18px] leading-[1.6] text-slate-200 text-pretty">{intro}</p>
      )}
    </Reveal>
  );
}