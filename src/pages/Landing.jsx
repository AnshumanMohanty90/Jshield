import LandingLayout from "@/components/landing/LandingLayout";
import Hero from "@/components/landing/Hero";
import WhyMatters from "@/components/landing/WhyMatters";
import ModuleShowcase from "@/components/landing/ModuleShowcase";
import HowItWorks from "@/components/landing/HowItWorks";
import Industries from "@/components/landing/Industries";
import Frameworks from "@/components/landing/Frameworks";
import Trust from "@/components/landing/Trust";
import BetterWithJago from "@/components/landing/BetterWithJago";
import PriceSection from "@/components/landing/PriceSection";
import CTASection from "@/components/landing/CTASection";
import usePageTitle from "@/hooks/usePageTitle";

export default function Landing() {
  usePageTitle("JShield | Data protection compliance, from the DPDP Act to GDPR", "JShield helps companies meet the DPDP Act, GDPR and SOC 2: record consent, keep a live record of personal data and report breaches on time, with proof ready for any audit.");
  return (
    <LandingLayout>
      <Hero />
      <WhyMatters />
      <ModuleShowcase />
      <HowItWorks />
      <Frameworks />
      <Industries />
      <Trust />
      <BetterWithJago />
      <PriceSection />
      <CTASection />
    </LandingLayout>
  );
}