'use client';
import {IProcesso} from "@/services/equivalencia/getEquivalencia/interface/type";
import {CalendarDays, MessageSquare} from "lucide-react";
import {formatarData} from "@/lib/utils";
import {Button} from "@/components/atoms/button";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {
    ModalReclamacaoTemplate
} from "@/components/templates/equivalencia/acompanhamento/components/AcompanhamentoDetails/components/ModalReclamacao";
import {useEffect, useState} from "react";
import {getReclamacao, IGetReclamacaoProps} from "@/services/reclamacao";

export function Comunicacoes({pedido}: { pedido: IProcesso }) {
    const urlBase = process.env.NEXT_PUBLIC_CENTRAL_BASE_URL || "https://dge-central-base.vercel.app";
    const pathname = usePathname();
    const parts = pathname.split("/").filter(Boolean);
    const tipo = parts[0];
    const jovem = parts[1];
    const [reclamacaoDate, setReclamacaoDate] = useState<IGetReclamacaoProps>();
    const [refetchReclamacao, setRefetchReclamacao] = useState<boolean>(false);

    useEffect(() => {
        async function Reclamacao() {
            const data = await getReclamacao({n_processo: pedido?.numero});
            setReclamacaoDate(data)
        }

        Reclamacao();
    }, [pedido?.numero, refetchReclamacao]);

    return (
        <div className="bg-blue-500/5 rounded-xl p-4 border-2 border-blue-500/20 overflow-hidden">
            <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-blue-600"/>
                <p className="text-foreground font-semibold">Comunicações do Processo</p>
            </div>

            {/* lista de comunicações */}
            <div className="space-y-4">
                {pedido?.comunicacoes?.map((cmc, index: number) => (
                    <div
                        key={index}
                        className="bg-white border border-blue-200 dark:bg-[#1d293d] dark:border-white/15 rounded-lg shadow-sm p-4 hover:shadow-md transition-all"
                    >
                        <div>
                            {/* Cabeçalho */}
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="w-9/12 text-sm font-semibold dark:text-white">
                                    {cmc.titulo}
                                </h3>
                                <div className="flex items-center text-gray-500 text-xs">
                                    <CalendarDays className="w-4 h-4 mr-1"/>
                                    {formatarData(cmc.datetime)}
                                </div>
                            </div>

                            {/* Descrição */}
                            <p className="text-gray-700 text-sm mb-3 leading-snug dark:text-white">
                                {cmc.descricao}
                            </p>

                            <div className='flex gap-4'>
                                {cmc.urls?.map((url, idx: number) => {

                                    if (url.target === "NOVA_ABA" || url.target === "SELF") {
                                        return (
                                            <Link
                                                key={idx}
                                                href={`${urlBase}/${tipo}/${jovem}${url.url}`}
                                            >
                                                <Button>{url.titulo}</Button>
                                            </Link>
                                        );
                                    }

                                    if (url.target === "MODAL") {
                                        return (
                                            <ModalReclamacaoTemplate
                                                key={idx}
                                                dataR={reclamacaoDate}
                                                setRefetchReclamacao={setRefetchReclamacao}
                                            >
                                                <Button>{url.titulo}</Button>
                                            </ModalReclamacaoTemplate>
                                        );
                                    }
                                    return null;
                                })}
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
