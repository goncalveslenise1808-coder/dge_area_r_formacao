'use server'
import {customFetchPAEF} from "@/lib/customFetchPAEF";
import {IGetLocazacaos, IGetLocazacaosResponse} from "@/services/sgf/type";
import {
    mockIlhas,
    mockConcelhos,
    mockFreguesias,
    mockZonas,
    USE_MOCK_DATA
} from "@/services/mock/data";

export async function getIlhas(): Promise<IGetLocazacaos[]> {
    // Usar dados mock em desenvolvimento
    if (USE_MOCK_DATA) {
        return mockIlhas;
    }

    try {
        const response = await customFetchPAEF<IGetLocazacaosResponse>(
            `/geografia/ilhas`, {
                method: "GET",
            });

        return response?.data ?? mockIlhas;
    } catch (error) {
        console.error("Erro ao buscar ilhas:", error);
        return mockIlhas; // Fallback para mock
    }
}

export async function getConcelho(ilhas: string): Promise<IGetLocazacaos[]> {
    // Usar dados mock em desenvolvimento
    if (USE_MOCK_DATA) {
        return mockConcelhos[ilhas] ?? [];
    }

    try {
        const response = await customFetchPAEF<IGetLocazacaosResponse>(
            `/geografia/concelhos?ilha=${ilhas}`, {
                method: "GET",
            });

        return response?.data ?? (mockConcelhos[ilhas] ?? []);
    } catch (error) {
        console.error("Erro ao buscar concelhos:", error);
        return mockConcelhos[ilhas] ?? []; // Fallback para mock
    }
}

export async function getFreguesias(concelho: string): Promise<IGetLocazacaos[]> {
    // Usar dados mock em desenvolvimento
    if (USE_MOCK_DATA) {
        return mockFreguesias[concelho] ?? [];
    }

    try {
        const response = await customFetchPAEF<IGetLocazacaosResponse>(
            `/geografia/freguesias?concelho=${concelho}`, {
                method: "GET",
            });

        return response?.data ?? (mockFreguesias[concelho] ?? []);
    } catch (error) {
        console.error("Erro ao buscar freguesias:", error);
        return mockFreguesias[concelho] ?? []; // Fallback para mock
    }
}

export async function getZona(freguesia: string): Promise<IGetLocazacaos[]> {
    // Usar dados mock em desenvolvimento
    if (USE_MOCK_DATA) {
        return mockZonas[freguesia] ?? [];
    }

    try {
        const response = await customFetchPAEF<IGetLocazacaosResponse>(
            `/geografia/zonas?freguesia=${freguesia}`, {
                method: "GET",
            });

        return response?.data ?? (mockZonas[freguesia] ?? []);
    } catch (error) {
        console.error("Erro ao buscar zonas:", error);
        return mockZonas[freguesia] ?? []; // Fallback para mock
    }
}
