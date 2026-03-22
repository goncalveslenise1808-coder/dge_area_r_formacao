'use server'
import {customFetchPAEF} from "@/lib/customFetchPAEF";
import {IGetLocazacaos, IGetLocazacaosResponse} from "@/services/sgf/type";

export async function getIlhas(): Promise<IGetLocazacaos[]> {

    const response = await customFetchPAEF<IGetLocazacaosResponse>(
        `/geografia/ilhas`, {
            method: "GET",
        });

    return response?.data ?? [];
}

export async function getConcelho(ilhas: string): Promise<IGetLocazacaos[]> {

    const response = await customFetchPAEF<IGetLocazacaosResponse>(
        `/geografia/concelhos?ilha=${ilhas}`, {
            method: "GET",
        });

    return response?.data ?? [];
}

export async function getFreguesias(concelho: string): Promise<IGetLocazacaos[]> {

    const response = await customFetchPAEF<IGetLocazacaosResponse>(
        `/geografia/freguesias?concelho=${concelho}`, {
            method: "GET",
        });

    return response?.data ?? [];
}

export async function getZona(freguesia: string): Promise<IGetLocazacaos[]> {

    const response = await customFetchPAEF<IGetLocazacaosResponse>(
        `/geografia/zonas?freguesia=${freguesia}`, {
            method: "GET",
        });

    return response?.data ?? [];
}