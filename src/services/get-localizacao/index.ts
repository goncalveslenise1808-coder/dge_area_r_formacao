"use server";

import { customGlobalFetch } from "@/lib/customGlobalFetch";

export interface ILocationProps {
  label: string;
  value: string;
}

export interface ILocalizacaoParams {
  tipo: "PAIS" | "ILHA" | "CONCELHO" | "FREGUESIA" | "ZONA" | "NACIONALIDADE";
  pais?: string;
  prefixo: "ilhas" | "concelho";
}
const paramsConfig: Record<ILocalizacaoParams["prefixo"], string> = {
  ilhas: "pais",
  concelho: "ilha",
};

export async function getLocalizacao(
  params: ILocalizacaoParams
): Promise<ILocationProps[]> {
  const data = await customGlobalFetch<any>(`/geografia/${params?.prefixo}?${paramsConfig[params?.prefixo]}=${params?.pais}`, {
    method: "GET",
  });
  return data?.map((item: any) => ({
    value: item?.VALOR || "",
    label: item?.DESCRICAO || "",
  }));
}