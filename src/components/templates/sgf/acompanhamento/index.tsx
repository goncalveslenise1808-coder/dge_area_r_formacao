'use client';
import {useContext} from 'react';
import {AlertTriangle, Calendar, CheckCircle, CircleCheck, CircleSlash, Clock, FileText} from 'lucide-react';
import {AcompanhamentoList} from './components/AcompanhamentoList';
import {AcompanhamentoDetails} from './components/AcompanhamentoDetails/AcompanhamentoDetails';
import {EmptyState} from "@/components/organisms/EmptyState";
import {CardInfo} from "@/components/organisms/CardInfo/CardInfo";
import {EquivalenciaCreateContext} from "@/components/templates/equivalencia/pedido/context/EquivalenciaContext";
import {TrainingStatsCards} from "@/components/organisms/TrainingStatsCards";

const statusConfig = {
    EM_PROGRESSO: {
        label: 'Em Progresso',
        icon: Clock,
        color: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20',
    },
    FINALIZADO: {
        label: 'Concluido',
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

export function AcompanhamentoManifestacaoTemplate() {
    const context = useContext(EquivalenciaCreateContext);
    const {data, selectedPedido, setSelectedPedido} = context || {}

    const pedidosEmAnalise = data?.filter(p => p.estado === 'PENDENTE').length;
    const pedidosAprovados = data?.filter(p => p.estado === 'FINALIZADO').length;
    const pedidosCancelados = data?.filter(p => p.estado === 'CANCELADO').length;

    const statusCard = [data?.length, pedidosEmAnalise, pedidosAprovados, pedidosCancelados]

    return (
        <div className="space-y-8">
            {
                data && data.length ? (
                    <>
                        <TrainingStatsCards
                            values={statusCard}
                            titles={['Total Pedidos', 'Em Análise', 'Aprovados', 'Cancelados']}
                            icons={[Calendar, FileText, CircleCheck, CircleSlash]}
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