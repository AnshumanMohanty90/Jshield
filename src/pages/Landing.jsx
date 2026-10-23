import LandingLayout from "@/components/landing/LandingLayout";
import Hero from "@/components/landing/Hero";
import WhyMatters from "@/components/landing/WhyMatters";
import ModuleShowcase from "@/components/landing/ModuleShowcase";
import Industries from "@/components/landing/Industries";
import HowItWorks from "@/components/landing/HowItWorks";
import BetterWithJago from "@/components/landing/BetterWithJago";
import PriceSection from "@/components/landing/PriceSection";
import CTASection from "@/components/landing/CTASection";

export default function Landing() {
  return (
    <LandingLayout>
      <Hero />
      <WhyMatters />
      <ModuleShowcase />
      <Industries />
      <HowItWorks />
      <BetterWithJago />
      <PriceSection />
      <CTASection />
    </LandingLayout>
  );
}