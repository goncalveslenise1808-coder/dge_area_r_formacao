import React from "react";
import { RenderHistoricoItem } from "./RenderHistoricoItem";

interface HistoricoProcessoProps {
    title: string;
    pedido: {
        eventos?: any[];
        anexos?: any[];
        etapa_atual?: string;
    };
    mostrar: "eventos" | "anexos" | "etapa_atual";
}

export default function HistoricoProcesso({
  title,
  pedido,
  mostrar,
}: HistoricoProcessoProps) {
    const renderItens = () => {
        if (mostrar === "eventos" && pedido.eventos) {
            const validos = pedido.eventos.filter(
                (e) => e.titulo || e.descricao || e.data
            );

            if (validos.length === 0) {
                return (
                    <p className="text-sm text-muted-foreground">
                        Nenhum evento disponível.
                    </p>
                );
            }

            return validos.map((item, idx) => (
                <RenderHistoricoItem
                    key={`evento-${idx}`}
                    item={item}
                    idx={idx}
                    tipo="eventos"
                />
            ));
        }

        if (mostrar === "anexos" && pedido.anexos) {
            const validos = pedido.anexos.filter((a) => a.titulo || a.descricao);

            if (validos.length === 0) {
                return (
                    <p className="text-sm text-muted-foreground">Nenhum anexo disponível.</p>
                );
            }

            return validos.map((item, idx) => (
                <RenderHistoricoItem
                    key={`anexo-${idx}`}
                    item={item}
                    idx={idx}
                    tipo="anexos"
                />
            ));
        }

        if (mostrar === "etapa_atual" && pedido.etapa_atual) {
            return (
                <RenderHistoricoItem
                    key="etapa-atual"
                    item={{ titulo: pedido.etapa_atual }}
                    idx={-1}
                    tipo="etapa_atual"
                />
            );
        }

        return (
            <p className="text-sm text-muted-foreground">Nenhum item disponível.</p>
        );
    };

    return (
        <div>
            <h4 className="font-bold mb-4">{title}</h4>
            <div className="space-y-4">{renderItens()}</div>
        </div>
    );
}
