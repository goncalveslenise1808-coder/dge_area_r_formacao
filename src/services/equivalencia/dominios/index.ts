'use server'
import {mapDocumentos} from "./mapper";
import {IDocumentoAnexo, IDominioItem, IDominioResponse} from "@/services/equivalencia/dominios/type";
import {customFetchDominio} from "@/lib/customFetchDominio";
import {customGlobalFetch} from "@/lib/customGlobalFetch";
import {customFetchBaseAPI} from "@/lib/customFetchBaseAPI";
import {mapDominio} from "@/services/equivalencia/dominios/mapDominio";
import {
    mockTipoDocumentoIdent,
    mockTipoDocumentoForm,
    mockGenero,
    mockSimNao,
    mockDocumentosAnexo,
    mockNacionalidades,
    USE_MOCK_DATA
} from "@/services/mock/data";

// Mapeamento de domínios para dados mock
function getMockDominio(domains?: string): IDominioItem[] {
    switch (domains) {
        case "TIPO_DOCUMENTO_IDENT":
            return mockTipoDocumentoIdent;
        case "TIPO_DOCUMENTO_FORM":
            return mockTipoDocumentoForm;
        case "GENERO":
            return mockGenero;
        case "SIM_NAO":
            return mockSimNao;
        default:
            return [];
    }
}

export async function getDominioAll({
                                        dad,
                                        domains,
                                    }: {
    dad?: string;
    domains?: string;
}): Promise<IDominioItem[]> {
    // Usar dados mock em desenvolvimento
    if (USE_MOCK_DATA) {
        return getMockDominio(domains);
    }

    try {
        const data = await customFetchBaseAPI<IDominioResponse>(
            `/domains?dad=${dad}&domains=${domains}`,
            {
                method: "GET",
            },
        );

        if (!data) return getMockDominio(domains);
        return mapDominio(data);
    } catch (error) {
        console.error("Erro ao buscar domínios:", error);
        return getMockDominio(domains); // Fallback para mock
    }
}

/* Lista de documentos para anexar */
export async function getDominioTipoDocsAndInstitiucao(tipo: string) {
    // Usar dados mock em desenvolvimento
    if (USE_MOCK_DATA) {
        return mockDocumentosAnexo;
    }

    try {
        const data = await customFetchDominio<IDocumentoAnexo[]>(
            `/combobox/${tipo}`,
            {
                method: "GET",
            },
        );

        if (!data || data.length === 0) return mockDocumentosAnexo;
        return mapDocumentos(data);
    } catch (error) {
        console.error("Erro ao buscar documentos:", error);
        return mockDocumentosAnexo; // Fallback para mock
    }
}

export interface INacionalidade {
    DESCRICAO: string,
    VALOR: string
}

export async function getNacionalidade() {
    // Usar dados mock em desenvolvimento
    if (USE_MOCK_DATA) {
        return mockNacionalidades;
    }

    try {
        const data = await customGlobalFetch<INacionalidade>(
            '/geografia/nacionalidade',
            {
                method: "GET",
            },
        );

        return data ?? mockNacionalidades;
    } catch (error) {
        console.error("Erro ao buscar nacionalidades:", error);
        return mockNacionalidades; // Fallback para mock
    }
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
