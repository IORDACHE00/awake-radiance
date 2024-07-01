import CTA from "./components/cta";
import HeroSection from "./components/hero-section";
import LandingHeader from "./components/landing-header";
import UVPSection from "./components/uvp-section";

export default function Landing() {
  return (
    <div className="min-h-screen w-full relative">
      <LandingHeader />

      <div className="container">
        <HeroSection />
        <UVPSection />
      </div>

      <CTA />
    </div>
  );
}
