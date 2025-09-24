import React from "react";
import { Navbar } from "@/components/Navbar";
import { HeroCarousel } from "@/components/HeroCarousel";
import { FeaturesSection } from "@/components/FeaturesSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { WaterDropletBackground } from "@/components/WaterDropletBackground";

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <WaterDropletBackground />
      <Navbar />
      <main className="relative z-10">
        <HeroCarousel />
        <FeaturesSection />
        <AboutSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;
