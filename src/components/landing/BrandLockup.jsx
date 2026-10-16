import { Image } from "@/components/ui/image";

const LOGO_URL =
  "https://media.base44.com/images/public/6abfe638fec4c87c5794805b/310448946_generated_df1a9fe9.png";

export default function BrandLockup({ className = "h-11 w-11" }) {
  return (
    <span className="flex items-center gap-2.5">
      <Image src={LOGO_URL} alt="JShield" fittingType="fit" className={`rounded-lg ${className}`} />
      <span className="flex flex-col leading-none">
        <span className="text-lg font-extrabold tracking-tight text-white">JShield</span>
        <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400">by Jago</span>
      </span>
    </span>
  );
}