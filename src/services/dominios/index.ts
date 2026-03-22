"use server";
import {customFetch} from "@/lib/customFetch";
import {buildQueryString} from "@/lib/utils";

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

export async function getDominios(
    params: IDominiosProps
): Promise<IDominioProps[] | undefined> {
    const queryString = buildQueryString(params);
    const data = await customFetch<any>(`/combobox/dominio?${queryString}`, {
        method: "GET",
    });

    if (!data?.length) return;

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
}
