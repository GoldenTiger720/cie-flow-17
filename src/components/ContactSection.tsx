import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  CheckCircle,
  MessageSquare,
  Headphones
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useToast } from "@/hooks/use-toast";

export const ContactSection = () => {
  const { language } = useTheme();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "", 
    company: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with your backend
    toast({
      title: language === "pt" ? "Mensagem Enviada!" : language === "en" ? "Message Sent!" : "¡Mensaje Enviado!",
      description: language === "pt" ? "Entraremos em contato em breve." : language === "en" ? "We'll get back to you soon." : "Nos pondremos en contacto pronto.",
    });
    setFormData({ name: "", email: "", company: "", message: "" });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "contato@studentid.com.br",
      description: {
        pt: "Resposta em até 2 horas",
        en: "Response within 2 hours", 
        es: "Respuesta en hasta 2 horas"
      }
    },
    {
      icon: Phone,
      title: {
        pt: "Telefone",
        en: "Phone",
        es: "Teléfono"
      },
      content: "+55 (11) 9999-8888",
      description: {
        pt: "Seg-Sex, 9h às 18h",
        en: "Mon-Fri, 9am to 6pm",
        es: "Lun-Vie, 9h a 18h"
      }
    },
    {
      icon: MapPin,
      title: {
        pt: "Endereço",
        en: "Address",
        es: "Dirección"
      },
      content: "São Paulo, SP - Brasil",
      description: {
        pt: "Atendimento nacional",
        en: "Nationwide service",
        es: "Servicio nacional"
      }
    },
    {
      icon: Clock,
      title: {
        pt: "Horário",
        en: "Schedule",
        es: "Horario"
      },
      content: "24/7",
      description: {
        pt: "Suporte técnico contínuo",
        en: "Continuous technical support",
        es: "Soporte técnico continuo"
      }
    }
  ];

  return (
    <section id="contact" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            {language === "pt" && "Entre em Contato"}
            {language === "en" && "Get in Touch"}
            {language === "es" && "Ponte en Contacto"}
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {language === "pt" && "Vamos Conversar?"}
            {language === "en" && "Let's Talk?"}
            {language === "es" && "¿Hablemos?"}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {language === "pt" && "Entre em contato conosco para descobrir como podemos revolucionar o processo de emissão de CIEs na sua instituição."}
            {language === "en" && "Contact us to discover how we can revolutionize the CIE issuance process at your institution."}
            {language === "es" && "Contáctanos para descubrir cómo podemos revolucionar el proceso de emisión de CIE en tu institución."}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <MessageSquare className="h-6 w-6 mr-3 text-primary" />
                {language === "pt" && "Envie sua Mensagem"}
                {language === "en" && "Send your Message"}
                {language === "es" && "Envía tu Mensaje"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      {language === "pt" && "Nome Completo"}
                      {language === "en" && "Full Name"}
                      {language === "es" && "Nombre Completo"}
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={
                        language === "pt" ? "Seu nome" : 
                        language === "en" ? "Your name" : 
                        "Tu nombre"
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Email
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="contato@universidade.edu.br"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {language === "pt" && "Instituição/Organização"}
                    {language === "en" && "Institution/Organization"}
                    {language === "es" && "Institución/Organización"}
                  </label>
                  <Input
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder={
                      language === "pt" ? "Nome da instituição" : 
                      language === "en" ? "Institution name" : 
                      "Nombre de la institución"
                    }
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {language === "pt" && "Mensagem"}
                    {language === "en" && "Message"}
                    {language === "es" && "Mensaje"}
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={
                      language === "pt" ? "Conte-nos sobre suas necessidades..." : 
                      language === "en" ? "Tell us about your needs..." : 
                      "Cuéntanos sobre tus necesidades..."
                    }
                    rows={4}
                    required
                  />
                </div>
                
                <Button 
                  type="submit"
                  size="lg"
                  className="w-full hero-gradient text-white hover:opacity-90 bounce-transition"
                >
                  <Send className="h-5 w-5 mr-2" />
                  {language === "pt" && "Enviar Mensagem"}
                  {language === "en" && "Send Message"}
                  {language === "es" && "Enviar Mensaje"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="card-shadow bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Headphones className="h-8 w-8 text-primary mr-3" />
                  <h3 className="text-2xl font-bold text-foreground">
                    {language === "pt" && "Suporte Especializado"}
                    {language === "en" && "Specialized Support"}
                    {language === "es" && "Soporte Especializado"}
                  </h3>
                </div>
                <p className="text-muted-foreground text-lg">
                  {language === "pt" && "Nossa equipe de especialistas está pronta para ajudar você a implementar a solução perfeita para sua instituição."}
                  {language === "en" && "Our team of specialists is ready to help you implement the perfect solution for your institution."}
                  {language === "es" && "Nuestro equipo de especialistas está listo para ayudarte a implementar la solución perfecta para tu institución."}
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="card-shadow hover:institutional-shadow smooth-transition group">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 hero-gradient rounded-lg flex items-center justify-center group-hover:scale-110 smooth-transition">
                        <info.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-1">
                          {typeof info.title === 'string' ? info.title : info.title[language]}
                        </h4>
                        <p className="text-primary font-medium mb-1">
                          {info.content}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {typeof info.description === 'string' ? info.description : info.description[language]}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* CTA Card */}
            <Card className="card-shadow bg-gradient-to-r from-primary to-accent text-white">
              <CardContent className="p-8 text-center">
                <CheckCircle className="h-12 w-12 mx-auto mb-4" />
                <h4 className="text-xl font-bold mb-3">
                  {language === "pt" && "Demonstração Gratuita"}
                  {language === "en" && "Free Demonstration"}
                  {language === "es" && "Demostración Gratuita"}
                </h4>
                <p className="mb-6 opacity-90">
                  {language === "pt" && "Veja nossa plataforma em ação com uma demonstração personalizada para sua instituição."}
                  {language === "en" && "See our platform in action with a personalized demonstration for your institution."}
                  {language === "es" && "Ve nuestra plataforma en acción con una demostración personalizada para tu institución."}
                </p>
                <Button 
                  variant="secondary" 
                  className="bg-white text-primary hover:bg-white/90 bounce-transition"
                >
                  {language === "pt" && "Agendar Demo"}
                  {language === "en" && "Schedule Demo"}
                  {language === "es" && "Programar Demo"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};