"use server";
import {customFetch} from "@/lib/customFetch";
import {ICandidaturaResponse} from "@/services/candidaturas/type";
import {mapperCandidaturaResponse} from "@/services/candidaturas/mapper";
import {appendNestedFormData} from "@/services/equivalencia/postPedidoEquivalencia";

export interface ICandProps {
    pessoaId?: number;
    codigoCandidatura?: number;
}

export async function getDataCandidaturas({
                                              pessoaId,
                                          }: ICandProps): Promise<ICandidaturaResponse> {
    const data = await customFetch<ICandidaturaResponse>(
        `/candidatura/${pessoaId}`,
        {
            method: "GET",
        }
    );
    if (!data) {
        return {
            candidaturas_activas: [],
            candidaturas_arquivadas: [],
        };
    }
    return mapperCandidaturaResponse(data);
}

export async function putCancelarCandidatura(payload: any) {
    const formData = new FormData();

    appendNestedFormData(formData, payload);

    const data = await customFetch<ICandProps>(`/candidatura/cancelar`, {
        method: "PUT",
        body: formData,
    });
    return data;
}
