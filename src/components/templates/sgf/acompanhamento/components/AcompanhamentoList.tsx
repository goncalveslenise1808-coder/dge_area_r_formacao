'use client';
import {Card, CardContent} from '@/components/atoms/card';
import {Badge} from '@/components/atoms/badge';
import {Progress} from '@/components/atoms/progress';
import {IProcesso} from "@/services/equivalencia/getEquivalencia/interface/type";
import {formatarData} from "@/lib/utils";
import {useIsMobile} from "@/hooks/use-mobile";
import useEmblaCarousel from "embla-carousel-react";

interface AcompanhamentoListProps {
    pedidos: IProcesso[],
    selectedPedido: any,
    setSelectedPedido?: (pedido: any) => void,
    statusConfig?: any
}

export function AcompanhamentoList(props: AcompanhamentoListProps) {
    const {pedidos, selectedPedido, setSelectedPedido, statusConfig} = props;
    const isMobile = useIsMobile();

    const [emblaRef] = useEmblaCarousel({
        align: 'start',
        dragFree: true
    });

    const renderCard = (pedido: any) => {
        const statusInfo = statusConfig[pedido?.estado];
        const EtapaIconComponent = statusInfo?.icon;

        return (
            <Card
                key={pedido.numero}
                className={`min-w-[85%] mr-4 cursor-pointer transition-all duration-300
                ${pedido.numero === selectedPedido.numero ? 'border-primary/50 bg-primary/5' : ''}`}
                onClick={() => setSelectedPedido?.(pedido)}
            >
                <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                            <p className="font-bold text-sm mb-1">
                                Pedido Nº {pedido.numero}
                            </p>

                            <div className='flex justify-between w-full'>
                                <p className="text-xs text-muted-foreground">
                                    {pedido.titulo}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {formatarData(pedido.data_inicio)}
                                </p>
                            </div>
                        </div>

                        <Badge className={`${statusInfo?.color} border-2 text-xs gap-2`}>
                            <EtapaIconComponent className="w-4 h-4"/>
                            {statusInfo?.label}
                        </Badge>
                    </div>

                    {pedido?.percentagem && (
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                                <span>Progresso</span>
                                <span>{pedido.percentagem}%</span>
                            </div>
                            <Progress value={pedido.percentagem} className="h-2"/>
                            <p className="text-xs text-muted-foreground">
                                {pedido.estado_desc}
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        );
    };

    return (
        <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">

                <h3 className="text-xl font-bold">Meus Pedidos</h3>

                {isMobile ? (
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex">
                            {pedidos?.map(renderCard)}
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {pedidos?.map(renderCard)}
                    </div>
                )}
            </div>
        </div>
    );
}
