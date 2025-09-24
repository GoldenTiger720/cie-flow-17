import React, { useState } from "react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  QrCode, 
  Search, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Camera,
  ArrowLeft,
  Shield,
  Calendar,
  User,
  School
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

const CIEValidator = () => {
  const { language } = useTheme();
  const [searchType, setSearchType] = useState("qr"); // "qr", "cie", "cpf"
  const [searchValue, setSearchValue] = useState("");
  const [validationResult, setValidationResult] = useState<any>(null);
  const [isValidating, setIsValidating] = useState(false);

  // Mock validation data
  const mockValidData = {
    valid: true,
    cie: {
      id: "SP123456789",
      student: {
        name: "João Silva Santos",
        cpf: "123.456.789-00",
        rg: "12.345.678-9",
        birthDate: "1999-05-15",
        photo: "/placeholder.svg"
      },
      institution: {
        name: "Universidade Federal de São Paulo",
        cnpj: "12.345.678/0001-99",
        code: "UNIFESP"
      },
      course: "Engenharia de Computação",
      studentId: "20231001234",
      issueDate: "2024-01-15",
      expirationDate: "2025-12-31",
      status: "active",
      qrCode: "https://cie.gov.br/validate/abc123",
      accessKey: "ABC123-DEF456-GHI789-JKL012",
      usageCode: "EST-2024-SP-001234",
      certificate: {
        serial: "X509-2024-001234",
        authority: "ICP-Brasil",
        issuer: "Autoridade Certificadora Estudantil"
      }
    }
  };

  const handleValidation = async () => {
    if (!searchValue.trim()) {
      toast({
        title: "Erro de Validação",
        description: "Por favor, insira um valor para validar.",
        variant: "destructive"
      });
      return;
    }

    setIsValidating(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock validation logic
      if (searchValue.includes("123") || searchValue.includes("abc")) {
        setValidationResult(mockValidData);
      } else {
        setValidationResult({ valid: false, error: "CIE não encontrada ou inválida" });
      }
      setIsValidating(false);
    }, 1500);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-accent text-white">
            <CheckCircle className="h-3 w-3 mr-1" />
            {language === "pt" && "Válida"}
            {language === "en" && "Valid"}
            {language === "es" && "Válida"}
          </Badge>
        );
      case "expired":
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" />
            {language === "pt" && "Expirada"}
            {language === "en" && "Expired"}
            {language === "es" && "Expirada"}
          </Badge>
        );
      case "revoked":
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" />
            {language === "pt" && "Revogada"}
            {language === "en" && "Revoked"}
            {language === "es" && "Revocada"}
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <Link to="/">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    {language === "pt" && "Voltar"}
                    {language === "en" && "Back"}
                    {language === "es" && "Volver"}
                  </Button>
                </Link>
                <div className="w-8 h-8 hero-gradient rounded-lg flex items-center justify-center">
                  <Shield className="h-4 w-4 text-white" />
                </div>
                <h1 className="text-xl font-bold text-foreground">
                  {language === "pt" && "Validador de CIE"}
                  {language === "en" && "CIE Validator"}
                  {language === "es" && "Validador de CIE"}
                </h1>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 hero-gradient rounded-full flex items-center justify-center mx-auto mb-6">
              <QrCode className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              {language === "pt" && "Validação Pública de CIE"}
              {language === "en" && "Public CIE Validation"}
              {language === "es" && "Validación Pública de CIE"}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {language === "pt" && "Verifique a autenticidade e validade de uma Carteira de Identificação Estudantil em conformidade com a Lei 12.933/2013"}
              {language === "en" && "Verify the authenticity and validity of a Student Identification Card in compliance with Law 12.933/2013"}
              {language === "es" && "Verifica la autenticidad y validez de una Tarjeta de Identificación Estudiantil en cumplimiento con la Ley 12.933/2013"}
            </p>
          </div>

          {/* Search Form */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Search className="h-5 w-5" />
                <span>
                  {language === "pt" && "Buscar CIE"}
                  {language === "en" && "Search CIE"}
                  {language === "es" && "Buscar CIE"}
                </span>
              </CardTitle>
              <CardDescription>
                {language === "pt" && "Escolha o método de busca e insira os dados da carteira"}
                {language === "en" && "Choose the search method and enter the card data"}
                {language === "es" && "Elige el método de búsqueda e ingresa los datos de la tarjeta"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Search Type Selection */}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={searchType === "qr" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSearchType("qr")}
                >
                  <QrCode className="h-4 w-4 mr-2" />
                  QR Code
                </Button>
                <Button
                  variant={searchType === "cie" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSearchType("cie")}
                >
                  Número CIE
                </Button>
                <Button
                  variant={searchType === "cpf" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSearchType("cpf")}
                >
                  CPF
                </Button>
              </div>

              {/* Search Input */}
              <div className="space-y-2">
                <Label htmlFor="search">
                  {searchType === "qr" && (language === "pt" ? "Código QR ou Chave de Acesso" : "QR Code or Access Key")}
                  {searchType === "cie" && (language === "pt" ? "Número da CIE" : "CIE Number")}
                  {searchType === "cpf" && "CPF do Estudante"}
                </Label>
                <div className="flex space-x-2">
                  <Input
                    id="search"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder={
                      searchType === "qr" ? "https://cie.gov.br/validate/abc123" :
                      searchType === "cie" ? "SP123456789" :
                      "000.000.000-00"
                    }
                    className="flex-1"
                  />
                  {searchType === "qr" && (
                    <Button variant="outline" size="icon">
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Search Button */}
              <Button 
                onClick={handleValidation}
                disabled={isValidating}
                className="w-full hero-gradient text-white"
              >
                {isValidating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {language === "pt" && "Validando..."}
                    {language === "en" && "Validating..."}
                    {language === "es" && "Validando..."}
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    {language === "pt" && "Validar CIE"}
                    {language === "en" && "Validate CIE"}
                    {language === "es" && "Validar CIE"}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Validation Result */}
          {validationResult && (
            <Card className={`mb-8 ${validationResult.valid ? 'border-accent' : 'border-destructive'}`}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {validationResult.valid ? (
                    <CheckCircle className="h-5 w-5 text-accent" />
                  ) : (
                    <XCircle className="h-5 w-5 text-destructive" />
                  )}
                  <span>
                    {validationResult.valid ? (
                      language === "pt" ? "CIE Válida" : "Valid CIE"
                    ) : (
                      language === "pt" ? "CIE Inválida" : "Invalid CIE"
                    )}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {validationResult.valid ? (
                  <div className="space-y-6">
                    {/* Student Information */}
                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
                      <div className="flex-1 space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold">
                            {validationResult.cie.student.name}
                          </h3>
                          {getStatusBadge(validationResult.cie.status)}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">CPF:</span>
                            <p>{validationResult.cie.student.cpf}</p>
                          </div>
                          <div>
                            <span className="font-medium">RG:</span>
                            <p>{validationResult.cie.student.rg}</p>
                          </div>
                          <div>
                            <span className="font-medium">
                              {language === "pt" && "Data de Nascimento:"}
                              {language === "en" && "Birth Date:"}
                              {language === "es" && "Fecha de Nacimiento:"}
                            </span>
                            <p>{new Date(validationResult.cie.student.birthDate).toLocaleDateString(language === "pt" ? "pt-BR" : "en-US")}</p>
                          </div>
                          <div>
                            <span className="font-medium">CIE:</span>
                            <p>{validationResult.cie.id}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="w-32 h-40 bg-secondary rounded-lg flex items-center justify-center">
                        <User className="h-16 w-16 text-muted-foreground" />
                      </div>
                    </div>

                    {/* Academic Information */}
                    <div className="border-t pt-4">
                      <h4 className="font-semibold mb-3 flex items-center">
                        <School className="h-4 w-4 mr-2" />
                        {language === "pt" && "Informações Acadêmicas"}
                        {language === "en" && "Academic Information"}
                        {language === "es" && "Información Académica"}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">
                            {language === "pt" && "Instituição:"}
                            {language === "en" && "Institution:"}
                            {language === "es" && "Institución:"}
                          </span>
                          <p>{validationResult.cie.institution.name}</p>
                        </div>
                        <div>
                          <span className="font-medium">
                            {language === "pt" && "Curso:"}
                            {language === "en" && "Course:"}
                            {language === "es" && "Curso:"}
                          </span>
                          <p>{validationResult.cie.course}</p>
                        </div>
                        <div>
                          <span className="font-medium">
                            {language === "pt" && "Matrícula:"}
                            {language === "en" && "Student ID:"}
                            {language === "es" && "Matrícula:"}
                          </span>
                          <p>{validationResult.cie.studentId}</p>
                        </div>
                        <div>
                          <span className="font-medium">CNPJ:</span>
                          <p>{validationResult.cie.institution.cnpj}</p>
                        </div>
                      </div>
                    </div>

                    {/* Validity Information */}
                    <div className="border-t pt-4">
                      <h4 className="font-semibold mb-3 flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        {language === "pt" && "Validade"}
                        {language === "en" && "Validity"}
                        {language === "es" && "Validez"}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium">
                            {language === "pt" && "Emissão:"}
                            {language === "en" && "Issue Date:"}
                            {language === "es" && "Emisión:"}
                          </span>
                          <p>{new Date(validationResult.cie.issueDate).toLocaleDateString(language === "pt" ? "pt-BR" : "en-US")}</p>
                        </div>
                        <div>
                          <span className="font-medium">
                            {language === "pt" && "Validade:"}
                            {language === "en" && "Expiration:"}
                            {language === "es" && "Validez:"}
                          </span>
                          <p>{new Date(validationResult.cie.expirationDate).toLocaleDateString(language === "pt" ? "pt-BR" : "en-US")}</p>
                        </div>
                        <div>
                          <span className="font-medium">
                            {language === "pt" && "Código de Uso:"}
                            {language === "en" && "Usage Code:"}
                            {language === "es" && "Código de Uso:"}
                          </span>
                          <p className="font-mono text-xs">{validationResult.cie.usageCode}</p>
                        </div>
                      </div>
                    </div>

                    {/* Certificate Information */}
                    <div className="border-t pt-4 bg-accent/10 rounded-lg p-4">
                      <h4 className="font-semibold mb-3 flex items-center">
                        <Shield className="h-4 w-4 mr-2" />
                        {language === "pt" && "Certificado Digital X.509"}
                        {language === "en" && "X.509 Digital Certificate"}
                        {language === "es" && "Certificado Digital X.509"}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Serial:</span>
                          <p className="font-mono text-xs">{validationResult.cie.certificate.serial}</p>
                        </div>
                        <div>
                          <span className="font-medium">
                            {language === "pt" && "Autoridade:"}
                            {language === "en" && "Authority:"}
                            {language === "es" && "Autoridad:"}
                          </span>
                          <p>{validationResult.cie.certificate.authority}</p>
                        </div>
                        <div className="md:col-span-2">
                          <span className="font-medium">
                            {language === "pt" && "Emissor:"}
                            {language === "en" && "Issuer:"}
                            {language === "es" && "Emisor:"}
                          </span>
                          <p>{validationResult.cie.certificate.issuer}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <XCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-destructive mb-2">
                      {language === "pt" && "CIE não encontrada"}
                      {language === "en" && "CIE not found"}
                      {language === "es" && "CIE no encontrada"}
                    </h3>
                    <p className="text-muted-foreground">
                      {validationResult.error || (
                        language === "pt" ? "Verifique os dados inseridos e tente novamente" : 
                        "Please check the entered data and try again"
                      )}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-accent" />
                  <span>
                    {language === "pt" && "Segurança Garantida"}
                    {language === "en" && "Guaranteed Security"}
                    {language === "es" && "Seguridad Garantizada"}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {language === "pt" && "Todas as CIEs são protegidas por certificados digitais X.509 conforme padrão ICP-Brasil, garantindo total autenticidade e conformidade legal."}
                  {language === "en" && "All CIEs are protected by X.509 digital certificates according to ICP-Brasil standard, ensuring total authenticity and legal compliance."}
                  {language === "es" && "Todas las CIEs están protegidas por certificados digitales X.509 según el estándar ICP-Brasil, garantizando total autenticidad y cumplimiento legal."}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-primary" />
                  <span>
                    {language === "pt" && "Lei 12.933/2013"}
                    {language === "en" && "Law 12.933/2013"}
                    {language === "es" && "Ley 12.933/2013"}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {language === "pt" && "Sistema em total conformidade com a legislação brasileira para Carteiras de Identificação Estudantil, assegurando validade jurídica completa."}
                  {language === "en" && "System in full compliance with Brazilian legislation for Student Identification Cards, ensuring complete legal validity."}
                  {language === "es" && "Sistema en total cumplimiento con la legislación brasileña para Tarjetas de Identificación Estudiantil, asegurando validez jurídica completa."}
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default CIEValidator;