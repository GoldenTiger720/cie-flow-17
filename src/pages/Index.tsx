import React from "react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Navbar } from "@/components/Navbar";
import { HeroCarousel } from "@/components/HeroCarousel";
import { FeaturesSection } from "@/components/FeaturesSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { WaterDropletBackground } from "@/components/WaterDropletBackground";

const Index = () => {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
};

export default Index;
