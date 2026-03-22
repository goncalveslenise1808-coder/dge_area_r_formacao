"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/atoms/card";
import { Badge } from "@/components/atoms/badge";
import { mockProcessos, mockPessoaInfo } from "@/services/mock/data";
import { FileText, Clock, CheckCircle, AlertCircle, TrendingUp, Users, BookOpen, Award } from "lucide-react";

export default function DashboardTemplate() {
  // Estatísticas baseadas nos dados mock
  const stats = {
    totalProcessos: mockProcessos.length,
    emAndamento: mockProcessos.filter(p => p.estado === "ANDAMENTO").length,
    pendentes: mockProcessos.filter(p => p.estado === "PENDENTE").length,
    concluidos: mockProcessos.filter(p => p.estado === "CONCLUIDO").length,
  };

  return (
    <div className="space-y-6">
      {/* Header de Boas-vindas */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">
          Bem-vindo(a), {mockPessoaInfo.nome.split(" ")[0]}
        </h1>
        <p className="text-muted-foreground">
          Acompanhe as suas formações e processos no sistema de gestão de formação.
        </p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Processos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProcessos}</div>
            <p className="text-xs text-muted-foreground">
              Todos os seus processos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.emAndamento}</div>
            <p className="text-xs text-muted-foreground">
              Processos em análise
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendentes}</div>
            <p className="text-xs text-muted-foreground">
              Aguardando ação
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Concluídos</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.concluidos}</div>
            <p className="text-xs text-muted-foreground">
              Processos finalizados
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Processos Recentes */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Processos Recentes
            </CardTitle>
            <CardDescription>
              Últimos processos registados no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockProcessos.map((processo) => (
                <div
                  key={processo.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-sm">{processo.titulo}</span>
                    <span className="text-xs text-muted-foreground">
                      {processo.numero} - {processo.data_inicio}
                    </span>
                  </div>
                  <Badge
                    variant={
                      processo.estado === "CONCLUIDO"
                        ? "default"
                        : processo.estado === "ANDAMENTO"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {processo.estado_desc}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Informações do Perfil */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Os Seus Dados
            </CardTitle>
            <CardDescription>
              Informações do seu perfil
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm text-muted-foreground">Nome Completo</span>
                <span className="text-sm font-medium">{mockPessoaInfo.nome}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm text-muted-foreground">Email</span>
                <span className="text-sm font-medium">{mockPessoaInfo.email}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm text-muted-foreground">Telefone</span>
                <span className="text-sm font-medium">{mockPessoaInfo.telefone}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm text-muted-foreground">NIF</span>
                <span className="text-sm font-medium">{mockPessoaInfo.nif}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm text-muted-foreground">Nacionalidade</span>
                <span className="text-sm font-medium">{mockPessoaInfo.nacionalidade}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-muted-foreground">Concelho</span>
                <span className="text-sm font-medium">{mockPessoaInfo.concelho}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cards de Ações Rápidas */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base">Manifestação de Interesse</CardTitle>
              <CardDescription>Inscreva-se em novas formações</CardDescription>
            </div>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <FileText className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <CardTitle className="text-base">Acompanhamento</CardTitle>
              <CardDescription>Veja o estado dos seus processos</CardDescription>
            </div>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <Award className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <CardTitle className="text-base">Certificados</CardTitle>
              <CardDescription>Aceda aos seus certificados</CardDescription>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
