"use client";

import { createContext, useEffect, useMemo, useState } from "react";
import {
    IAlertaEmail,
    IAlertasResponse,
} from "@/services/notification/type";
import { putReadAlert } from "@/services/notification";

export interface INotificationViewProps {
    alertas: IAlertasResponse | null | undefined;
    alertasFiltrados: IAlertaEmail[];
    safeSelected: IAlertaEmail | null;
    filtroLeitura: string;
    filtroAssunto: string;
    arquivada: boolean;

    setArquivada: (v: boolean) => void;
    updateQueryParams: (updates: Record<string, any>) => void;

    handleSelectAlerta: (alerta: IAlertaEmail) => Promise<void>;

    mutateAlertas: (
        next:
            | IAlertasResponse
            | ((prev: IAlertasResponse | null) => IAlertasResponse | null)
    ) => void;
}

export const ThemeContext = createContext<INotificationViewProps | null>(null);

export function NotificationProvider({
     children,
     alertas,
     mutateAlertas,
     arquivada,
     setArquivada
 }: {
    children: React.ReactNode;
    alertas?: IAlertasResponse | null | undefined;
    mutateAlertas: (
        next:
            | IAlertasResponse
            | ((prev: IAlertasResponse | null) => IAlertasResponse | null)
    ) => void;
    arquivada: boolean;
    setArquivada: (v: boolean) => void;
}) {

    const [selectedAlerta, setSelectedAlerta] = useState<IAlertaEmail | null>(null);
    const [filtroLeitura, setFiltroLeitura] = useState("todas");
    const [filtroAssunto, setFiltroAssunto] = useState("");

    async function handleSelectAlerta(alerta: IAlertaEmail) {
        setSelectedAlerta(alerta);

        if (alerta.flagLeitura === "NAO") {
            mutateAlertas((prev) => {
                if (!prev) return prev;

                const updated = prev.ativas.map(a =>
                    a.id === alerta.id ? { ...a, flagLeitura: "SIM" as const } : a
                );

                return { ...prev, ativas: updated };
            });

            try {
                await putReadAlert({ id: alerta.id });
            } catch {
                mutateAlertas((prev) => {
                    if (!prev) return prev;

                    const rollback = prev.ativas.map(a =>
                        a.id === alerta.id ? { ...a, flagLeitura: "NAO" as const } : a
                    );

                    return { ...prev, ativas: rollback };
                });
            }
        }
    }

    const alertasFiltrados = useMemo(() => {
        if (!alertas) return [];

        const listaBase = arquivada ? alertas.arquivadas : alertas.ativas;

        return listaBase.filter(a => {
            const leituraMatch =
                filtroLeitura === "todas" ||
                a.flagLeitura === filtroLeitura.toUpperCase();

            const assuntoMatch =
                filtroAssunto === "" ||
                a.assunto.toLowerCase().includes(filtroAssunto.toLowerCase());

            return leituraMatch && assuntoMatch;
        });

    }, [alertas, arquivada, filtroLeitura, filtroAssunto]);

    useEffect(() => {
        setSelectedAlerta(null);
    }, [arquivada]);

    const safeSelected =
        selectedAlerta &&
        alertasFiltrados.some(a => a.id === selectedAlerta.id)
            ? selectedAlerta
            : null;

    return (
        <ThemeContext.Provider
            value={{
                alertas,
                mutateAlertas,

                alertasFiltrados,
                safeSelected,
                filtroLeitura,
                filtroAssunto,

                arquivada,
                setArquivada,

                updateQueryParams: (params) => {
                    if (params.leitura !== undefined) setFiltroLeitura(params.leitura);
                    if (params.assunto !== undefined) setFiltroAssunto(params.assunto);
                },

                handleSelectAlerta,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}
