import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Smartphone, 
  Users, 
  FileCheck, 
  CreditCard, 
  Cloud,
  QrCode,
  Lock,
  CheckCircle,
  Star
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export const FeaturesSection = () => {
  const { language } = useTheme();

  const features = [
    {
      icon: Shield,
      title: {
        pt: "Segurança Avançada",
        en: "Advanced Security",
        es: "Seguridad Avanzada"
      },
      description: {
        pt: "Certificados X.509 e assinatura digital conforme padrão ICP-Brasil",
        en: "X.509 certificates and digital signature according to ICP-Brasil standard",
        es: "Certificados X.509 y firma digital según estándar ICP-Brasil"
      }
    },
    {
      icon: QrCode,
      title: {
        pt: "QR Code Inteligente",
        en: "Smart QR Code",
        es: "Código QR Inteligente"
      },
      description: {
        pt: "Códigos QR únicos com validação em tempo real e rastreabilidade",
        en: "Unique QR codes with real-time validation and traceability", 
        es: "Códigos QR únicos con validación en tiempo real y trazabilidad"
      }
    },
    {
      icon: Smartphone,
      title: {
        pt: "Totalmente Responsivo",
        en: "Fully Responsive", 
        es: "Totalmente Responsivo"
      },
      description: {
        pt: "Funciona perfeitamente em qualquer dispositivo com navegador web",
        en: "Works perfectly on any device with a web browser",
        es: "Funciona perfectamente en cualquier dispositivo con navegador web"
      }
    },
    {
      icon: Users,
      title: {
        pt: "Gestão Completa",
        en: "Complete Management",
        es: "Gestión Completa"
      },
      description: {
        pt: "Painel administrativo para organizações estudantis com controle total",
        en: "Administrative panel for student organizations with full control",
        es: "Panel administrativo para organizaciones estudiantiles con control total"
      }
    },
    {
      icon: CreditCard,
      title: {
        pt: "Pagamentos Integrados",
        en: "Integrated Payments",
        es: "Pagos Integrados"
      },
      description: {
        pt: "Sistema de pagamento online seguro e automatizado",
        en: "Secure and automated online payment system",
        es: "Sistema de pago online seguro y automatizado"
      }
    },
    {
      icon: Cloud,
      title: {
        pt: "Infraestrutura em Nuvem",
        en: "Cloud Infrastructure",
        es: "Infraestructura en la Nube"
      },
      description: {
        pt: "Hospedagem segura e escalável com alta disponibilidade",
        en: "Secure and scalable hosting with high availability",
        es: "Hospedaje seguro y escalable con alta disponibilidad"
      }
    }
  ];

  const benefits = [
    {
      title: {
        pt: "Conformidade Legal 100%",
        en: "100% Legal Compliance",
        es: "100% Cumplimiento Legal"
      },
      description: {
        pt: "Totalmente em conformidade com a Lei 12.933/2013",
        en: "Fully compliant with Law 12.933/2013",
        es: "Totalmente conforme con la Ley 12.933/2013"
      }
    },
    {
      title: {
        pt: "Redução de Custos",
        en: "Cost Reduction",
        es: "Reducción de Costos"
      },
      description: {
        pt: "Automatização completa reduz custos operacionais em até 80%",
        en: "Complete automation reduces operational costs by up to 80%",
        es: "La automatización completa reduce los costos operacionales hasta 80%"
      }
    },
    {
      title: {
        pt: "Experiência do Usuário",
        en: "User Experience",
        es: "Experiencia del Usuario"
      },
      description: {
        pt: "Interface intuitiva e processo simplificado para estudantes",
        en: "Intuitive interface and simplified process for students",
        es: "Interfaz intuitiva y proceso simplificado para estudiantes"
      }
    }
  ];

  return (
    <section id="services" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            {language === "pt" && "Recursos Principais"}
            {language === "en" && "Main Features"}
            {language === "es" && "Características Principales"}
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {language === "pt" && "Tecnologia de Ponta para CIEs"}
            {language === "en" && "Cutting-edge Technology for CIEs"}
            {language === "es" && "Tecnología de Vanguardia para CIEs"}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {language === "pt" && "Nossa plataforma oferece todas as funcionalidades necessárias para geração e gestão de Carteiras de Identificação Estudantil em conformidade total com a legislação brasileira."}
            {language === "en" && "Our platform offers all necessary functionalities for Student Identification Card generation and management in full compliance with Brazilian legislation."}
            {language === "es" && "Nuestra plataforma ofrece todas las funcionalidades necesarias para la generación y gestión de Tarjetas de Identificación Estudiantil en total cumplimiento con la legislación brasileña."}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="card-shadow hover:institutional-shadow smooth-transition group"
            >
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 hero-gradient rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 smooth-transition">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {feature.title[language]}
                  </h3>
                </div>
                <p className="text-muted-foreground">
                  {feature.description[language]}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-secondary rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              {language === "pt" && "Por que escolher nossa solução?"}
              {language === "en" && "Why choose our solution?"}
              {language === "es" && "¿Por qué elegir nuestra solución?"}
            </h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 hero-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-foreground mb-3">
                  {benefit.title[language]}
                </h4>
                <p className="text-muted-foreground">
                  {benefit.description[language]}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Button 
            size="lg"
            className="hero-gradient text-white hover:opacity-90 text-lg px-10 py-6 hero-shadow bounce-transition"
          >
            {language === "pt" && "Solicitar Demonstração"}
            {language === "en" && "Request Demo"}
            {language === "es" && "Solicitar Demostración"}
          </Button>
        </div>
      </div>
    </section>
  );
};