'use server'
import {mapDocumentos} from "./mapper";
import {IDocumentoAnexo, IDominioItem, IDominioResponse} from "@/services/equivalencia/dominios/type";
import {customFetchDominio} from "@/lib/customFetchDominio";
import {customGlobalFetch} from "@/lib/customGlobalFetch";
import {customFetchBaseAPI} from "@/lib/customFetchBaseAPI";
import {mapDominio} from "@/services/equivalencia/dominios/mapDominio";

export async function getDominioAll({
                                        dad,
                                        domains,
                                    }: {
    dad?: string;
    domains?: string;
}): Promise<IDominioItem[]> {
    const data = await customFetchBaseAPI<IDominioResponse>(
        `/domains?dad=${dad}&domains=${domains}`,
        {
            method: "GET",
        },
    );

    if (!data) return [];
    return mapDominio(data);
}

/* Lista de documentos para anexar */
export async function getDominioTipoDocsAndInstitiucao(tipo: string) {
    const data = await customFetchDominio<IDocumentoAnexo[]>(
        `/combobox/${tipo}`,
        {
            method: "GET",
        },
    );

    if (!data || data.length === 0) return [];
    return mapDocumentos(data);
}

export interface INacionalidade {
    DESCRICAO: string,
    VALOR: string
}

export async function getNacionalidade() {
    const data = await customGlobalFetch<INacionalidade>(
        '/geografia/nacionalidade',
        {
            method: "GET",
        },
    );

    return data;
}

export interface IPais {
    id: number;
    pais: string;
    codigo: string;
}

export async function getByIdNacionalidade({
                                               id
                                           }: {
    id: number;
}) {

    const data = await customFetchDominio<IPais>(
        `/instituicoes/${id}`,
        {
            method: "GET",
        },
    );

    return data;
}