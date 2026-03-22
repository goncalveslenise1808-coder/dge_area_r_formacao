'use server'
import {customFetch} from "@/lib/customFetch";
import {FormacaoResponse} from "@/services/preferencias/type";
import {mapPreferencias} from "@/services/preferencias/mapPreferencias";

export interface PreferenciasParams {
    entidadeId?: string
    familiaId?: string
    qualificacaoId?: string
    moduloId?: string
    moduloOrigem?: string
}

export async function getPreferencias(params: PreferenciasParams) {

    const query = new URLSearchParams({
        entidadeId: params?.entidadeId || "",
        familiaId: params?.familiaId || "",
        qualificacaoId: params?.qualificacaoId || "",
        moduloId: params?.moduloId || "",
        moduloOrigem: params?.moduloOrigem || ""
    }).toString()

    const response = await customFetch<FormacaoResponse>(
        `/preferencias?${query}`,
        {
            method: "GET"
        }
    )

    return mapPreferencias(response);
}