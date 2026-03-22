'use server'
import {customGlobalFetch} from "@/lib/customGlobalFetch";
import {mapperProcesso} from "@/services/equivalencia/getEquivalencia/mapper";
import {customFetchDominio} from "@/lib/customFetchDominio";
import {IProcessoSend} from "@/services/equivalencia/getEquivalencia/interface/interface-data_pdd_enviado";

interface GetDataEquivalenciaParams {
    numero?: string;
    app_dad?: string;
    pessoa_id?: number;
    entidade_nif?: string;
    tipo?: string;
    user_id?: number;
    user_email?: string;
}

export async function getDataEquivalencia(props: GetDataEquivalenciaParams) {
    try {
        const {pessoa_id, app_dad, tipo} = props;
        const params = new URLSearchParams();

        if (pessoa_id) params.append("pessoa_id", String(pessoa_id));
        if (app_dad) params.append("app_dad", app_dad);
        if (tipo) params.append("tipo", tipo);

        const data = await customGlobalFetch<any>(
            `/process/find?${params.toString()}`,
            {method: "GET"}
        );

        // validação
        if (!Array.isArray(data)) {
            console.error("Resposta inválida da API:", data);
            return [];
        }

        return data.map(mapperProcesso);

    } catch (error) {
        console.error("Erro ao buscar processos:", error);
        return [];
    }
}

export async function getPedidoEnviadoForProcesso({numero}: { numero: string }) {
    try {
        if (numero == null || numero == "") return

        const data = await customFetchDominio<IProcessoSend>(
            `/pedidos/processo/${numero}`,
            {
                method: "GET",
            }
        );

        if (!data) return

        return data
    } catch (e) {
        console.error(e)
    }

}