'use client';
import {useContext} from 'react';
import {AlertTriangle, CheckCircle, Clock, RefreshCw} from 'lucide-react';
import {AcompanhamentoStats} from './components/AcompanhamentoStats';
import {AcompanhamentoList} from './components/AcompanhamentoList';
import {AcompanhamentoDetails} from './components/AcompanhamentoDetails/AcompanhamentoDetails';
import {EmptyState} from "@/components/organisms/EmptyState";
import {CardInfo} from "@/components/organisms/CardInfo/CardInfo";
import {EquivalenciaCreateContext} from "@/components/templates/equivalencia/pedido/context/EquivalenciaContext";

const statusConfig = {
    EM_PROGRESSO: {
        label: 'Em Progresso',
        icon: Clock,
        color: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20',
    },
    FINALIZADO: {
        label: 'Concluído',
        icon: CheckCircle,
        color: 'bg-green-500/10 text-green-700 dark:text-green-300 border-green-500/20',
    },
    CANCELADO: {
        label: 'Cancelado',
        icon: AlertTriangle,
        color: 'bg-red-500/10 text-red-700 dark:text-red-300 border-red-500/20',
    },
    PENDENTE: {
        label: 'Pendente',
        icon: Clock,
        color: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-300 border-yellow-500/20',
    },
};

export const etapaStatusConfig = {
    anexos: {
        icon: CheckCircle,
        color: 'text-green-600',
        bgColor: 'bg-green-500/10 border-green-500/20'
    },
    etapa_atual: {
        icon: RefreshCw,
        color: 'text-blue-600',
        bgColor: 'bg-blue-500/10 border-blue-500/20'
    },
    eventos: {
        icon: CheckCircle,
        color: 'text-green-600',
        bgColor: 'bg-green-500/10 border-green-500/20'
    }
};

export function EquivalenciaAcompanhamentoTemplate() {
    const context = useContext(EquivalenciaCreateContext);
    const {data, selectedPedido, setSelectedPedido} = context || {}

    const pedidosEmAnalise = data?.filter(p => p.estado === 'EM_PROGRESSO').length;
    const pedidosPendente = data?.filter(p => p.estado === 'PENDENTE').length;
    const pedidosAprovados = data?.filter(p => p.estado === 'FINALIZADO').length;
    const pedidosCancelados = data?.filter(p => p.estado === 'CANCELADO').length;

    console.log("========================");
    console.log({data: data});
    console.log("========================");
    return (
        <div className="space-y-8">
            {
                data && data.length ? (
                    <>
                        <AcompanhamentoStats
                            totalPedidos={data.length}
                            pedidosEmAnalise={pedidosEmAnalise || 0}
                            pedidosPendente={pedidosPendente || 0}
                            pedidosAprovados={pedidosAprovados || 0}
                            pedidosCancelados={pedidosCancelados || 0}
                        />

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <AcompanhamentoList
                                pedidos={data}
                                selectedPedido={selectedPedido}
                                setSelectedPedido={setSelectedPedido}
                                statusConfig={statusConfig}
                            />

                            {selectedPedido && (
                                <AcompanhamentoDetails
                                    pedido={selectedPedido || []}
                                    statusConfig={statusConfig}
                                />
                            )}
                        </div>

                        {/* Informações sobre o Processo */}
                        <CardInfo
                            icon={AlertTriangle}
                            title={'Informações sobre o Processo'}
                            items={[
                                'O processo de equivalência pode demorar entre 30 a 60 dias úteis',
                                'Receberás notificações por email sobre mudanças de estado',
                                'Podes contactar o suporte para esclarecimentos adicionais',
                                'Documentos adicionais podem ser solicitados durante o processo',
                                'O certificado de equivalência fica disponível permanentemente na tua área'
                            ]}
                        />
                    </>
                ) : (
                    <EmptyState title={'Nenhum pedido encontrado'} description={'Nenhum pedido encontrado'}/>
                )
            }
        </div>
    );
}