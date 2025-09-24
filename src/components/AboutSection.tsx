import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Award, 
  Building, 
  Users2, 
  FileText,
  ArrowRight,
  Target,
  Lightbulb,
  Heart
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export const AboutSection = () => {
  const { language } = useTheme();

  const stats = [
    {
      icon: Building,
      number: "500+",
      label: {
        pt: "Universidades Atendidas",
        en: "Universities Served",
        es: "Universidades Atendidas"
      }
    },
    {
      icon: Users2,
      number: "50K+",
      label: {
        pt: "Estudantes Beneficiados",
        en: "Students Benefited",
        es: "Estudiantes Beneficiados"
      }
    },
    {
      icon: FileText,
      number: "100K+",
      label: {
        pt: "CIEs Emitidas",
        en: "CIEs Issued",
        es: "CIEs Emitidas"
      }
    },
    {
      icon: Award,
      number: "99.9%",
      label: {
        pt: "Conformidade Legal",
        en: "Legal Compliance",
        es: "Cumplimiento Legal"
      }
    }
  ];

  const values = [
    {
      icon: Target,
      title: {
        pt: "Precisão",
        en: "Precision",
        es: "Precisión"
      },
      description: {
        pt: "Cada CIE é gerada com máxima precisão e conformidade legal",
        en: "Each CIE is generated with maximum precision and legal compliance",
        es: "Cada CIE se genera con máxima precisión y cumplimiento legal"
      }
    },
    {
      icon: Lightbulb,
      title: {
        pt: "Inovação",
        en: "Innovation",
        es: "Innovación"
      },
      description: {
        pt: "Tecnologia de ponta para simplificar processos complexos",
        en: "Cutting-edge technology to simplify complex processes",
        es: "Tecnología de vanguardia para simplificar procesos complejos"
      }
    },
    {
      icon: Heart,
      title: {
        pt: "Compromisso",
        en: "Commitment", 
        es: "Compromiso"
      },
      description: {
        pt: "Dedicação total ao sucesso das organizações estudantis",
        en: "Total dedication to the success of student organizations",
        es: "Dedicación total al éxito de las organizaciones estudiantiles"
      }
    }
  ];

  return (
    <section id="about" className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            {language === "pt" && "Sobre Nós"}
            {language === "en" && "About Us"}
            {language === "es" && "Sobre Nosotros"}
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {language === "pt" && "Líderes em Tecnologia para Estudantes"}
            {language === "en" && "Leaders in Technology for Students"}
            {language === "es" && "Líderes en Tecnología para Estudiantes"}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {language === "pt" && "Desenvolvemos a solução mais avançada e confiável para geração de Carteiras de Identificação Estudantil no Brasil, garantindo total conformidade com a Lei 12.933/2013."}
            {language === "en" && "We develop the most advanced and reliable solution for Student Identification Card generation in Brazil, ensuring full compliance with Law 12.933/2013."}
            {language === "es" && "Desarrollamos la solución más avanzada y confiable para la generación de Tarjetas de Identificación Estudiantil en Brasil, garantizando total cumplimiento con la Ley 12.933/2013."}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center p-8 card-shadow group hover:hero-shadow smooth-transition">
              <CardContent className="p-0">
                <div className="w-16 h-16 hero-gradient rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 smooth-transition">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label[language]}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div>
            <h3 className="text-3xl font-bold text-foreground mb-6">
              {language === "pt" && "Nossa Missão"}
              {language === "en" && "Our Mission"}
              {language === "es" && "Nuestra Misión"}
            </h3>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {language === "pt" && "Democratizar o acesso ao ensino superior através de tecnologia inovadora que simplifica e automatiza o processo de emissão de Carteiras de Identificação Estudantil, garantindo que todos os estudantes brasileiros tenham acesso aos benefícios previstos em lei."}
              {language === "en" && "Democratize access to higher education through innovative technology that simplifies and automates the Student Identification Card issuance process, ensuring all Brazilian students have access to legally provided benefits."}
              {language === "es" && "Democratizar el acceso a la educación superior a través de tecnología innovadora que simplifica y automatiza el proceso de emisión de Tarjetas de Identificación Estudiantil, asegurando que todos los estudiantes brasileños tengan acceso a los beneficios previstos por ley."}
            </p>
            
            <div className="space-y-6">
              {values.map((value, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-10 h-10 hero-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                    <value.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">
                      {value.title[language]}
                    </h4>
                    <p className="text-muted-foreground">
                      {value.description[language]}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button 
              size="lg"
              className="mt-8 hero-gradient text-white hover:opacity-90 bounce-transition"
            >
              {language === "pt" && "Conheça Nossa História"}
              {language === "en" && "Learn Our Story"}
              {language === "es" && "Conoce Nuestra Historia"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            <Card className="p-8 card-shadow bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <CardContent className="p-0">
                <div className="text-center">
                  <div className="w-20 h-20 hero-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="h-10 w-10 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-foreground mb-4">
                    {language === "pt" && "Certificação ICP-Brasil"}
                    {language === "en" && "ICP-Brasil Certification"}
                    {language === "es" && "Certificación ICP-Brasil"}
                  </h4>
                  <p className="text-muted-foreground mb-6">
                    {language === "pt" && "Nossa plataforma utiliza certificados digitais X.509 em conformidade total com os padrões da Infraestrutura de Chaves Públicas Brasileira."}
                    {language === "en" && "Our platform uses X.509 digital certificates in full compliance with Brazilian Public Key Infrastructure standards."}
                    {language === "es" && "Nuestra plataforma utiliza certificados digitales X.509 en total cumplimiento con los estándares de la Infraestructura de Claves Públicas Brasileña."}
                  </p>
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    {language === "pt" && "Certificado Oficial"}
                    {language === "en" && "Official Certificate"}
                    {language === "es" && "Certificado Oficial"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};