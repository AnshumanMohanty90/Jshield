import LandingLayout from "@/components/landing/LandingLayout";
import Hero from "@/components/landing/Hero";
import TrustBar from "@/components/landing/TrustBar";
import Features from "@/components/landing/Features";
import ModuleShowcase from "@/components/landing/ModuleShowcase";
import Stats from "@/components/landing/Stats";
import HowItWorks from "@/components/landing/HowItWorks";
import Testimonials from "@/components/landing/Testimonials";
import CTASection from "@/components/landing/CTASection";

export default function Landing() {
  return (
    <LandingLayout>
      <Hero />
      <TrustBar />
      <Features />
      <ModuleShowcase />
      <Stats />
      <HowItWorks />
      <Testimonials />
      <CTASection />
    </LandingLayout>
  );
}