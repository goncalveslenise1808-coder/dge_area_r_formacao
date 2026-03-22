"use client";

import {Sheet, SheetContent,} from "@/components/atoms/sheet";
import {IAlertasResponse} from "@/services/notification/type";
import {Archive, Inbox} from "lucide-react";
import {useState} from "react";
import {TooltipNotification} from "@/components/organisms/Header/Notification/components/Tooltip";
import {NotificationView} from "@/components/templates/equivalencia/acompanhamento/components/NotificationView";
import {NotificationProvider} from "@/components/organisms/Header/Notification/context/NotificationContext";

interface AlertaProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    alertas: IAlertasResponse | null | undefined;
    mutateAlertas: (
        next:
            | IAlertasResponse
            | ((prev: IAlertasResponse | null) => IAlertasResponse | null)
    ) => void;
}

export function Notification({
                                 open,
                                 setOpen,
                                 alertas,
                                 mutateAlertas,
                             }: AlertaProps) {

    const [arquivada, setArquivada] = useState<boolean>(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent
                className="lg:max-w-[1000px] w-[80%] rounded-s-lg flex flex-col bg-card p-0 dark:bg-[#1d293d]">

                <div className="h-full flex">
                    <div className="h-full flex flex-col gap-4 py-4 border-r-2">

                        <TooltipNotification
                            className={`${!arquivada ? "border-l-4 border-primary" : ""}`}
                            title="Caixa de Entrada"
                            handleArquivada={() => setArquivada(false)}
                            icon={<Inbox className="w-5 h-5 dark:text-white"/>}
                        />

                        <TooltipNotification
                            className={`${arquivada ? "border-l-4 border-primary" : ""}`}
                            title="Arquivadas"
                            handleArquivada={() => setArquivada(true)}
                            icon={<Archive className="w-5 h-5 dark:text-white"/>}
                        />
                    </div>

                    <NotificationProvider
                        alertas={alertas}
                        mutateAlertas={mutateAlertas}
                        arquivada={arquivada}
                        setArquivada={setArquivada}
                    >
                        <div className="w-full h-full">
                            <NotificationView/>
                        </div>
                    </NotificationProvider>

                </div>
            </SheetContent>
        </Sheet>
    );
}
