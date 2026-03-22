import {Button} from "@/components/atoms/button";
import {Download, MessageSquare} from "lucide-react";
import {IProcesso} from "@/services/equivalencia/getEquivalencia/interface/type";

export function AcompanhamentoAction({
    pedido
}:{
    pedido: IProcesso
}){
    return(
        <div className="flex flex-col sm:flex-row gap-3">
            {pedido.estado === 'CANCELADO' && (
                <Button
                    className="flex-1 h-10 bg-green-600 hover:bg-green-700 text-white border-2 border-green-500 font-semibold shadow-lg">
                    <Download className="w-4 h-4 mr-2"/>
                    Download Certificado
                </Button>
            )}
            <Button variant="outline" className="flex-1 h-10 border-2 font-semibold">
                <MessageSquare className="w-4 h-4 mr-2"/>
                Contactar Suporte
            </Button>
        </div>
    )
}