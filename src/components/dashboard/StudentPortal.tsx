import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CreditCard, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  DollarSign,
  FileText,
  Eye,
  Download
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface StudentPortalProps {
  user: {
    name: string;
    email: string;
    role: string;
    organization: string;
    studentId: string;
  };
}

export const StudentPortal = ({ user }: StudentPortalProps) => {
  const { language } = useTheme();

  // Mock student requests data
  const mockRequests = [
    {
      id: "CIE-2024-001",
      type: "Nova Carteira",
      status: "approved",
      submittedDate: "2024-01-15",
      approvedDate: "2024-01-16",
      amount: 35.00,
      qrCode: "https://cie.gov.br/validate/abc123"
    },
    {
      id: "CIE-2024-002", 
      type: "Segunda Via",
      status: "processing",
      submittedDate: "2024-01-20",
      amount: 20.00,
      progress: 65
    },
    {
      id: "CIE-2024-003",
      type: "Renovação",
      status: "pending_payment",
      submittedDate: "2024-01-22",
      amount: 35.00
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      approved: {
        variant: "default" as const,
        text: {
          pt: "Aprovada",
          en: "Approved", 
          es: "Aprobada"
        },
        icon: <CheckCircle className="h-3 w-3" />
      },
      processing: {
        variant: "secondary" as const,
        text: {
          pt: "Em Processamento",
          en: "Processing",
          es: "En Procesamiento"
        },
        icon: <Clock className="h-3 w-3" />
      },
      pending_payment: {
        variant: "destructive" as const,
        text: {
          pt: "Pagamento Pendente",
          en: "Pending Payment",
          es: "Pago Pendiente"
        },
        icon: <AlertCircle className="h-3 w-3" />
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

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === "pt" && "Carteiras Ativas"}
              {language === "en" && "Active Cards"}
              {language === "es" && "Tarjetas Activas"}
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">
              {language === "pt" && "Válida até 12/2025"}
              {language === "en" && "Valid until 12/2025"}
              {language === "es" && "Válida hasta 12/2025"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === "pt" && "Solicitações"}
              {language === "en" && "Requests"}
              {language === "es" && "Solicitudes"}
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockRequests.length}</div>
            <p className="text-xs text-muted-foreground">
              {language === "pt" && "Total de solicitações"}
              {language === "en" && "Total requests"}
              {language === "es" && "Total de solicitudes"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === "pt" && "Gasto Total"}
              {language === "en" && "Total Spent"}
              {language === "es" && "Gasto Total"}
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 90,00</div>
            <p className="text-xs text-muted-foreground">
              {language === "pt" && "Últimos 12 meses"}
              {language === "en" && "Last 12 months"}
              {language === "es" && "Últimos 12 meses"}
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
              <CreditCard className="h-4 w-4 mr-2" />
              {language === "pt" && "Nova CIE"}
              {language === "en" && "New CIE"}
              {language === "es" && "Nueva CIE"}
            </Button>
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              {language === "pt" && "Segunda Via"}
              {language === "en" && "Duplicate"}
              {language === "es" && "Duplicado"}
            </Button>
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              {language === "pt" && "Validar CIE"}
              {language === "en" && "Validate CIE"}
              {language === "es" && "Validar CIE"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Requests */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === "pt" && "Minhas Solicitações"}
            {language === "en" && "My Requests"}
            {language === "es" && "Mis Solicitudes"}
          </CardTitle>
          <CardDescription>
            {language === "pt" && "Acompanhe o status das suas solicitações de CIE"}
            {language === "en" && "Track the status of your CIE requests"}
            {language === "es" && "Rastrea el estado de tus solicitudes de CIE"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockRequests.map((request) => (
              <div key={request.id} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{request.id}</span>
                      {getStatusBadge(request.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">{request.type}</p>
                    <p className="text-xs text-muted-foreground">
                      {language === "pt" && "Enviado em"} {request.submittedDate}
                    </p>
                    {request.progress && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progresso</span>
                          <span>{request.progress}%</span>
                        </div>
                        <Progress value={request.progress} className="h-2" />
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="font-medium">R$ {request.amount.toFixed(2)}</div>
                    <div className="flex space-x-2 mt-2">
                      {request.status === "approved" && (
                        <Button size="sm" variant="outline">
                          <Download className="h-3 w-3 mr-1" />
                          PDF
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3 mr-1" />
                        {language === "pt" && "Ver"}
                        {language === "en" && "View"}
                        {language === "es" && "Ver"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};