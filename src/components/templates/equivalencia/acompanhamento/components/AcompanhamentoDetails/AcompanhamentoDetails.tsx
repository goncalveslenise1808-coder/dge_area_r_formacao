'use client';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/atoms/card';
import {Badge} from '@/components/atoms/badge';
import {Progress} from '@/components/atoms/progress';
import {IProcesso} from "@/services/equivalencia/getEquivalencia/interface/type";
import {formatarData} from "@/lib/utils";
import HistoricoProcesso from "@/components/templates/equivalencia/acompanhamento/components/HistoricoProcesso";
import {
    Comunicacoes
} from "@/components/templates/equivalencia/acompanhamento/components/AcompanhamentoDetails/components/Comunicacoes";
import {
    AcompanhamentoAction
} from "@/components/templates/equivalencia/acompanhamento/components/AcompanhamentoDetails/actions/AcompanhamentoAction";

export function AcompanhamentoDetails({
                                          pedido,
                                          statusConfig,
                                      }: {
    pedido: IProcesso,
    statusConfig: any,
}) {
    const statusInfo = statusConfig[pedido?.estado];
    const EtapaIconComponent = statusInfo?.icon;

    const tipoLabelMap: Record<string, string> = {
        PEDIDO_EQUIV: "Processo Equivalência",
        PEDIDO_RVCC: "Processo RVCC",
        MANIFESTACAO_INTERESSE: "Manifestação de Interesse",
    };

    const app = tipoLabelMap[pedido.tipo] ?? "Tipo desconhecido";

    return (
        <div className="lg:col-span-2">
            <Card className="dark:bg-[#1d293d]">
                <CardHeader>
                    <div className="flex items-start justify-between">
                        <div>
                            <CardTitle className="text-xl">{`${app} Nº ${pedido.numero}`}</CardTitle>
                            <p className="text-muted-foreground">{pedido.descricao}</p>
                        </div>
                        <Badge className={`${statusInfo?.color ?? ''} border-2 font-medium text-xs gap-2`}>
                            {EtapaIconComponent && (
                                <EtapaIconComponent className={`w-5 h-5 bg-transparent ${statusInfo?.color}`}/>
                            )}
                            {statusInfo?.label ?? pedido.estado ?? "Sem estado"}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    {pedido?.percentagem && (
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="font-semibold">Progresso Geral</span>
                                <span className="font-semibold">{pedido.percentagem}%</span>
                            </div>
                            <Progress value={pedido.percentagem} className="h-4 border-2"/>
                            <div className="flex justify-between text-sm text-muted-foreground">
                                <span>Etapa Atual: {pedido.etapa_atual}</span>

                                {pedido.data_fim && pedido?.estado != 'FINALIZADO' && (
                                    <span>Prazo Estimado: {formatarData(pedido.data_fim_previsto)}</span>
                                )}
                            </div>
                        </div>
                    )}
                    {/*<InfoAcompanhamento pedido={pedido}/>*/}

                    {/* Historico do Processo */}
                    <HistoricoProcesso title="Eventos do Processo" pedido={pedido} mostrar="eventos"/>
                    <HistoricoProcesso title="" pedido={pedido} mostrar="etapa_atual"/>
                    <HistoricoProcesso title="Anexos do Processo" pedido={pedido} mostrar="anexos"/>

                    {/* Etapa Atual */}
                    <Comunicacoes pedido={pedido}/>

                    {/* Botoes */}
                    <AcompanhamentoAction pedido={pedido}/>
                </CardContent>
            </Card>
        </div>
    );
}