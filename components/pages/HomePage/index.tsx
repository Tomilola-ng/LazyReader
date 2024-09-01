import Header from "@/components/Header";
import Footer from "@/components/Footer";

import HeroSection from "./Hero";
import FeaturesSection from "./Features";
import AreYouReady from "./AreYouReady";
import FAQs from "./FAQs";

export default function HomePage() {
  return (
    <>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <FAQs />
      <AreYouReady />
      <Footer />
    </>
  );
}
