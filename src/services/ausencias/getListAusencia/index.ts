'use server'
import {customFetch} from "@/lib/customFetch";
import {mapMotivosFalta, mapperListaAusencia} from "@/services/ausencias/getListAusencia/mapper";
import {IAusenciaList, MotivoFalta} from "@/services/ausencias/getListAusencia/type";
import {customFetchBaseAPI} from "@/lib/customFetchBaseAPI";

export async function getListAusencia({
    pessoaId,
    selectedCandidateId
 }:{
    pessoaId: number
    selectedCandidateId?: number
}){

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
            return null;
        }
        throw error;
    }
}

export async function getMotivosFalta({
  dad,
  domains,
}: {
    dad: string;
    domains: string;
}): Promise<MotivoFalta[] | null> {
    try {
        const data = await customFetchBaseAPI<any>(
            `/domains?dad=${dad}&domains=${domains}`,
            { method: "GET" }
        );

        if (!data) return null;

        return mapMotivosFalta(data);
    } catch (error: any) {
        if (error.status === 404) {
            return null;
        }
        throw error;
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
