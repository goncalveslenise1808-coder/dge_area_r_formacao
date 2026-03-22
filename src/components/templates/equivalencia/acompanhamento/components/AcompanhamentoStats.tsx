'use client';
import {Card, CardContent} from '@/components/atoms/card';
import {Ban, CheckCircle, Clock, FileText} from 'lucide-react';

export function AcompanhamentoStats({
                                        totalPedidos,
                                        pedidosEmAnalise,
                                        pedidosPendente,
                                        pedidosAprovados,
                                        pedidosCancelados
                                    }: {
    totalPedidos: number,
    pedidosEmAnalise: number,
    pedidosPendente: number,
    pedidosAprovados: number,
    pedidosCancelados: number
}) {

    const stats = [
        {
            label: 'Total Pedidos',
            value: totalPedidos,
            icon: FileText,
            color: 'text-primary',
        },
        {
            label: 'Em Progresso',
            value: pedidosEmAnalise,
            icon: Clock,
            color: 'text-blue-600',
        },
        {
            label: 'Pendente',
            value: pedidosPendente,
            icon: Clock,
            color: 'text-yellow-600',
        },
        {
            label: 'Concluído',
            value: pedidosAprovados,
            icon: CheckCircle,
            color: 'text-green-600',
        },
        {
            label: 'Cancelados',
            value: pedidosCancelados,
            icon: Ban,
            color: 'text-red-600',
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {stats
                .filter(stat => stat.value) // remove os que são 0/null
                .map((stat, index) => {
                    const Icon = stat.icon;

                    return (
                        <Card key={index} className='dark:bg-[#1d293d]'>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-muted-foreground text-sm font-medium">
                                            {stat.label}
                                        </p>
                                        <p className={`text-3xl font-bold ${stat.color}`}>
                                            {stat.value}
                                        </p>
                                    </div>
                                    <Icon className={`w-8 h-8 ${stat.color}`}/>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
        </div>
    );
}