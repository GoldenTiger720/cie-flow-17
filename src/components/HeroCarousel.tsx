import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

// Import hero images
import heroStudents from "@/assets/hero-students-digital.jpg";
import heroIdCard from "@/assets/hero-id-card.jpg";
import heroCampus from "@/assets/hero-campus.jpg";
import heroSecurity from "@/assets/hero-security.jpg";
import { useTheme } from "@/contexts/ThemeContext";

const slides = [
  {
    image: heroStudents,
    title: {
      pt: "Carteira de Identificação Estudantil Digital",
      en: "Digital Student Identification Card", 
      es: "Tarjeta de Identificación Estudiantil Digital"
    },
    subtitle: {
      pt: "Sistema completo para geração e gestão de CIEs conforme Lei 12.933/2013",
      en: "Complete system for CIE generation and management according to Law 12.933/2013",
      es: "Sistema completo para generación y gestión de CIE según Ley 12.933/2013"
    }
  },
  {
    image: heroIdCard,
    title: {
      pt: "Tecnologia Avançada de Segurança",
      en: "Advanced Security Technology",
      es: "Tecnología Avanzada de Seguridad"
    },
    subtitle: {
      pt: "Certificados X.509, QR Codes e chaves de acesso para máxima autenticidade",
      en: "X.509 certificates, QR codes and access keys for maximum authenticity",
      es: "Certificados X.509, códigos QR y claves de acceso para máxima autenticidad"
    }
  },
  {
    image: heroCampus,
    title: {
      pt: "Solução Completa para Universidades",
      en: "Complete Solution for Universities",
      es: "Solución Completa para Universidades"
    },
    subtitle: {
      pt: "Plataforma integrada com loja online e gestão automatizada de pedidos",
      en: "Integrated platform with online store and automated order management",
      es: "Plataforma integrada con tienda online y gestión automatizada de pedidos"
    }
  },
  {
    image: heroSecurity,
    title: {
      pt: "Conformidade Legal Garantida",
      en: "Guaranteed Legal Compliance",
      es: "Cumplimiento Legal Garantizado"
    },
    subtitle: {
      pt: "100% em conformidade com a legislação brasileira e padrões ICP-Brasil",
      en: "100% compliant with Brazilian legislation and ICP-Brasil standards",
      es: "100% conforme con la legislación brasileña y estándares ICP-Brasil"
    }
  }
];

export const HeroCarousel = () => {
  const { language } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Carousel */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 smooth-transition duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title[language]}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-accent/40" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              {slides[currentSlide].title[language]}
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed">
              {slides[currentSlide].subtitle[language]}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90 hero-shadow bounce-transition text-lg px-8 py-4"
              >
                {language === "pt" && "Começar Agora"}
                {language === "en" && "Get Started"}
                {language === "es" && "Empezar Ahora"}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4 smooth-transition"
              >
                {language === "pt" && "Saiba Mais"}
                {language === "en" && "Learn More"}
                {language === "es" && "Saber Más"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={prevSlide}
          className="text-white hover:bg-white/20"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleAutoPlay}
          className="text-white hover:bg-white/20"
        >
          {isAutoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={nextSlide}
          className="text-white hover:bg-white/20"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full smooth-transition ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};