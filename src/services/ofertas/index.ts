"use server";

import {customFetch} from "@/lib/customFetch";
import {IOfertaFormativa, IPaginatedResult, IQualificacoesApiResponse, ISearch,} from "@/services/ofertas/type";
import {mapperOfertaFormativa, mapQualificacoesResponse,} from "@/services/ofertas/mapper";

export async function getDataOfertasFormativa(
    filters: ISearch = {}
): Promise<IPaginatedResult<IOfertaFormativa>> {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== "") params.append(k, String(v));
    });
    if (!params.has("page")) params.set("page", "0");
    if (!params.has("size")) params.set("size", "10");
    const url = `/qualificacoes?${params.toString()}`;

    const raw = await customFetch<IQualificacoesApiResponse>(url, {
        method: "GET",
    });
    return mapQualificacoesResponse(
        raw,
        Number(params.get("page") || 0),
        Number(params.get("size") || 10)
    );
}

export async function getDetailsOfertasFormativa({
                                                     code = "",
                                                 }: ISearch = {}): Promise<IOfertaFormativa | null> {
  try {
      const raw = await customFetch<any>(`/qualificacoes/${code}`, {
          method: "GET",
      });

      return mapperOfertaFormativa(raw);
  }catch (e) {
    console.error(e)
    return null;
  }
}
