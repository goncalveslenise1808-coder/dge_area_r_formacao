'use client';

import React from 'react';
import {Card, CardContent} from '@/components/atoms/card';
import {Badge} from '@/components/atoms/badge';
import {Progress} from '@/components/atoms/progress';
import {Carousel, CarouselContent, CarouselItem,} from "@/components/atoms/carousel";

import {formatarData} from "@/lib/utils";
import {IProcesso} from "@/services/equivalencia/getEquivalencia/interface/type";
import {useIsMobile} from "@/hooks/use-mobile";

interface AcompanhamentoListProps {
    pedidos: IProcesso[];
    selectedPedido: any;
    setSelectedPedido?: (pedido: any) => void;
    statusConfig: any;
}

type AppDad = "PEDIDO_EQUIV" | "PEDIDO_RVCC" | "MANIFESTACAO_INTERESSE";

export function AcompanhamentoList(props: AcompanhamentoListProps) {
    const {pedidos, selectedPedido, setSelectedPedido, statusConfig} = props;

    const isMobile = useIsMobile();

    // controle de quantidade visível
    const [visibleCount, setVisibleCount] = React.useState(5);

    if (!pedidos || pedidos.length === 0) return null;

    const appMap: Record<AppDad, string> = {
        PEDIDO_EQUIV: "Processo Equivalência",
        PEDIDO_RVCC: "Processo RVCC",
        MANIFESTACAO_INTERESSE: "Processo Manifestação de Interesse",
    };

    const getAppLabel = (tipo: string) => {
        return appMap[tipo as AppDad] ?? "Processo Desconhecido";
    };

    const handleLoadMore = () => setVisibleCount((prev) => prev + 5);
    const handleHide = () => setVisibleCount(5); // botão “Ocultar”

    const pedidosVisiveis = pedidos.slice(0, visibleCount);

    const renderCard = (pedido: IProcesso) => {
        const statusInfo = statusConfig[pedido?.estado];
        const EtapaIconComponent = statusInfo?.icon;
        const app = getAppLabel(pedido.tipo);

        return (
            <Card
                key={pedido.numero}
                className={`cursor-pointer transition-all duration-300 hover:shadow-xl dark:bg-[#1d293d]
                ${pedido.numero === selectedPedido?.numero
                    ? 'border-primary/50 dark:border-primary bg-primary/5 dark:bg-[#021232]'
                    : ''}`}
                onClick={() => setSelectedPedido?.(pedido)}
            >
                <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                            <p className="font-bold text-sm mb-1">
                                {`${app} Nº ${pedido.numero}`}
                            </p>
                            <div className="flex justify-between w-full">
                                <p className="text-xs text-muted-foreground mb-2">
                                    {pedido.titulo}
                                </p>
                                <p className="text-xs text-muted-foreground mb-2">
                                    {formatarData(pedido.data_inicio)}
                                </p>
                            </div>
                        </div>
                        <Badge className={`${statusInfo?.color} border-2 font-medium text-xs gap-2`}>
                            {EtapaIconComponent && (
                                <EtapaIconComponent className={`w-4 h-4 ${statusInfo?.color}`}/>
                            )}
                            {statusInfo?.label}
                        </Badge>
                    </div>

                    {pedido?.percentagem !== undefined && (
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                                <span>Progresso</span>
                                <span>{pedido.percentagem}%</span>
                            </div>
                            <Progress value={pedido.percentagem} className="h-2"/>
                            <p className="text-xs text-muted-foreground">{pedido.estado_desc}</p>
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
                    <>
                        <Carousel opts={{align: "start"}}>
                            <CarouselContent>
                                {pedidosVisiveis.map((pedido) => (
                                    <CarouselItem key={pedido.numero} className="basis-[85%] pl-2">
                                        {renderCard(pedido)}
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>

                        {visibleCount < pedidos.length && (
                            <button
                                onClick={handleLoadMore}
                                className="w-full text-sm font-medium text-primary hover:underline mt-2"
                            >
                                Ver mais...
                            </button>
                        )}

                        {visibleCount > 5 && (
                            <button
                                onClick={handleHide}
                                className="w-full text-sm font-medium text-muted-foreground hover:underline mt-1"
                            >
                                Ocultar
                            </button>
                        )}
                    </>
                ) : (
                    <div className="space-y-4">
                        {pedidosVisiveis.map((pedido) => renderCard(pedido))}

                        {visibleCount < pedidos.length && (
                            <button
                                onClick={handleLoadMore}
                                className="w-full text-sm font-medium text-primary hover:underline mt-2"
                            >
                                Ver mais...
                            </button>
                        )}

                        {visibleCount > 5 && (
                            <button
                                onClick={handleHide}
                                className="w-full text-sm font-medium text-muted-foreground hover:underline mt-1"
                            >
                                Ocultar
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}