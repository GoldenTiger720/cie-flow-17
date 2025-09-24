import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  FileText, 
  CreditCard, 
  User,
  MapPin,
  Phone,
  Mail,
  Calendar,
  CheckCircle,
  AlertCircle,
  Camera
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { toast } from "@/components/ui/use-toast";

export const CIERequestForm = () => {
  const { language } = useTheme();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: "",
    cpf: "",
    rg: "",
    birthDate: "",
    email: "",
    phone: "",
    
    // Address
    zipCode: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    
    // Academic Information
    institution: "",
    course: "",
    studentId: "",
    semester: "",
    expectedGraduation: "",
    
    // Request Type
    requestType: "new",
    previousCIE: "",
    
    // Documents
    uploadedDocuments: [] as string[],
    
    // Terms
    acceptedTerms: false,
    acceptedPrivacy: false
  });

  const steps = [
    {
      number: 1,
      title: {
        pt: "Dados Pessoais",
        en: "Personal Data",
        es: "Datos Personales"
      },
      description: {
        pt: "Informações básicas do estudante",
        en: "Basic student information",
        es: "Información básica del estudiante"
      }
    },
    {
      number: 2,
      title: {
        pt: "Endereço",
        en: "Address",
        es: "Dirección"
      },
      description: {
        pt: "Dados de endereço para correspondência",
        en: "Address data for correspondence",
        es: "Datos de dirección para correspondencia"
      }
    },
    {
      number: 3,
      title: {
        pt: "Dados Acadêmicos",
        en: "Academic Data",
        es: "Datos Académicos"
      },
      description: {
        pt: "Informações sobre instituição e curso",
        en: "Institution and course information",
        es: "Información sobre institución y curso"
      }
    },
    {
      number: 4,
      title: {
        pt: "Documentos",
        en: "Documents",
        es: "Documentos"
      },
      description: {
        pt: "Upload dos documentos necessários",
        en: "Upload of required documents",
        es: "Carga de documentos requeridos"
      }
    },
    {
      number: 5,
      title: {
        pt: "Pagamento",
        en: "Payment",
        es: "Pago"
      },
      description: {
        pt: "Finalização e pagamento da taxa",
        en: "Finalization and fee payment",
        es: "Finalización y pago de la tasa"
      }
    }
  ];

  const mockDocuments = [
    { name: "RG ou CNH", uploaded: false, required: true },
    { name: "CPF", uploaded: false, required: true },
    { name: "Comprovante de Matrícula", uploaded: false, required: true },
    { name: "Foto 3x4", uploaded: false, required: true },
    { name: "Comprovante de Endereço", uploaded: false, required: false }
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    toast({
      title: language === "pt" ? "Solicitação Enviada!" : "Request Submitted!",
      description: language === "pt" 
        ? "Sua solicitação foi enviada com sucesso. Você receberá um email de confirmação em breve."
        : "Your request has been successfully submitted. You will receive a confirmation email shortly.",
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">
                  {language === "pt" && "Nome Completo *"}
                  {language === "en" && "Full Name *"}
                  {language === "es" && "Nombre Completo *"}
                </Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  placeholder={language === "pt" ? "Digite seu nome completo" : "Enter your full name"}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF *</Label>
                <Input
                  id="cpf"
                  value={formData.cpf}
                  onChange={(e) => handleInputChange("cpf", e.target.value)}
                  placeholder="000.000.000-00"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rg">RG *</Label>
                <Input
                  id="rg"
                  value={formData.rg}
                  onChange={(e) => handleInputChange("rg", e.target.value)}
                  placeholder="00.000.000-0"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="birthDate">
                  {language === "pt" && "Data de Nascimento *"}
                  {language === "en" && "Birth Date *"}
                  {language === "es" && "Fecha de Nacimiento *"}
                </Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleInputChange("birthDate", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="seu.email@exemplo.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">
                  {language === "pt" && "Telefone *"}
                  {language === "en" && "Phone *"}
                  {language === "es" && "Teléfono *"}
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="(11) 99999-9999"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="zipCode">CEP *</Label>
                <Input
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange("zipCode", e.target.value)}
                  placeholder="00000-000"
                />
              </div>
              
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="street">
                  {language === "pt" && "Logradouro *"}
                  {language === "en" && "Street *"}
                  {language === "es" && "Calle *"}
                </Label>
                <Input
                  id="street"
                  value={formData.street}
                  onChange={(e) => handleInputChange("street", e.target.value)}
                  placeholder={language === "pt" ? "Rua, Avenida, etc." : "Street, Avenue, etc."}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="number">
                  {language === "pt" && "Número *"}
                  {language === "en" && "Number *"}
                  {language === "es" && "Número *"}
                </Label>
                <Input
                  id="number"
                  value={formData.number}
                  onChange={(e) => handleInputChange("number", e.target.value)}
                  placeholder="123"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="complement">
                  {language === "pt" && "Complemento"}
                  {language === "en" && "Complement"}
                  {language === "es" && "Complemento"}
                </Label>
                <Input
                  id="complement"
                  value={formData.complement}
                  onChange={(e) => handleInputChange("complement", e.target.value)}
                  placeholder="Apt, Bloco, etc."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="neighborhood">
                  {language === "pt" && "Bairro *"}
                  {language === "en" && "Neighborhood *"}
                  {language === "es" && "Barrio *"}
                </Label>
                <Input
                  id="neighborhood"
                  value={formData.neighborhood}
                  onChange={(e) => handleInputChange("neighborhood", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="city">
                  {language === "pt" && "Cidade *"}
                  {language === "en" && "City *"}
                  {language === "es" && "Ciudad *"}
                </Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="state">
                  {language === "pt" && "Estado *"}
                  {language === "en" && "State *"}
                  {language === "es" && "Estado *"}
                </Label>
                <Select onValueChange={(value) => handleInputChange("state", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SP">São Paulo</SelectItem>
                    <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                    <SelectItem value="MG">Minas Gerais</SelectItem>
                    {/* Add more states */}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="requestType">
                  {language === "pt" && "Tipo de Solicitação *"}
                  {language === "en" && "Request Type *"}
                  {language === "es" && "Tipo de Solicitud *"}
                </Label>
                <Select onValueChange={(value) => handleInputChange("requestType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={language === "pt" ? "Selecione o tipo" : "Select type"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">
                      {language === "pt" && "Nova Carteira - R$ 35,00"}
                      {language === "en" && "New Card - R$ 35,00"}
                      {language === "es" && "Nueva Tarjeta - R$ 35,00"}
                    </SelectItem>
                    <SelectItem value="duplicate">
                      {language === "pt" && "Segunda Via - R$ 20,00"}
                      {language === "en" && "Duplicate - R$ 20,00"}
                      {language === "es" && "Duplicado - R$ 20,00"}
                    </SelectItem>
                    <SelectItem value="renewal">
                      {language === "pt" && "Renovação - R$ 35,00"}
                      {language === "en" && "Renewal - R$ 35,00"}
                      {language === "es" && "Renovación - R$ 35,00"}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="institution">
                  {language === "pt" && "Instituição de Ensino *"}
                  {language === "en" && "Educational Institution *"}
                  {language === "es" && "Institución Educativa *"}
                </Label>
                <Input
                  id="institution"
                  value={formData.institution}
                  onChange={(e) => handleInputChange("institution", e.target.value)}
                  placeholder={language === "pt" ? "Nome da universidade/faculdade" : "University/college name"}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="course">
                  {language === "pt" && "Curso *"}
                  {language === "en" && "Course *"}
                  {language === "es" && "Curso *"}
                </Label>
                <Input
                  id="course"
                  value={formData.course}
                  onChange={(e) => handleInputChange("course", e.target.value)}
                  placeholder={language === "pt" ? "Nome do curso" : "Course name"}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="studentId">
                  {language === "pt" && "Número de Matrícula *"}
                  {language === "en" && "Student ID Number *"}
                  {language === "es" && "Número de Matrícula *"}
                </Label>
                <Input
                  id="studentId"
                  value={formData.studentId}
                  onChange={(e) => handleInputChange("studentId", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="semester">
                  {language === "pt" && "Semestre/Período Atual *"}
                  {language === "en" && "Current Semester/Period *"}
                  {language === "es" && "Semestre/Período Actual *"}
                </Label>
                <Input
                  id="semester"
                  value={formData.semester}
                  onChange={(e) => handleInputChange("semester", e.target.value)}
                  placeholder="Ex: 3º semestre"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="expectedGraduation">
                  {language === "pt" && "Previsão de Formatura *"}
                  {language === "en" && "Expected Graduation *"}
                  {language === "es" && "Graduación Esperada *"}
                </Label>
                <Input
                  id="expectedGraduation"
                  type="date"
                  value={formData.expectedGraduation}
                  onChange={(e) => handleInputChange("expectedGraduation", e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h4 className="text-lg font-semibold mb-2">
                {language === "pt" && "Upload de Documentos"}
                {language === "en" && "Document Upload"}
                {language === "es" && "Carga de Documentos"}
              </h4>
              <p className="text-muted-foreground">
                {language === "pt" && "Faça upload dos documentos necessários (PDF, JPG ou PNG)"}
                {language === "en" && "Upload the required documents (PDF, JPG or PNG)"}
                {language === "es" && "Carga los documentos requeridos (PDF, JPG o PNG)"}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockDocuments.map((doc, index) => (
                <Card key={index} className={`${doc.required ? 'border-primary' : 'border-border'}`}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4" />
                        <span className="text-sm font-medium">{doc.name}</span>
                      </div>
                      <Badge variant={doc.required ? "default" : "secondary"}>
                        {doc.required 
                          ? (language === "pt" ? "Obrigatório" : "Required")
                          : (language === "pt" ? "Opcional" : "Optional")
                        }
                      </Badge>
                    </div>
                    
                    <Button variant="outline" className="w-full" disabled={doc.uploaded}>
                      {doc.uploaded ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2 text-accent" />
                          {language === "pt" && "Enviado"}
                          {language === "en" && "Uploaded"}
                          {language === "es" && "Cargado"}
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4 mr-2" />
                          {language === "pt" && "Fazer Upload"}
                          {language === "en" && "Upload"}
                          {language === "es" && "Cargar"}
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <Card className="bg-secondary">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>
                    {language === "pt" && "Resumo da Solicitação"}
                    {language === "en" && "Request Summary"}
                    {language === "es" && "Resumen de la Solicitud"}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>
                    {formData.requestType === "new" && (language === "pt" ? "Nova Carteira" : "New Card")}
                    {formData.requestType === "duplicate" && (language === "pt" ? "Segunda Via" : "Duplicate")}
                    {formData.requestType === "renewal" && (language === "pt" ? "Renovação" : "Renewal")}
                  </span>
                  <span className="font-semibold">
                    R$ {formData.requestType === "duplicate" ? "20,00" : "35,00"}
                  </span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span>R$ {formData.requestType === "duplicate" ? "20,00" : "35,00"}</span>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="terms"
                  checked={formData.acceptedTerms}
                  onCheckedChange={(checked) => handleInputChange("acceptedTerms", checked)}
                />
                <Label htmlFor="terms" className="text-sm leading-5">
                  {language === "pt" && "Aceito os termos e condições de uso da plataforma e declaro que as informações fornecidas são verdadeiras."}
                  {language === "en" && "I accept the platform's terms and conditions and declare that the information provided is true."}
                  {language === "es" && "Acepto los términos y condiciones de la plataforma y declaro que la información proporcionada es verdadera."}
                </Label>
              </div>
              
              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="privacy"
                  checked={formData.acceptedPrivacy}
                  onCheckedChange={(checked) => handleInputChange("acceptedPrivacy", checked)}
                />
                <Label htmlFor="privacy" className="text-sm leading-5">
                  {language === "pt" && "Autorizo o tratamento dos meus dados pessoais conforme a Lei Geral de Proteção de Dados (LGPD)."}
                  {language === "en" && "I authorize the processing of my personal data in accordance with the General Data Protection Law (LGPD)."}
                  {language === "es" && "Autorizo el tratamiento de mis datos personales de acuerdo con la Ley General de Protección de Datos (LGPD)."}
                </Label>
              </div>
            </div>

            <Card className="bg-accent/10 border-accent">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="h-5 w-5 text-accent" />
                  <div>
                    <p className="font-medium">
                      {language === "pt" && "Conformidade com a Lei 12.933/2013"}
                      {language === "en" && "Compliance with Law 12.933/2013"}
                      {language === "es" && "Cumplimiento con la Ley 12.933/2013"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {language === "pt" && "Sua CIE será gerada com certificado digital X.509 conforme padrão ICP-Brasil."}
                      {language === "en" && "Your CIE will be generated with X.509 digital certificate according to ICP-Brasil standard."}
                      {language === "es" && "Su CIE será generada con certificado digital X.509 según el estándar ICP-Brasil."}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Progress Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5" />
            <span>
              {language === "pt" && "Solicitação de CIE Digital"}
              {language === "en" && "Digital CIE Request"}
              {language === "es" && "Solicitud de CIE Digital"}
            </span>
          </CardTitle>
          <CardDescription>
            {language === "pt" && `Passo ${currentStep} de ${steps.length}: ${steps[currentStep - 1]?.title[language as keyof typeof steps[0]["title"]]}`}
            {language === "en" && `Step ${currentStep} of ${steps.length}: ${steps[currentStep - 1]?.title[language as keyof typeof steps[0]["title"]]}`}
            {language === "es" && `Paso ${currentStep} de ${steps.length}: ${steps[currentStep - 1]?.title[language as keyof typeof steps[0]["title"]]}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={(currentStep / steps.length) * 100} className="w-full" />
        </CardContent>
      </Card>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle>
            {steps[currentStep - 1]?.title[language as keyof typeof steps[0]["title"]]}
          </CardTitle>
          <CardDescription>
            {steps[currentStep - 1]?.description[language as keyof typeof steps[0]["description"]]}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderStepContent()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePreviousStep}
          disabled={currentStep === 1}
        >
          {language === "pt" && "Anterior"}
          {language === "en" && "Previous"}
          {language === "es" && "Anterior"}
        </Button>
        
        {currentStep < steps.length ? (
          <Button onClick={handleNextStep} className="hero-gradient text-white">
            {language === "pt" && "Próximo"}
            {language === "en" && "Next"}
            {language === "es" && "Siguiente"}
          </Button>
        ) : (
          <Button 
            onClick={handleSubmit}
            className="hero-gradient text-white"
            disabled={!formData.acceptedTerms || !formData.acceptedPrivacy}
          >
            {language === "pt" && "Finalizar Solicitação"}
            {language === "en" && "Complete Request"}
            {language === "es" && "Completar Solicitud"}
          </Button>
        )}
      </div>
    </div>
  );
};