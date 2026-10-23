import { Link } from "react-router-dom";
import LandingLayout from "@/components/landing/LandingLayout";
import PageHero from "@/components/landing/PageHero";
import usePageTitle from "@/hooks/usePageTitle";

export default function LegalPage({ title }) {
  usePageTitle(`${title} | JShield`);
  return (
    <LandingLayout>
      <PageHero eyebrow="Legal" title={title} />
      <section className="bg-slate-950 pb-10 sm:pb-16">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <p className="text-lg leading-relaxed text-slate-300 text-pretty">
            This page is being updated.{" "}
            <Link to="/contact" className="text-slate-100 underline-offset-2 hover:text-white hover:underline">
              Write to us
            </Link>{" "}
            for a copy.
          </p>
        </div>
      </section>
    </LandingLayout>
  );
}