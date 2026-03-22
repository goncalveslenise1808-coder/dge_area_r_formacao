'use server'
import {customFetch} from "@/lib/customFetch";
import {mapMotivosFalta, mapperListaAusencia} from "@/services/ausencias/getListAusencia/mapper";
import {IAusenciaList, MotivoFalta} from "@/services/ausencias/getListAusencia/type";
import {customFetchBaseAPI} from "@/lib/customFetchBaseAPI";
import { mockAusencias, mockMotivosFalta, USE_MOCK_DATA } from "@/services/mock/data";

export async function getListAusencia({
    pessoaId,
    selectedCandidateId
 }:{
    pessoaId: number
    selectedCandidateId?: number
}){
    // Usar dados mock em desenvolvimento
    if (USE_MOCK_DATA) {
        return mockAusencias;
    }

    try {
        const data = await customFetch<IAusenciaList[]>(
            `/ausencia/lista/${pessoaId}?selectedCandidateId=${selectedCandidateId}`,

            {
                method: "GET",
            }
        );
        return mapperListaAusencia(data);
    }catch (error: any){
        if (error.status === 404) {
            return mockAusencias; // Fallback para mock
        }
        console.error("Erro ao buscar ausências:", error);
        return mockAusencias; // Fallback para mock
    }
}

export async function getMotivosFalta({
  dad,
  domains,
}: {
    dad: string;
    domains: string;
}): Promise<MotivoFalta[] | null> {
    // Usar dados mock em desenvolvimento
    if (USE_MOCK_DATA) {
        return mockMotivosFalta;
    }

    try {
        const data = await customFetchBaseAPI<any>(
            `/domains?dad=${dad}&domains=${domains}`,
            { method: "GET" }
        );

        if (!data) return mockMotivosFalta;

        return mapMotivosFalta(data);
    } catch (error: any) {
        if (error.status === 404) {
            return mockMotivosFalta; // Fallback para mock
        }
        console.error("Erro ao buscar motivos de falta:", error);
        return mockMotivosFalta; // Fallback para mock
    }
}

export interface DocsProps{
    url: string,
    description: string
}

export async function getPreviewAusencia(idRelacao: number, tipoRelacao: string) {

    const params = new URLSearchParams({
        tipoRelacao: tipoRelacao,
        idRelacao: idRelacao.toString(),
        appCode: 'sgf'
    });

    const data = await customFetchBaseAPI<DocsProps>(
        `/documentos/public-url-tipo-rel?${params.toString()}`,
        {
            method: "GET"
        }
    );

    return data;
}
