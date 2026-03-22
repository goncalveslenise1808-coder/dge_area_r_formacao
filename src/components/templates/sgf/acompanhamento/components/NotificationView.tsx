'use client';

import { Bell, Inbox, Mail, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/atoms/scroll-area";
import { SheetHeader, SheetTitle } from "@/components/atoms/sheet";
import { EmptyState } from "@/components/organisms/EmptyState";
import { ListNotification } from "@/components/organisms/Header/Notification/components/listNotification";
import { Button } from "@/components/atoms/button";
import { putStatusNotification } from "@/services/notification";
import { toast } from "sonner";
import { useContext } from "react";
import { ThemeContext } from "@/components/organisms/Header/Notification/context/NotificationContext";
import { Filter } from "@/components/organisms/Header/Notification/components/filter";
import {formatarData} from "@/lib/utils";

export function NotificationView() {

    const context = useContext(ThemeContext);
    if (!context) return null;

    const {
        alertasFiltrados,
        safeSelected,
        handleSelectAlerta,
        filtroLeitura,
        filtroAssunto,
        updateQueryParams,
        mutateAlertas,
        arquivada
    } = context;

    async function handleStatusNotification(id: number, status: string) {
        try {
            const res = await putStatusNotification({ id, status });
            if (!res) return;

            toast.success("Operação executada com sucesso!");

            mutateAlertas(prev => {
                if (!prev) return prev;

                const isArquivar = status === "ARQUIVADA";
                const isDelete = status === "DELETE";

                const removeFromAtivas = prev.ativas.filter(a => a.id !== id);
                const removeFromArquivadas = prev.arquivadas.filter(a => a.id !== id);

                if (isArquivar) {
                    const alerta = prev.ativas.find(a => a.id === id);
                    if (!alerta) return prev;

                    return {
                        ...prev,
                        ativas: removeFromAtivas,
                        arquivadas: [...prev.arquivadas, { ...alerta, statusNotificacao: "ARQUIVADA" }]
                    };
                }

                if (isDelete) {
                    return {
                        ...prev,
                        ativas: removeFromAtivas,
                        arquivadas: removeFromArquivadas
                    };
                }

                return prev;
            });

        } catch (error) {
            console.log(error);
            toast.error("Erro ao alterar estado!");
        }
    }

    return (
        <div className="h-full">
            {alertasFiltrados.length > 0 ? (
                <div className="flex h-full">
                    <div className="h-full">

                        <SheetHeader className="px-6 py-6">
                            <SheetTitle className="flex gap-4 items-center">
                                <Bell size={20} />
                                {arquivada ? "Notificações Arquivadas" : "Notificações Ativas"}
                            </SheetTitle>
                        </SheetHeader>

                        <div className="flex flex-1 h-full">

                            {/* LISTA */}
                            <div className="w-1/3 flex flex-col justify-between h-[90%]">
                                <ListNotification
                                    alertasFiltrados={alertasFiltrados}
                                    selectedAlerta={safeSelected}
                                    handleSelectAlerta={handleSelectAlerta}
                                />

                                <Filter
                                    filtroLeitura={filtroLeitura}
                                    filtroAssunto={filtroAssunto}
                                    updateQueryParams={updateQueryParams}
                                />
                            </div>

                            {/* CONTEÚDO */}
                            <ScrollArea className="flex-1 px-6">
                                {safeSelected ? (
                                    <div className="flex flex-col gap-4">
                                        <div className='flex gap-4'>
                                            {!arquivada && (
                                                <Button
                                                    onClick={() => handleStatusNotification(safeSelected.id, "ARQUIVADA")}
                                                    className='bg-transparent text-black/60 border-b-2 border-black/10 hover:border-black/60 rounded-none'
                                                >
                                                    Arquivar
                                                    <Inbox className="w-4 h-4 ml-2" />
                                                </Button>
                                            )}

                                            <Button
                                                onClick={() => handleStatusNotification(safeSelected.id, "DELETE")}
                                                className='bg-transparent text-black/60 border-b-2 border-black/10 hover:border-red-400 hover:text-red-400 rounded-none'
                                            >
                                                Eliminar
                                                <Trash2 className="w-4 h-4 ml-2" />
                                            </Button>

                                        </div>
                                        <div className="flex justify-end gap-2">
                                            <span className="font-light text-[10px]"> {formatarData(safeSelected?.dataEnvio, true)}</span>
                                        </div>

                                       <div>
                                           <h2 className="text-2xl font-light">{safeSelected.assunto}</h2>
                                         {/*  <div className="flex justify-end gap-2">
                                               <span className="font-light text-[10px]"> {formatarData(safeSelected?.dataEnvio, true)}</span>
                                           </div>*/}
                                       </div>

                                        <div
                                            className="text-justify text-sm/6 font-light"
                                            dangerouslySetInnerHTML={{ __html: safeSelected.mensagem }}
                                        />

                                    </div>
                                ) : (
                                    <div className="flex flex-col justify-center items-center mt-40">
                                        <Mail className="w-1/2 h-1/2 text-gray-200" />
                                        <p className="text-gray-400">
                                            Selecione uma notificação para ver os detalhes
                                        </p>
                                    </div>
                                )}
                            </ScrollArea>

                        </div>
                    </div>
                </div>
            ) : (
                <EmptyState title="Nenhuma notificação encontrada!" />
            )}
        </div>
    );
}
