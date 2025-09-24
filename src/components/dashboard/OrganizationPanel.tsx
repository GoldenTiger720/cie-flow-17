import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  CreditCard, 
  DollarSign, 
  TrendingUp,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Download,
  Filter,
  Search,
  QrCode,
  FileX,
  Printer
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface OrganizationPanelProps {
  stats: {
    totalRequests: number;
    approvedRequests: number;
    pendingRequests: number;
    revokedCards: number;
    revenueThisMonth: number;
  };
  activeView?: string;
}

export const OrganizationPanel = ({ stats, activeView = "overview" }: OrganizationPanelProps) => {
  const { language } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock CIE requests data for organization
  const mockRequests = [
    {
      id: "CIE-2024-001",
      student: {
        name: "Ana Silva",
        email: "ana.silva@universidade.edu.br",
        studentId: "20231001234"
      },
      type: "Nova Carteira",
      status: "pending",
      submittedDate: "2024-01-23T10:30:00Z",
      amount: 35.00,
      documents: ["rg.pdf", "comprovante-matricula.pdf", "foto.jpg"]
    },
    {
      id: "CIE-2024-002",
      student: {
        name: "Carlos Santos", 
        email: "carlos.santos@universidade.edu.br",
        studentId: "20231001235"
      },
      type: "Segunda Via",
      status: "approved", 
      submittedDate: "2024-01-22T14:15:00Z",
      approvedDate: "2024-01-23T09:00:00Z",
      amount: 20.00,
      qrCode: "https://cie.gov.br/validate/xyz789",
      cieNumber: "SP123456789"
    },
    {
      id: "CIE-2024-003",
      student: {
        name: "Maria Oliveira",
        email: "maria.oliveira@universidade.edu.br", 
        studentId: "20231001236"
      },
      type: "Renovação",
      status: "rejected",
      submittedDate: "2024-01-21T16:45:00Z",
      rejectedDate: "2024-01-22T11:30:00Z",
      amount: 35.00,
      rejectionReason: "Documento de identidade ilegível"
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: {
        variant: "secondary" as const,
        text: { pt: "Pendente", en: "Pending", es: "Pendiente" },
        icon: <Clock className="h-3 w-3" />
      },
      approved: {
        variant: "default" as const,
        text: { pt: "Aprovada", en: "Approved", es: "Aprobada" },
        icon: <CheckCircle className="h-3 w-3" />
      },
      rejected: {
        variant: "destructive" as const,
        text: { pt: "Rejeitada", en: "Rejected", es: "Rechazada" },
        icon: <XCircle className="h-3 w-3" />
      }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge variant={config.variant} className="flex items-center space-x-1">
        {config.icon}
        <span>{config.text[language as keyof typeof config.text]}</span>
      </Badge>
    );
  };

  if (activeView === "management") {
    return (
      <div className="space-y-6">
        {/* Management Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h3 className="text-2xl font-bold text-foreground">
              {language === "pt" && "Gestão de Solicitações"}
              {language === "en" && "Request Management"}
              {language === "es" && "Gestión de Solicitudes"}
            </h3>
            <p className="text-muted-foreground">
              {language === "pt" && "Aprove, rejeite e gerencie solicitações de CIE"}
              {language === "en" && "Approve, reject and manage CIE requests"}
              {language === "es" && "Aprueba, rechaza y gestiona solicitudes de CIE"}
            </p>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              {language === "pt" && "Exportar"}
              {language === "en" && "Export"}
              {language === "es" && "Exportar"}
            </Button>
            <Button className="hero-gradient text-white">
              <Printer className="h-4 w-4 mr-2" />
              {language === "pt" && "Imprimir Lote"}
              {language === "en" && "Batch Print"}
              {language === "es" && "Imprimir Lote"}
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={language === "pt" ? "Buscar por nome ou ID..." : "Search by name or ID..."}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant={filterStatus === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("all")}
                >
                  {language === "pt" && "Todas"}
                  {language === "en" && "All"}
                  {language === "es" && "Todas"}
                </Button>
                <Button
                  variant={filterStatus === "pending" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("pending")}
                >
                  {language === "pt" && "Pendentes"}
                  {language === "en" && "Pending"}
                  {language === "es" && "Pendientes"}
                </Button>
                <Button
                  variant={filterStatus === "approved" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("approved")}
                >
                  {language === "pt" && "Aprovadas"}
                  {language === "en" && "Approved"}
                  {language === "es" && "Aprobadas"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Requests List */}
        <div className="space-y-4">
          {mockRequests.map((request) => (
            <Card key={request.id} className="card-shadow hover:institutional-shadow smooth-transition">
              <CardContent className="pt-6">
                <div className="flex flex-col lg:flex-row justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center space-x-3">
                      <span className="font-mono text-sm bg-secondary px-2 py-1 rounded">
                        {request.id}
                      </span>
                      {getStatusBadge(request.status)}
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-lg">{request.student.name}</h4>
                      <p className="text-sm text-muted-foreground">{request.student.email}</p>
                      <p className="text-xs text-muted-foreground">
                        {language === "pt" && "Matrícula:"} {request.student.studentId}
                      </p>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{request.type}</span>
                      <span>•</span>
                      <span>R$ {request.amount.toFixed(2)}</span>
                      <span>•</span>
                      <span>
                        {new Date(request.submittedDate).toLocaleDateString(language === "pt" ? "pt-BR" : "en-US")}
                      </span>
                    </div>

                    {request.status === "approved" && (
                      <div className="flex items-center space-x-2 text-sm">
                        <QrCode className="h-4 w-4 text-accent" />
                        <span className="text-muted-foreground">CIE: {request.cieNumber}</span>
                      </div>
                    )}

                    {request.status === "rejected" && (
                      <div className="bg-destructive/10 border border-destructive/20 rounded p-3">
                        <p className="text-sm text-destructive font-medium">
                          {language === "pt" && "Motivo da rejeição:"}
                          {language === "en" && "Rejection reason:"}
                          {language === "es" && "Motivo del rechazo:"}
                        </p>
                        <p className="text-sm text-destructive/80">{request.rejectionReason}</p>
                      </div>
                    )}
                  </div>

                  <div className="lg:w-48 flex flex-col space-y-2">
                    {request.status === "pending" && (
                      <>
                        <Button className="hero-gradient text-white" size="sm">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {language === "pt" && "Aprovar"}
                          {language === "en" && "Approve"}
                          {language === "es" && "Aprobar"}
                        </Button>
                        <Button variant="destructive" size="sm">
                          <XCircle className="h-3 w-3 mr-1" />
                          {language === "pt" && "Rejeitar"}
                          {language === "en" && "Reject"}
                          {language === "es" && "Rechazar"}
                        </Button>
                      </>
                    )}
                    
                    {request.status === "approved" && (
                      <>
                        <Button variant="outline" size="sm">
                          <Download className="h-3 w-3 mr-1" />
                          {language === "pt" && "Baixar CIE"}
                          {language === "en" && "Download CIE"}
                          {language === "es" && "Descargar CIE"}
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileX className="h-3 w-3 mr-1" />
                          {language === "pt" && "Revogar"}
                          {language === "en" && "Revoke"}
                          {language === "es" && "Revocar"}
                        </Button>
                      </>
                    )}
                    
                    <Button variant="outline" size="sm">
                      <Eye className="h-3 w-3 mr-1" />
                      {language === "pt" && "Detalhes"}
                      {language === "en" && "Details"}
                      {language === "es" && "Detalles"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === "pt" && "Total de Solicitações"}
              {language === "en" && "Total Requests"}
              {language === "es" && "Total de Solicitudes"}
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRequests.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +12% {language === "pt" ? "este mês" : "this month"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === "pt" && "Aprovadas"}
              {language === "en" && "Approved"}
              {language === "es" && "Aprobadas"}
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.approvedRequests.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((stats.approvedRequests / stats.totalRequests) * 100)}% {language === "pt" ? "taxa de aprovação" : "approval rate"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === "pt" && "Pendentes"}
              {language === "en" && "Pending"}
              {language === "es" && "Pendientes"}
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingRequests}</div>
            <p className="text-xs text-muted-foreground">
              {language === "pt" && "Requer ação"}
              {language === "en" && "Requires action"}
              {language === "es" && "Requiere acción"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === "pt" && "Receita do Mês"}
              {language === "en" && "Monthly Revenue"}
              {language === "es" && "Ingresos del Mes"}
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {stats.revenueThisMonth.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">
              +8% {language === "pt" ? "vs mês anterior" : "vs last month"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === "pt" && "Ações Rápidas"}
            {language === "en" && "Quick Actions"}
            {language === "es" && "Acciones Rápidas"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button className="hero-gradient text-white">
              <CheckCircle className="h-4 w-4 mr-2" />
              {language === "pt" && "Revisar Pendentes"}
              {language === "en" && "Review Pending"}
              {language === "es" && "Revisar Pendientes"}
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              {language === "pt" && "Exportar Relatório"}
              {language === "en" && "Export Report"}
              {language === "es" && "Exportar Informe"}
            </Button>
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              {language === "pt" && "Validador Público"}
              {language === "en" && "Public Validator"}
              {language === "es" && "Validador Público"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};