import HeroSection from "@/app/components/HeroSection";
import HowItWorks from "@/app/components/HowItWorks";
import Testimonials from "@/app/components/Testimonials";
import Footer from "@/app/components/Footer";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <Testimonials />
      <Footer />
    </>
  );
}