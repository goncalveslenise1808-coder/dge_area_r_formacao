'use server'
import {customFetch} from "@/lib/customFetch";
import {FormacaoResponse} from "@/services/preferencias/type";
import {mapPreferencias} from "@/services/preferencias/mapPreferencias";
import { mockFormacaoResponse, USE_MOCK_DATA } from "@/services/mock/data";

export interface PreferenciasParams {
    entidadeId?: string
    familiaId?: string
    qualificacaoId?: string
    moduloId?: string
    moduloOrigem?: string
}

export async function getPreferencias(params: PreferenciasParams) {
    // Usar dados mock em desenvolvimento
    if (USE_MOCK_DATA) {
        return mapPreferencias(mockFormacaoResponse);
    }

    try {
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
    } catch (error) {
        console.error("Erro ao buscar preferências:", error);
        return mapPreferencias(mockFormacaoResponse); // Fallback para mock
    }
}
