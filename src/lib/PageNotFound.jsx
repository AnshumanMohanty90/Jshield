import { Link } from "react-router-dom";
import LandingLayout from "@/components/landing/LandingLayout";
import usePageTitle from "@/hooks/usePageTitle";

export default function PageNotFound() {
  usePageTitle("Page not found | JShield");
  return (
    <LandingLayout>
      <section className="px-5 py-24 sm:py-32">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-[16px] font-semibold text-indigo-300">Page not found</p>
          <h1 className="mt-3 font-bold tracking-tight text-white text-balance">We could not find that page</h1>
          <p className="mt-4 text-[18px] leading-[1.6] text-slate-200 text-pretty">
            The link may be old or mistyped. Start from the home page, or see how JShield helps with the DPDP Act and GDPR.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/" className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 px-6 py-3 text-sm font-semibold text-white">
              Go to the home page
            </Link>
            <Link to="/contact" className="inline-flex min-h-[44px] items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-slate-200 ring-1 ring-white/15 hover:bg-white/5">
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
}
