import ShieldLogo from "@/components/ShieldLogo";

export default function BrandLockup({ className = "h-11 w-11", dark = true }) {
  return (
    <span className="flex items-center gap-2.5">
      <ShieldLogo className={className} />
      <span className="flex flex-col leading-none">
        <span
          className={`text-lg font-extrabold tracking-tight ${
            dark ? "text-white" : "text-foreground"
          }`}
        >
          JShield
        </span>
        <span
          className={`mt-1 text-[10px] font-semibold uppercase tracking-[0.25em] ${
            dark ? "text-slate-400" : "text-muted-foreground"
          }`}
        >
          by Jago
        </span>
      </span>
    </span>
  );
}