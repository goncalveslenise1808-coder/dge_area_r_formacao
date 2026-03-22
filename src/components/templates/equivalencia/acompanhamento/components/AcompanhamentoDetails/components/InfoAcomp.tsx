import {IProcesso} from "@/services/equivalencia/getEquivalencia/interface/type";
import {formatarData} from "@/lib/utils";

export function InfoAcompanhamento({
                                       pedido
                                   }: {
    pedido: IProcesso
}) {

    const detalhes = pedido?.detalhes ? Object.entries(pedido.detalhes) : [];

    return (
        <div className='bg-muted/20 rounded-xl border p-4 space-y-6'>

            {/* DETALHES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {detalhes.map(([chave, valor]) => (
                    <div key={chave} className="flex flex-col text-sm">
                        <span className="text-muted-foreground text-xs">
                            {chave}
                        </span>
                        <span className="font-medium break-words">
                            {valor || '-'}
                        </span>
                    </div>
                ))}
            </div>

            {/* DATA */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm border-t pt-4">
                <span className="text-muted-foreground">
                    Data de Submissão
                </span>
                <span className="font-medium">
                    {formatarData(pedido.data_inicio)}
                </span>
            </div>

        </div>
    )
}