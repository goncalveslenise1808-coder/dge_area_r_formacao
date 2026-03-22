"use server";
import {customFetch} from "@/lib/customFetch";
import {buildQueryString} from "@/lib/utils";
import { mockGrauAcademico, mockGenero, mockSimNao, USE_MOCK_DATA } from "@/services/mock/data";

export interface IDominiosProps {
    dominio:
        | "SEXO"
        | "TIPO_CONTATO"
        | "PERIODO"
        | "AREA_ESTUDO"
        | "SIM_NAO"
        | "GRAU_ACADEMICO"
        | "PROPRIETARIO_CONT"
        | "PROBLEMA_SAUDE";
}

export interface IDominioProps {
    value: string;
    label: string;
}

// Mapeamento de domínios para dados mock
function getMockDominios(dominio: string): IDominioProps[] {
    switch (dominio) {
        case "GRAU_ACADEMICO":
            return mockGrauAcademico;
        case "SEXO":
            return mockGenero;
        case "SIM_NAO":
            return mockSimNao;
        default:
            return [];
    }
}

export async function getDominios(
    params: IDominiosProps
): Promise<IDominioProps[] | undefined> {
    // Usar dados mock em desenvolvimento
    if (USE_MOCK_DATA) {
        return getMockDominios(params.dominio);
    }

    try {
        const queryString = buildQueryString(params);
        const data = await customFetch<any>(`/combobox/dominio?${queryString}`, {
            method: "GET",
        });

        if (!data?.length) return getMockDominios(params.dominio);

        return data
            .filter(
                (item: any) =>
                    item?.VALOR !== null &&
                    item?.VALOR !== undefined &&
                    item?.VALOR !== "" &&
                    item?.DESCRICAO !== null &&
                    item?.DESCRICAO !== undefined &&
                    item?.DESCRICAO !== ""
            )
            .map((item: any) => ({
                value: item.VALOR,
                label: item.DESCRICAO,
            }));
    } catch (error) {
        console.error("Erro ao buscar domínios:", error);
        return getMockDominios(params.dominio); // Fallback para mock
    }
}
