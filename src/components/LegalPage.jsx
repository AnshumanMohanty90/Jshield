import { Link } from "react-router-dom";
import LandingLayout from "@/components/landing/LandingLayout";
import PageHero from "@/components/landing/PageHero";
import CTASection from "@/components/landing/CTASection";
import usePageTitle from "@/hooks/usePageTitle";

export default function LegalPage({ title }) {
  usePageTitle(`${title} | JShield`);
  return (
    <LandingLayout>
      <PageHero eyebrow="Legal" title={title} subtitle="This page is being updated." />
      <section className="bg-slate-950 py-10 sm:py-16">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <p className="max-w-[68ch] text-[17px] leading-[1.6] text-slate-200 text-pretty">
            For a copy of this document,{" "}
            <Link to="/contact" className="underline-offset-4 hover:text-white hover:underline">
              write to us
            </Link>
            .
          </p>
        </div>
      </section>
      <CTASection />
    </LandingLayout>
  );
}