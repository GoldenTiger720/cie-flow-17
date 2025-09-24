import React, { useState } from "react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Plus
} from "lucide-react";
import { StudentPortal } from "@/components/dashboard/StudentPortal";
import { OrganizationPanel } from "@/components/dashboard/OrganizationPanel";
import { CIERequestForm } from "@/components/dashboard/CIERequestForm";
import { useTheme } from "@/contexts/ThemeContext";

const Dashboard = () => {
  const { language } = useTheme();
  const [activeTab, setActiveTab] = useState("overview");
  const [userRole, setUserRole] = useState("student"); // Mock user role - can be "student" or "organization"

  // Mock user data
  const mockUser = {
    name: "João Silva",
    email: "joao.silva@universidade.edu.br",
    role: userRole,
    organization: "Universidade Federal de São Paulo",
    studentId: "20231001234"
  };

  const mockStats = {
    totalRequests: 1250,
    approvedRequests: 987,
    pendingRequests: 143,
    revokedCards: 12,
    revenueThisMonth: 98750.00
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 hero-gradient rounded-lg flex items-center justify-center">
                  <CreditCard className="h-4 w-4 text-white" />
                </div>
                <h1 className="text-xl font-bold text-foreground">
                  {language === "pt" && "CIE Digital"}
                  {language === "en" && "Digital CIE"}
                  {language === "es" && "CIE Digital"}
                </h1>
              </div>
              
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
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              {language === "pt" && `Bem-vindo, ${mockUser.name.split(' ')[0]}!`}
              {language === "en" && `Welcome, ${mockUser.name.split(' ')[0]}!`}
              {language === "es" && `¡Bienvenido, ${mockUser.name.split(' ')[0]}!`}
            </h2>
            <p className="text-muted-foreground">
              {mockUser.organization}
            </p>
          </div>

          {/* Role Toggle for Demo */}
          <div className="mb-6">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Demo Mode</h3>
                  <p className="text-sm text-muted-foreground">Switch between student and organization views</p>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant={userRole === "student" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setUserRole("student")}
                  >
                    Student View
                  </Button>
                  <Button 
                    variant={userRole === "organization" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setUserRole("organization")}
                  >
                    Organization View
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Dashboard Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-4">
              <TabsTrigger value="overview">
                {language === "pt" && "Visão Geral"}
                {language === "en" && "Overview"}
                {language === "es" && "Resumen"}
              </TabsTrigger>
              <TabsTrigger value={userRole === "student" ? "requests" : "management"}>
                {userRole === "student" ? (
                  language === "pt" ? "Solicitações" : language === "en" ? "Requests" : "Solicitudes"
                ) : (
                  language === "pt" ? "Gestão" : language === "en" ? "Management" : "Gestión"
                )}
              </TabsTrigger>
              <TabsTrigger value="documents">
                {language === "pt" && "Documentos"}
                {language === "en" && "Documents"}
                {language === "es" && "Documentos"}
              </TabsTrigger>
              <TabsTrigger value="reports">
                {language === "pt" && "Relatórios"}
                {language === "en" && "Reports"}
                {language === "es" && "Informes"}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {userRole === "student" ? (
                <StudentPortal user={mockUser} />
              ) : (
                <OrganizationPanel stats={mockStats} />
              )}
            </TabsContent>

            <TabsContent value={userRole === "student" ? "requests" : "management"} className="space-y-6">
              {userRole === "student" ? (
                <CIERequestForm />
              ) : (
                <OrganizationPanel stats={mockStats} activeView="management" />
              )}
            </TabsContent>

            <TabsContent value="documents" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>
                      {language === "pt" && "Documentos"}
                      {language === "en" && "Documents"}
                      {language === "es" && "Documentos"}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {language === "pt" && "Gerencie seus documentos e certificados digitais."}
                    {language === "en" && "Manage your documents and digital certificates."}
                    {language === "es" && "Gestiona tus documentos y certificados digitales."}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>
                      {language === "pt" && "Relatórios e Analytics"}
                      {language === "en" && "Reports & Analytics"}
                      {language === "es" && "Informes y Analytics"}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {language === "pt" && "Visualize estatísticas e relatórios detalhados."}
                    {language === "en" && "View statistics and detailed reports."}
                    {language === "es" && "Visualiza estadísticas e informes detallados."}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Dashboard;