import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  User,
  CreditCard,
  Shield,
  Bell,
  FileText,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Plus,
  CheckCircle,
  Clock,
  XCircle,
  Download,
  QrCode,
  Key,
  Printer,
  Database,
  Server,
  Mail,
  MapPin,
  Calendar,
  TrendingUp,
  AlertTriangle,
  Zap,
  Globe,
  Upload,
  Eye,
  Search,
  Filter,
  RefreshCw,
  Copy,
  Check,
  Edit
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { language } = useTheme();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [userRole, setUserRole] = useState("student");
  const { user: currentUser } = useAuth();

  // State for various functional features
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [requestFilter, setRequestFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);
  const [newRequestDialog, setNewRequestDialog] = useState(false);
  const [revokeDialog, setRevokeDialog] = useState(false);
  const [validationDialog, setValidationDialog] = useState(false);
  const [apiKeyDialog, setApiKeyDialog] = useState(false);
  const [copiedApiKey, setCopiedApiKey] = useState(false);
  const [studentProgress, setStudentProgress] = useState(75);
  const [refreshing, setRefreshing] = useState(false);

  // Mock API functions
  const generateCIE = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsGenerating(false);
    toast({
      title: language === "pt" ? "CIE Gerada com Sucesso!" : language === "en" ? "CIE Generated Successfully!" : "¡CIE Generada Exitosamente!",
      description: language === "pt" ? "Todos os componentes foram gerados automaticamente" : language === "en" ? "All components were generated automatically" : "Todos los componentes fueron generados automáticamente"
    });
    if (userRole === "student") {
      setStudentProgress(100);
    }
  };

  const exportData = async (format: string) => {
    setIsExporting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsExporting(false);
    toast({
      title: language === "pt" ? "Dados Exportados!" : language === "en" ? "Data Exported!" : "¡Datos Exportados!",
      description: language === "pt" ? `Arquivo ${format.toUpperCase()} baixado com sucesso` : language === "en" ? `${format.toUpperCase()} file downloaded successfully` : `Archivo ${format.toUpperCase()} descargado exitosamente`
    });
  };

  const validateCard = async (cardId: string) => {
    setIsValidating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsValidating(false);
    const isValid = Math.random() > 0.1; // 90% chance of being valid
    toast({
      title: isValid ? (language === "pt" ? "Carteira Válida" : language === "en" ? "Valid Card" : "Carné Válido") : (language === "pt" ? "Carteira Inválida" : language === "en" ? "Invalid Card" : "Carné Inválido"),
      description: isValid ? `${cardId} - ${language === "pt" ? "Estudante ativo" : language === "en" ? "Active student" : "Estudiante activo"}` : `${cardId} - ${language === "pt" ? "Carteira revogada ou inexistente" : language === "en" ? "Card revoked or non-existent" : "Carné revocado o inexistente"}`,
      variant: isValid ? "default" : "destructive"
    });
  };

  const copyApiKey = () => {
    const apiKey = "cie_sk_test_51H7qYc2eZvKYlo2C9rKd8bFpUZfR1ZvKYlo2C9rKd8bF";
    navigator.clipboard.writeText(apiKey);
    setCopiedApiKey(true);
    setTimeout(() => setCopiedApiKey(false), 2000);
    toast({
      title: language === "pt" ? "API Key Copiada!" : language === "en" ? "API Key Copied!" : "¡Clave API Copiada!",
      description: language === "pt" ? "Chave copiada para a área de transferência" : language === "en" ? "Key copied to clipboard" : "Clave copiada al portapapeles"
    });
  };

  const refreshData = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
    toast({
      title: language === "pt" ? "Dados Atualizados!" : language === "en" ? "Data Refreshed!" : "¡Datos Actualizados!",
      description: language === "pt" ? "Dashboard atualizado com os dados mais recentes" : language === "en" ? "Dashboard updated with latest data" : "Dashboard actualizado con los datos más recientes"
    });
  };

  const approveRequest = async (requestId: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: language === "pt" ? "Solicitação Aprovada!" : language === "en" ? "Request Approved!" : "¡Solicitud Aprobada!",
      description: `${requestId} - ${language === "pt" ? "CIE será gerada automaticamente" : language === "en" ? "CIE will be generated automatically" : "CIE será generada automáticamente"}`
    });
  };

  const rejectRequest = async (requestId: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: language === "pt" ? "Solicitação Rejeitada" : language === "en" ? "Request Rejected" : "Solicitud Rechazada",
      description: `${requestId} - ${language === "pt" ? "Notificação enviada ao estudante" : language === "en" ? "Notification sent to student" : "Notificación enviada al estudiante"}`,
      variant: "destructive"
    });
  };

  const generateCorrespondence = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    toast({
      title: language === "pt" ? "Correspondência Gerada!" : language === "en" ? "Correspondence Generated!" : "¡Correspondencia Generada!",
      description: language === "pt" ? "Dados de endereçamento compilados automaticamente" : language === "en" ? "Addressing data compiled automatically" : "Datos de direccionamiento compilados automáticamente"
    });
  };

  // Mock user data
  const mockUser = {
    name: currentUser?.name || "João Silva",
    email: currentUser?.email || "joao.silva@universidade.edu.br",
    role: userRole,
    organization: "Universidade Federal de São Paulo",
    studentId: "20231001234",
    avatar: "/placeholder-avatar.jpg"
  };

  const mockStats = {
    totalRequests: 2847,
    approvedRequests: 2314,
    pendingRequests: 423,
    revokedCards: 110,
    revenueThisMonth: 142375.50,
    activeStudents: 15892,
    validationChecks: 8934,
    apiCalls: 45621,
    averageProcessingTime: 2.3
  };

  const mockRecentRequests = [
    { id: "CIE-2024-001", student: "Maria Santos", status: "approved", date: "2024-01-15", organization: "UFRJ" },
    { id: "CIE-2024-002", student: "Carlos Lima", status: "pending", date: "2024-01-14", organization: "USP" },
    { id: "CIE-2024-003", student: "Ana Costa", status: "processing", date: "2024-01-13", organization: "UFMG" },
    { id: "CIE-2024-004", student: "Pedro Oliveira", status: "rejected", date: "2024-01-12", organization: "UNICAMP" }
  ];

  return (
    <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center space-x-4 hover:opacity-80 smooth-transition">
                <div className="w-8 h-8 hero-gradient rounded-lg flex items-center justify-center">
                  <CreditCard className="h-4 w-4 text-white" />
                </div>
                <h1 className="text-xl font-bold text-foreground">
                  {language === "pt" && "CIE Digital"}
                  {language === "en" && "Digital CIE"}
                  {language === "es" && "CIE Digital"}
                </h1>
              </Link>
              
              <div className="flex items-center space-x-4">
                <Badge variant="secondary" className="hidden sm:flex">
                  {mockUser.role === "student" ? (
                    language === "pt" ? "Estudante" : language === "en" ? "Student" : "Estudiante"
                  ) : (
                    language === "pt" ? "Organização" : language === "en" ? "Organization" : "Organización"
                  )}
                </Badge>
                
                <Button variant="ghost" size="sm">
                  <Bell className="h-4 w-4" />
                </Button>
                
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
                
                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16 border-2 border-primary/20">
                <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                <AvatarFallback className="text-lg font-semibold bg-primary/10">
                  {mockUser.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-1">
                  {language === "pt" && `Bem-vindo, ${mockUser.name.split(' ')[0]}!`}
                  {language === "en" && `Welcome, ${mockUser.name.split(' ')[0]}!`}
                  {language === "es" && `¡Bienvenido, ${mockUser.name.split(' ')[0]}!`}
                </h2>
                <p className="text-muted-foreground flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {mockUser.organization}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={userRole === "student" ? "default" : "secondary"} className="px-3 py-1">
                {mockUser.role === "student" ? (
                  language === "pt" ? "Estudante" : language === "en" ? "Student" : "Estudiante"
                ) : (
                  language === "pt" ? "Organização" : language === "en" ? "Organization" : "Organización"
                )}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setUserRole(userRole === "student" ? "organization" : "student")}
              >
                {language === "pt" ? "Alternar Perfil" : language === "en" ? "Switch Role" : "Cambiar Rol"}
              </Button>
            </div>
          </div>

          {/* Quick Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      {language === "pt" ? "Total de Solicitações" : language === "en" ? "Total Requests" : "Solicitudes Totales"}
                    </p>
                    <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                      {mockStats.totalRequests.toLocaleString()}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600 dark:text-green-400">
                      {language === "pt" ? "Aprovadas" : language === "en" ? "Approved" : "Aprobadas"}
                    </p>
                    <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                      {mockStats.approvedRequests.toLocaleString()}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900 border-yellow-200 dark:border-yellow-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                      {language === "pt" ? "Pendentes" : language === "en" ? "Pending" : "Pendientes"}
                    </p>
                    <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">
                      {mockStats.pendingRequests.toLocaleString()}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
                      {language === "pt" ? "Validações API" : language === "en" ? "API Validations" : "Validaciones API"}
                    </p>
                    <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                      {mockStats.apiCalls.toLocaleString()}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                    <Server className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Dashboard Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6 bg-muted/50">
              <TabsTrigger value="overview" className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {language === "pt" ? "Overview" : language === "en" ? "Overview" : "Resumen"}
                </span>
              </TabsTrigger>
              <TabsTrigger value="requests" className="flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {language === "pt" ? "Solicitações" : language === "en" ? "Requests" : "Solicitudes"}
                </span>
              </TabsTrigger>
              <TabsTrigger value="generation" className="flex items-center space-x-2">
                <QrCode className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {language === "pt" ? "Geração CIE" : language === "en" ? "CIE Generation" : "Generación CIE"}
                </span>
              </TabsTrigger>
              <TabsTrigger value="validation" className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {language === "pt" ? "Validação" : language === "en" ? "Validation" : "Validación"}
                </span>
              </TabsTrigger>
              <TabsTrigger value="api" className="flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {language === "pt" ? "API & Export" : language === "en" ? "API & Export" : "API y Export"}
                </span>
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {language === "pt" ? "Relatórios" : language === "en" ? "Reports" : "Informes"}
                </span>
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {userRole === "student" ? (
                <div className="space-y-6">
                  {/* Student Portal */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="col-span-full lg:col-span-1">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <User className="w-5 h-5" />
                          <span>{language === "pt" ? "Minha Carteira Estudantil" : language === "en" ? "My Student ID" : "Mi Carné Estudiantil"}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-gradient-to-r from-primary to-primary-glow p-6 rounded-lg text-white">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="font-bold text-lg">{mockUser.name}</h3>
                              <p className="opacity-90">{mockUser.studentId}</p>
                            </div>
                            <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                              <QrCode className="w-8 h-8" />
                            </div>
                          </div>
                          <div className="text-sm opacity-90">
                            <p>{mockUser.organization}</p>
                            <p>{language === "pt" ? "Válida até: 31/12/2024" : language === "en" ? "Valid until: 12/31/2024" : "Válida hasta: 31/12/2024"}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button className="flex-1" size="sm" onClick={() => exportData("pdf")} disabled={isExporting}>
                            <Download className="w-4 h-4 mr-2" />
                            {isExporting ? (language === "pt" ? "Baixando..." : language === "en" ? "Downloading..." : "Descargando...") : (language === "pt" ? "Baixar PDF" : language === "en" ? "Download PDF" : "Descargar PDF")}
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <QrCode className="w-4 h-4 mr-2" />
                                {language === "pt" ? "QR Code" : language === "en" ? "QR Code" : "Código QR"}
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>{language === "pt" ? "Código QR da Carteira" : language === "en" ? "Student ID QR Code" : "Código QR del Carné"}</DialogTitle>
                                <DialogDescription>
                                  {language === "pt" ? "Use este código para validação rápida" : language === "en" ? "Use this code for quick validation" : "Usa este código para validación rápida"}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="flex justify-center p-8">
                                <div className="w-48 h-48 bg-white border-2 border-dashed border-gray-300 flex items-center justify-center rounded-lg">
                                  <QrCode className="w-32 h-32 text-gray-600" />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button onClick={() => exportData("qr")}>
                                  <Download className="w-4 h-4 mr-2" />
                                  {language === "pt" ? "Baixar QR" : language === "en" ? "Download QR" : "Descargar QR"}
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Clock className="w-5 h-5" />
                          <span>{language === "pt" ? "Status da Solicitação" : language === "en" ? "Request Status" : "Estado de Solicitud"}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">{language === "pt" ? "Progresso" : language === "en" ? "Progress" : "Progreso"}</span>
                            <span className="text-sm font-medium">{studentProgress}%</span>
                          </div>
                          <Progress value={studentProgress} className="w-full" />
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center space-x-2 text-green-600">
                              <CheckCircle className="w-4 h-4" />
                              <span>{language === "pt" ? "Documentos enviados" : language === "en" ? "Documents submitted" : "Documentos enviados"}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-green-600">
                              <CheckCircle className="w-4 h-4" />
                              <span>{language === "pt" ? "Pagamento confirmado" : language === "en" ? "Payment confirmed" : "Pago confirmado"}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-blue-600">
                              <Clock className="w-4 h-4" />
                              <span>{language === "pt" ? "Em análise" : language === "en" ? "Under review" : "En revisión"}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              <span>{language === "pt" ? "Aguardando aprovação" : language === "en" ? "Awaiting approval" : "Esperando aprobación"}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Organization Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <TrendingUp className="w-5 h-5 text-green-600" />
                          <span>{language === "pt" ? "Receita Mensal" : language === "en" ? "Monthly Revenue" : "Ingresos Mensuales"}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-green-600 mb-2">
                          R$ {mockStats.revenueThisMonth.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {language === "pt" ? "+12.5% vs mês anterior" : language === "en" ? "+12.5% vs last month" : "+12.5% vs mes anterior"}
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Users className="w-5 h-5 text-blue-600" />
                          <span>{language === "pt" ? "Estudantes Ativos" : language === "en" ? "Active Students" : "Estudiantes Activos"}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-blue-600 mb-2">
                          {mockStats.activeStudents.toLocaleString()}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {language === "pt" ? "Carteiras válidas" : language === "en" ? "Valid ID cards" : "Carnés válidos"}
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Zap className="w-5 h-5 text-purple-600" />
                          <span>{language === "pt" ? "Tempo Médio" : language === "en" ? "Avg Processing" : "Tiempo Promedio"}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-purple-600 mb-2">
                          {mockStats.averageProcessingTime} {language === "pt" ? "dias" : language === "en" ? "days" : "días"}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {language === "pt" ? "Processamento automático" : language === "en" ? "Automated processing" : "Procesamiento automático"}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Recent Requests */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <FileText className="w-5 h-5" />
                          <span>{language === "pt" ? "Solicitações Recentes" : language === "en" ? "Recent Requests" : "Solicitudes Recientes"}</span>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => setActiveTab("requests")}>
                          <Plus className="w-4 h-4 mr-2" />
                          {language === "pt" ? "Ver Todas" : language === "en" ? "View All" : "Ver Todas"}
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mockRecentRequests.map((request) => (
                          <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5" />
                              </div>
                              <div>
                                <h4 className="font-semibold">{request.student}</h4>
                                <p className="text-sm text-muted-foreground">{request.id} • {request.organization}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <Badge
                                variant={
                                  request.status === 'approved' ? 'default' :
                                  request.status === 'pending' ? 'secondary' :
                                  request.status === 'processing' ? 'outline' : 'destructive'
                                }
                              >
                                {request.status === 'approved' ? (language === "pt" ? "Aprovada" : language === "en" ? "Approved" : "Aprobada") :
                                 request.status === 'pending' ? (language === "pt" ? "Pendente" : language === "en" ? "Pending" : "Pendiente") :
                                 request.status === 'processing' ? (language === "pt" ? "Processando" : language === "en" ? "Processing" : "Procesando") :
                                 (language === "pt" ? "Rejeitada" : language === "en" ? "Rejected" : "Rechazada")}
                              </Badge>
                              <span className="text-sm text-muted-foreground">{request.date}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>

            {/* Requests Tab */}
            <TabsContent value="requests" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-5 h-5" />
                        <span>{language === "pt" ? "Solicitações de CIE" : language === "en" ? "CIE Requests" : "Solicitudes CIE"}</span>
                      </div>
                      <Dialog open={newRequestDialog} onOpenChange={setNewRequestDialog}>
                        <DialogTrigger asChild>
                          <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            {language === "pt" ? "Nova Solicitação" : language === "en" ? "New Request" : "Nueva Solicitud"}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{language === "pt" ? "Nova Solicitação de CIE" : language === "en" ? "New CIE Request" : "Nueva Solicitud CIE"}</DialogTitle>
                            <DialogDescription>
                              {language === "pt" ? "Preencha os dados do estudante para solicitar uma nova carteira" : language === "en" ? "Fill in student data to request a new ID card" : "Completa los datos del estudiante para solicitar un nuevo carné"}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="student-name">{language === "pt" ? "Nome Completo" : language === "en" ? "Full Name" : "Nombre Completo"}</Label>
                                <Input id="student-name" placeholder={language === "pt" ? "Nome do estudante" : language === "en" ? "Student name" : "Nombre del estudiante"} />
                              </div>
                              <div>
                                <Label htmlFor="student-id">{language === "pt" ? "Matrícula" : language === "en" ? "Student ID" : "Matrícula"}</Label>
                                <Input id="student-id" placeholder="123456789" />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="institution">{language === "pt" ? "Instituição" : language === "en" ? "Institution" : "Institución"}</Label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder={language === "pt" ? "Selecionar" : language === "en" ? "Select" : "Seleccionar"} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="usp">USP</SelectItem>
                                    <SelectItem value="ufrj">UFRJ</SelectItem>
                                    <SelectItem value="ufmg">UFMG</SelectItem>
                                    <SelectItem value="unicamp">UNICAMP</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label htmlFor="course">{language === "pt" ? "Curso" : language === "en" ? "Course" : "Curso"}</Label>
                                <Input id="course" placeholder={language === "pt" ? "Nome do curso" : language === "en" ? "Course name" : "Nombre del curso"} />
                              </div>
                            </div>
                            <div>
                              <Label htmlFor="documents">{language === "pt" ? "Documentos" : language === "en" ? "Documents" : "Documentos"}</Label>
                              <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                                <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                                <p className="text-sm text-gray-600">
                                  {language === "pt" ? "Arraste os arquivos ou clique para fazer upload" : language === "en" ? "Drag files or click to upload" : "Arrastra archivos o haz clic para subir"}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG (máx. 5MB)</p>
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setNewRequestDialog(false)}>
                              {language === "pt" ? "Cancelar" : language === "en" ? "Cancel" : "Cancelar"}
                            </Button>
                            <Button onClick={() => {
                              setNewRequestDialog(false);
                              toast({
                                title: language === "pt" ? "Solicitação Criada!" : language === "en" ? "Request Created!" : "¡Solicitud Creada!",
                                description: language === "pt" ? "Nova solicitação adicionada ao sistema" : language === "en" ? "New request added to system" : "Nueva solicitud agregada al sistema"
                              });
                            }}>
                              {language === "pt" ? "Criar Solicitação" : language === "en" ? "Create Request" : "Crear Solicitud"}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {userRole === "student" ? (
                        <div className="text-center py-12">
                          <CreditCard className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                          <h3 className="text-lg font-semibold mb-2">
                            {language === "pt" ? "Portal do Estudante" : language === "en" ? "Student Portal" : "Portal Estudiantil"}
                          </h3>
                          <p className="text-muted-foreground mb-6">
                            {language === "pt" ? "Solicite sua carteira estudantil digital de forma rápida e segura" :
                             language === "en" ? "Request your digital student ID card quickly and securely" :
                             "Solicita tu carné estudiantil digital de forma rápida y segura"}
                          </p>
                          <Button className="bg-gradient-to-r from-primary to-primary-glow" onClick={() => setActiveTab("requests")}>
                            {language === "pt" ? "Iniciar Solicitação" : language === "en" ? "Start Request" : "Iniciar Solicitud"}
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex space-x-2">
                              <Button
                                variant={requestFilter === "all" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setRequestFilter("all")}
                              >
                                {language === "pt" ? "Todas" : language === "en" ? "All" : "Todas"}
                              </Button>
                              <Button
                                variant={requestFilter === "pending" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setRequestFilter("pending")}
                              >
                                {language === "pt" ? "Pendentes" : language === "en" ? "Pending" : "Pendientes"}
                              </Button>
                              <Button
                                variant={requestFilter === "approved" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setRequestFilter("approved")}
                              >
                                {language === "pt" ? "Aprovadas" : language === "en" ? "Approved" : "Aprobadas"}
                              </Button>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" onClick={refreshData} disabled={refreshing}>
                                <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                                {refreshing ? (language === "pt" ? "Atualizando..." : language === "en" ? "Refreshing..." : "Actualizando...") : (language === "pt" ? "Atualizar" : language === "en" ? "Refresh" : "Actualizar")}
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => exportData("excel")} disabled={isExporting}>
                                <Download className="w-4 h-4 mr-2" />
                                {isExporting ? (language === "pt" ? "Exportando..." : language === "en" ? "Exporting..." : "Exportando...") : (language === "pt" ? "Exportar" : language === "en" ? "Export" : "Exportar")}
                              </Button>
                            </div>
                          </div>
                          {mockRecentRequests.map((request) => (
                            <Card key={request.id}>
                              <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-4">
                                    <Avatar>
                                      <AvatarFallback>{request.student.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <h4 className="font-semibold">{request.student}</h4>
                                      <p className="text-sm text-muted-foreground">{request.id}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-4">
                                    <Badge variant={request.status === 'approved' ? 'default' : request.status === 'pending' ? 'secondary' : 'outline'}>
                                      {request.status}
                                    </Badge>
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <Button variant="ghost" size="sm">
                                          <Settings className="w-4 h-4" />
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent>
                                        <DialogHeader>
                                          <DialogTitle>{language === "pt" ? "Gerenciar Solicitação" : language === "en" ? "Manage Request" : "Gestionar Solicitud"}</DialogTitle>
                                          <DialogDescription>
                                            {language === "pt" ? "Ações disponíveis para" : language === "en" ? "Available actions for" : "Acciones disponibles para"} {request.id}
                                          </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                          <div className="space-y-2">
                                            <h4 className="font-semibold">{language === "pt" ? "Estudante:" : language === "en" ? "Student:" : "Estudiante:"} {request.student}</h4>
                                            <p className="text-sm text-muted-foreground">{language === "pt" ? "Organização:" : language === "en" ? "Organization:" : "Organización:"} {request.organization}</p>
                                            <p className="text-sm text-muted-foreground">{language === "pt" ? "Data:" : language === "en" ? "Date:" : "Fecha:"} {request.date}</p>
                                          </div>
                                          <div className="flex space-x-2">
                                            {request.status === "pending" && (
                                              <>
                                                <Button className="flex-1" onClick={() => approveRequest(request.id)}>
                                                  <CheckCircle className="w-4 h-4 mr-2" />
                                                  {language === "pt" ? "Aprovar" : language === "en" ? "Approve" : "Aprobar"}
                                                </Button>
                                                <Button variant="destructive" className="flex-1" onClick={() => rejectRequest(request.id)}>
                                                  <XCircle className="w-4 h-4 mr-2" />
                                                  {language === "pt" ? "Rejeitar" : language === "en" ? "Reject" : "Rechazar"}
                                                </Button>
                                              </>
                                            )}
                                            {request.status === "approved" && (
                                              <Button className="flex-1" onClick={() => generateCIE()}>
                                                <Zap className="w-4 h-4 mr-2" />
                                                {language === "pt" ? "Gerar CIE" : language === "en" ? "Generate CIE" : "Generar CIE"}
                                              </Button>
                                            )}
                                          </div>
                                          <Button variant="outline" onClick={() => exportData("pdf")}>
                                            <Download className="w-4 h-4 mr-2" />
                                            {language === "pt" ? "Baixar Documentos" : language === "en" ? "Download Documents" : "Descargar Documentos"}
                                          </Button>
                                        </div>
                                      </DialogContent>
                                    </Dialog>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Clock className="w-5 h-5" />
                      <span>{language === "pt" ? "Processamento" : language === "en" ? "Processing" : "Procesamiento"}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{language === "pt" ? "Documentos" : language === "en" ? "Documents" : "Documentos"}</span>
                        <span className="text-green-600">✓</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>{language === "pt" ? "Pagamento" : language === "en" ? "Payment" : "Pago"}</span>
                        <span className="text-green-600">✓</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>{language === "pt" ? "Análise" : language === "en" ? "Review" : "Revisión"}</span>
                        <span className="text-blue-600">⏳</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>{language === "pt" ? "Geração" : language === "en" ? "Generation" : "Generación"}</span>
                        <span className="text-muted-foreground">○</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* CIE Generation Tab */}
            <TabsContent value="generation" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <QrCode className="w-5 h-5" />
                      <span>{language === "pt" ? "Geração Automática de CIE" : language === "en" ? "Automatic CIE Generation" : "Generación Automática CIE"}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-muted/50 p-6 rounded-lg">
                      <h3 className="font-semibold mb-4">
                        {language === "pt" ? "Componentes Gerados Automaticamente" : language === "en" ? "Auto-Generated Components" : "Componentes Generados Automáticamente"}
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Key className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="font-medium">{language === "pt" ? "Código de Uso" : language === "en" ? "Usage Code" : "Código de Uso"}</p>
                            <p className="text-sm text-muted-foreground">{language === "pt" ? "Conforme Lei 12.933/2013" : language === "en" ? "According to Law 12.933/2013" : "Conforme Ley 12.933/2013"}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Shield className="w-5 h-5 text-green-600" />
                          <div>
                            <p className="font-medium">{language === "pt" ? "Chave de Acesso" : language === "en" ? "Access Key" : "Clave de Acceso"}</p>
                            <p className="text-sm text-muted-foreground">{language === "pt" ? "Criptografia avançada" : language === "en" ? "Advanced encryption" : "Encriptación avanzada"}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <QrCode className="w-5 h-5 text-purple-600" />
                          <div>
                            <p className="font-medium">{language === "pt" ? "QR Code" : language === "en" ? "QR Code" : "Código QR"}</p>
                            <p className="text-sm text-muted-foreground">{language === "pt" ? "Validação instantânea" : language === "en" ? "Instant validation" : "Validación instantánea"}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <FileText className="w-5 h-5 text-orange-600" />
                          <div>
                            <p className="font-medium">{language === "pt" ? "Certificado de Atributo X.509" : language === "en" ? "X.509 Attribute Certificate" : "Certificado de Atributo X.509"}</p>
                            <p className="text-sm text-muted-foreground">{language === "pt" ? "Padrão ICP-Brasil (ITI)" : language === "en" ? "ICP-Brasil Standard (ITI)" : "Estándar ICP-Brasil (ITI)"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full" onClick={generateCIE} disabled={isGenerating}>
                      <Zap className={`w-4 h-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
                      {isGenerating ? (language === "pt" ? "Gerando..." : language === "en" ? "Generating..." : "Generando...") : (language === "pt" ? "Iniciar Geração" : language === "en" ? "Start Generation" : "Iniciar Generación")}
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Printer className="w-5 h-5" />
                      <span>{language === "pt" ? "Imagem para Impressão" : language === "en" ? "Print-Ready Image" : "Imagen para Impresión"}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border-2 border-dashed border-muted">
                      <div className="text-center">
                        <CreditCard className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                        <h3 className="font-semibold mb-2">
                          {language === "pt" ? "Prévia da Carteira" : language === "en" ? "Card Preview" : "Vista Previa del Carné"}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {language === "pt" ? "Imagem em alta resolução pronta para impressão" :
                           language === "en" ? "High-resolution image ready for printing" :
                           "Imagen en alta resolución lista para impresión"}
                        </p>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => exportData("png")} disabled={isExporting}>
                            <Download className="w-4 h-4 mr-2" />
                            {language === "pt" ? "Baixar PNG" : language === "en" ? "Download PNG" : "Descargar PNG"}
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => exportData("pdf")} disabled={isExporting}>
                            <Download className="w-4 h-4 mr-2" />
                            {language === "pt" ? "Baixar PDF" : language === "en" ? "Download PDF" : "Descargar PDF"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Validation Tab */}
            <TabsContent value="validation" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Database className="w-5 h-5" />
                      <span>{language === "pt" ? "Base de Dados Pública" : language === "en" ? "Public Database" : "Base de Datos Pública"}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      {language === "pt" ? "Sistema de validação pública para verificar autenticidade das carteiras estudantis." :
                       language === "en" ? "Public validation system to verify the authenticity of student ID cards." :
                       "Sistema de validación pública para verificar la autenticidad de los carnés estudiantiles."}
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded">
                        <span>{language === "pt" ? "Validações hoje" : language === "en" ? "Validations today" : "Validaciones hoy"}</span>
                        <Badge variant="outline">2,847</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded">
                        <span>{language === "pt" ? "Consultas API" : language === "en" ? "API Queries" : "Consultas API"}</span>
                        <Badge variant="outline">15,923</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded">
                        <span>{language === "pt" ? "Taxa de sucesso" : language === "en" ? "Success rate" : "Tasa de éxito"}</span>
                        <Badge variant="default">99.8%</Badge>
                      </div>
                    </div>
                    <Dialog open={validationDialog} onOpenChange={setValidationDialog}>
                      <DialogTrigger asChild>
                        <Button className="w-full" variant="outline">
                          <Globe className="w-4 h-4 mr-2" />
                          {language === "pt" ? "Acessar Portal Público" : language === "en" ? "Access Public Portal" : "Acceder Portal Público"}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{language === "pt" ? "Validador Público de CIE" : language === "en" ? "Public CIE Validator" : "Validador Público CIE"}</DialogTitle>
                          <DialogDescription>
                            {language === "pt" ? "Insira o código da carteira para verificar sua autenticidade" : language === "en" ? "Enter the card code to verify its authenticity" : "Ingresa el código del carné para verificar su autenticidad"}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div>
                            <Label htmlFor="card-code">{language === "pt" ? "Código da Carteira" : language === "en" ? "Card Code" : "Código del Carné"}</Label>
                            <Input
                              id="card-code"
                              placeholder="CIE-2024-XXXX-XXXX"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setValidationDialog(false)}>
                            {language === "pt" ? "Cancelar" : language === "en" ? "Cancel" : "Cancelar"}
                          </Button>
                          <Button onClick={() => {
                            validateCard(searchTerm || "CIE-2024-001234");
                            setValidationDialog(false);
                            setSearchTerm("");
                          }} disabled={isValidating}>
                            <Shield className={`w-4 h-4 mr-2 ${isValidating ? 'animate-spin' : ''}`} />
                            {isValidating ? (language === "pt" ? "Validando..." : language === "en" ? "Validating..." : "Validando...") : (language === "pt" ? "Validar" : language === "en" ? "Validate" : "Validar")}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <AlertTriangle className="w-5 h-5" />
                      <span>{language === "pt" ? "Revogação de Carteiras" : language === "en" ? "Card Revocation" : "Revocación de Carnés"}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      {language === "pt" ? "Gerencie carteiras revogadas e mantenha a base de dados atualizada." :
                       language === "en" ? "Manage revoked cards and keep the database updated." :
                       "Gestiona carnés revocados y mantén la base de datos actualizada."}
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-red-50 rounded border border-red-200">
                        <span className="text-red-700">{language === "pt" ? "Carteiras revogadas" : language === "en" ? "Revoked cards" : "Carnés revocados"}</span>
                        <Badge variant="destructive">{mockStats.revokedCards}</Badge>
                      </div>
                    </div>
                    <Dialog open={revokeDialog} onOpenChange={setRevokeDialog}>
                      <DialogTrigger asChild>
                        <Button className="w-full" variant="destructive">
                          <XCircle className="w-4 h-4 mr-2" />
                          {language === "pt" ? "Revogar Carteira" : language === "en" ? "Revoke Card" : "Revocar Carné"}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{language === "pt" ? "Revogar Carteira Estudantil" : language === "en" ? "Revoke Student ID Card" : "Revocar Carné Estudiantil"}</DialogTitle>
                          <DialogDescription>
                            {language === "pt" ? "Esta ação é irreversível. A carteira será marcada como inválida no sistema." : language === "en" ? "This action is irreversible. The card will be marked as invalid in the system." : "Esta acción es irreversible. El carné será marcado como inválido en el sistema."}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div>
                            <Label htmlFor="revoke-reason">{language === "pt" ? "Motivo da Revogação" : language === "en" ? "Revocation Reason" : "Motivo de Revocación"}</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder={language === "pt" ? "Selecionar motivo" : language === "en" ? "Select reason" : "Seleccionar motivo"} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="graduated">{language === "pt" ? "Formatura" : language === "en" ? "Graduation" : "Graduación"}</SelectItem>
                                <SelectItem value="transfer">{language === "pt" ? "Transferência" : language === "en" ? "Transfer" : "Transferencia"}</SelectItem>
                                <SelectItem value="dropout">{language === "pt" ? "Evasão" : language === "en" ? "Dropout" : "Abandono"}</SelectItem>
                                <SelectItem value="fraud">{language === "pt" ? "Fraude" : language === "en" ? "Fraud" : "Fraude"}</SelectItem>
                                <SelectItem value="other">{language === "pt" ? "Outros" : language === "en" ? "Other" : "Otros"}</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="card-id">{language === "pt" ? "ID da Carteira" : language === "en" ? "Card ID" : "ID del Carné"}</Label>
                            <Input id="card-id" placeholder="CIE-2024-XXXX" />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setRevokeDialog(false)}>
                            {language === "pt" ? "Cancelar" : language === "en" ? "Cancel" : "Cancelar"}
                          </Button>
                          <Button variant="destructive" onClick={() => {
                            setRevokeDialog(false);
                            toast({
                              title: language === "pt" ? "Carteira Revogada" : language === "en" ? "Card Revoked" : "Carné Revocado",
                              description: language === "pt" ? "A carteira foi revogada com sucesso" : language === "en" ? "The card has been successfully revoked" : "El carné ha sido revocado exitosamente",
                              variant: "destructive"
                            });
                          }}>
                            <XCircle className="w-4 h-4 mr-2" />
                            {language === "pt" ? "Confirmar Revogação" : language === "en" ? "Confirm Revocation" : "Confirmar Revocación"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* API & Export Tab */}
            <TabsContent value="api" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Server className="w-5 h-5" />
                      <span>{language === "pt" ? "API para Apps Mobile" : language === "en" ? "Mobile App API" : "API para Apps Móviles"}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      {language === "pt" ? "API RESTful para integração com aplicações mobile de validação de carteiras." :
                       language === "en" ? "RESTful API for integration with mobile card validation applications." :
                       "API RESTful para integración con aplicaciones móviles de validación de carnés."}
                    </p>
                    <div className="bg-muted/50 p-4 rounded font-mono text-sm">
                      <div className="text-green-600">GET</div>
                      <div>https://api.cie-digital.com/v1/validate</div>
                      <div className="mt-2 text-blue-600">POST</div>
                      <div>https://api.cie-digital.com/v1/cards</div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => {
                        window.open("https://docs.cie-digital.com/api", "_blank");
                        toast({
                          title: language === "pt" ? "Documentação Aberta" : language === "en" ? "Documentation Opened" : "Documentación Abierta",
                          description: language === "pt" ? "Acesse a documentação completa da API" : language === "en" ? "Access the complete API documentation" : "Accede a la documentación completa de la API"
                        });
                      }}>
                        <FileText className="w-4 h-4 mr-2" />
                        {language === "pt" ? "Documentação" : language === "en" ? "Documentation" : "Documentación"}
                      </Button>
                      <Dialog open={apiKeyDialog} onOpenChange={setApiKeyDialog}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Key className="w-4 h-4 mr-2" />
                            {language === "pt" ? "API Key" : language === "en" ? "API Key" : "Clave API"}
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{language === "pt" ? "Chave da API" : language === "en" ? "API Key" : "Clave de la API"}</DialogTitle>
                            <DialogDescription>
                              {language === "pt" ? "Use esta chave para autenticar suas requisições" : language === "en" ? "Use this key to authenticate your requests" : "Usa esta clave para autenticar tus solicitudes"}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                              <Input
                                value="cie_sk_test_51H7qYc2eZvKYlo2C9rKd8bFpUZfR1ZvKYlo2C9rKd8bF"
                                readOnly
                                className="font-mono text-sm"
                              />
                              <Button size="sm" onClick={copyApiKey}>
                                {copiedApiKey ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                              </Button>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              <p>⚠️ {language === "pt" ? "Mantenha sua API key segura e não a compartilhe publicamente" : language === "en" ? "Keep your API key secure and don't share it publicly" : "Mantén tu clave API segura y no la compartas públicamente"}</p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Download className="w-5 h-5" />
                      <span>{language === "pt" ? "Exportar Dados" : language === "en" ? "Export Data" : "Exportar Datos"}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      {language === "pt" ? "Exporte listas de carteiras emitidas em diferentes formatos." :
                       language === "en" ? "Export lists of issued cards in different formats." :
                       "Exporta listas de carnés emitidos en diferentes formatos."}
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" size="sm" onClick={() => exportData("csv")} disabled={isExporting}>
                        <Download className="w-4 h-4 mr-2" />
                        CSV
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => exportData("excel")} disabled={isExporting}>
                        <Download className="w-4 h-4 mr-2" />
                        Excel
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => exportData("pdf")} disabled={isExporting}>
                        <Download className="w-4 h-4 mr-2" />
                        PDF
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => exportData("json")} disabled={isExporting}>
                        <Download className="w-4 h-4 mr-2" />
                        JSON
                      </Button>
                    </div>
                    <Button className="w-full" onClick={generateCorrespondence} disabled={isExporting}>
                      <Mail className="w-4 h-4 mr-2" />
                      {isExporting ? (language === "pt" ? "Gerando..." : language === "en" ? "Generating..." : "Generando...") : (language === "pt" ? "Gerar Correspondência" : language === "en" ? "Generate Correspondence" : "Generar Correspondencia")}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BarChart3 className="w-5 h-5" />
                      <span>{language === "pt" ? "Analytics" : language === "en" ? "Analytics" : "Analíticos"}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-2">
                          {((mockStats.approvedRequests / mockStats.totalRequests) * 100).toFixed(1)}%
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {language === "pt" ? "Taxa de aprovação" : language === "en" ? "Approval rate" : "Tasa de aprobación"}
                        </p>
                      </div>
                      <Progress value={(mockStats.approvedRequests / mockStats.totalRequests) * 100} />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5" />
                      <span>{language === "pt" ? "Crescimento" : language === "en" ? "Growth" : "Crecimiento"}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">+24.5%</div>
                        <p className="text-sm text-muted-foreground">
                          {language === "pt" ? "Crescimento mensal" : language === "en" ? "Monthly growth" : "Crecimiento mensual"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Globe className="w-5 h-5" />
                      <span>{language === "pt" ? "Infraestrutura" : language === "en" ? "Infrastructure" : "Infraestructura"}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-2">99.9%</div>
                        <p className="text-sm text-muted-foreground">
                          {language === "pt" ? "Uptime da nuvem" : language === "en" ? "Cloud uptime" : "Tiempo activo en la nube"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>{language === "pt" ? "Relatórios Mensais" : language === "en" ? "Monthly Reports" : "Informes Mensuales"}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <BarChart3 className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      {language === "pt" ? "Relatórios Detalhados" : language === "en" ? "Detailed Reports" : "Informes Detallados"}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {language === "pt" ? "Visualize estatísticas completas, tendências e insights do sistema" :
                       language === "en" ? "View complete statistics, trends and system insights" :
                       "Visualiza estadísticas completas, tendencias e insights del sistema"}
                    </p>
                    <Button onClick={() => exportData("report")} disabled={isExporting}>
                      <Download className="w-4 h-4 mr-2" />
                      {isExporting ? (language === "pt" ? "Gerando..." : language === "en" ? "Generating..." : "Generando...") : (language === "pt" ? "Gerar Relatório" : language === "en" ? "Generate Report" : "Generar Informe")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
  );
};

export default Dashboard;