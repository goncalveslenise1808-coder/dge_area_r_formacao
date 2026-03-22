'use server'
import {customFetchDominio} from "@/lib/customFetchDominio";
import { USE_MOCK_DATA } from "@/services/mock/data";

export interface IGetReclamacaoProps {
    numeroProcesso: number,
    numeroApresentacao: number,
    paisObtencao: string,
    instituicaoFtp: string,
    cargaHoraria: number,
    dataDespacho: string,
    despacho: string,
    podeAlterarSolic: boolean,
    messagemEstado: string
}

// Dados mock para reclamação
const mockReclamacao: IGetReclamacaoProps = {
    numeroProcesso: 1,
    numeroApresentacao: 1,
    paisObtencao: "Portugal",
    instituicaoFtp: "Universidade de Lisboa",
    cargaHoraria: 400,
    dataDespacho: "2024-02-01",
    despacho: "Deferido",
    podeAlterarSolic: true,
    messagemEstado: "Processo em análise"
};

export async function getReclamacao({n_processo}: {n_processo: string}) {
    // Usar dados mock em desenvolvimento
    if (USE_MOCK_DATA) {
        return mockReclamacao;
    }

    try {
        const data = await customFetchDominio<IGetReclamacaoProps>(
            `/pedidos/processo/reclamacao/${n_processo}`, {
                method: "GET",
            });

        return data ?? mockReclamacao;
    } catch (error) {
        console.error("Erro ao buscar reclamação:", error);
        return mockReclamacao; // Fallback para mock
    }
}

interface ReclamacaoProps {
    n_processo: string;
    observacao: string;
    decisao: number;
}

export async function postReclamacao({
     n_processo,
     observacao,
     decisao,
 }: ReclamacaoProps) {
    // Em modo mock, simular sucesso
    if (USE_MOCK_DATA) {
        return { success: true, message: "Reclamação enviada com sucesso" };
    }

    try {
        const formData = new FormData();
        formData.append("anexo", "");

        const data = await customFetchDominio(
            `/reclamacao/${n_processo}?observacao=${encodeURIComponent(observacao)}&decisao=${decisao}`,
            {
                method: "POST",
                body: formData,
            }
        );

        return data;
    } catch (error) {
        console.error("Erro ao enviar reclamação:", error);
        return { success: false, message: "Erro ao enviar reclamação" };
    }
}

