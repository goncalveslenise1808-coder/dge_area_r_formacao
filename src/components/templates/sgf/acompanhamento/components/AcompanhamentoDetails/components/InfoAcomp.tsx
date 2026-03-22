import {IProcesso} from "@/services/equivalencia/getEquivalencia/interface/type";
import {formatarData} from "@/lib/utils";

export function InfoAcompanhamento({
   pedido
}:{
    pedido: IProcesso
}){
    return(
        <div className='bg-muted/20 rounded-xl border-2 border-muted/30 gap-4 p-4 space-y-5'>
            <div className="flex flex-wrap gap-x-6 gap-y-5 text-sm">
                {pedido?.detalhes &&
                    Object.entries(pedido.detalhes).map(([chave, valor]) => (
                        <div key={chave} className="inline-flex whitespace-nowrap">
                            <strong className="mr-1">{chave}:</strong> <span>{valor}</span>
                        </div>
                    ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="flex items-center gap-2">
                    <span className="text-sm">
                       <strong>Data Submissão:</strong> {formatarData(pedido.data_inicio)}
                    </span>
                </div>
            </div>
        </div>
    )
}