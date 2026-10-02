import LandingLayout from "@/components/landing/LandingLayout";
import Hero from "@/components/landing/Hero";
import WhyMatters from "@/components/landing/WhyMatters";
import Features from "@/components/landing/Features";
import ModuleShowcase from "@/components/landing/ModuleShowcase";
import ReadinessQuiz from "@/components/landing/ReadinessQuiz";
import Industries from "@/components/landing/Industries";
import Stats from "@/components/landing/Stats";
import HowItWorks from "@/components/landing/HowItWorks";
import CTASection from "@/components/landing/CTASection";

export default function Landing() {
  return (
    <LandingLayout>
      <Hero />
      <WhyMatters />
      <Features />
      <ModuleShowcase />
      <ReadinessQuiz />
      <Industries />
      <Stats />
      <HowItWorks />
      <CTASection />
    </LandingLayout>
  );
}