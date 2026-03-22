//"use server";

import { customFetch } from "@/lib/customFetch";
import {
  AvaliacaoResumoApi,
  GetAvaliacoesResumoParams,
  Page,
  PageResponseApi,
} from "./type";

function toPage<T>(
  data: PageResponseApi<T> | T[],
  pageFallback = 0,
  sizeFallback?: number
): Page<T> {
  if (Array.isArray(data)) {
    const size = sizeFallback ?? data.length;
    return {
      content: data,
      page: 0,
      size,
      totalPages: 1,
      totalElements: data.length,
      first: true,
      last: true,
      numberOfElements: data.length,
      empty: data.length === 0,
    };
  }
  return {
    content: data.content ?? [],
    page: data.number ?? pageFallback,
    size: data.size ?? sizeFallback ?? data.content?.length ?? 0,
    totalPages: data.totalPages ?? 1,
    totalElements: data.totalElements ?? data.content?.length ?? 0,
    first: !!data.first,
    last: !!data.last,
    numberOfElements: data.numberOfElements ?? data.content?.length ?? 0,
    empty: !!data.empty,
  };
}

export function emptyPage<T>(page = 0, size = 10): Page<T> {
  return {
    content: [],
    page,
    size,
    totalPages: 0,
    totalElements: 0,
    first: true,
    last: true,
    numberOfElements: 0,
    empty: true,
  };
}

export async function getAvaliacoesResumo({
  personId,
  registrationCode,
  page,
  size,
}: GetAvaliacoesResumoParams): Promise<Page<AvaliacaoResumoApi>> {
  const qs = new URLSearchParams({
    personId: String(personId),
    registrationCode,
    ...(page != null ? { page: String(page) } : {}),
    ...(size != null ? { size: String(size) } : {}),
  }).toString();

  try {
    const res = await customFetch<
      | PageResponseApi<AvaliacaoResumoApi>
      | AvaliacaoResumoApi[]
      | { data: PageResponseApi<AvaliacaoResumoApi> | AvaliacaoResumoApi[] }
    >(`/avaliacao/lista-resumo?${qs}`, { method: "GET" });

    if (!res) throw new Error("No response from server.");

    const api = "data" in (res as any) ? (res as any).data : res;

    if (Array.isArray(api)) {
      return toPage<AvaliacaoResumoApi>(api, page ?? 0, size);
    }
    if (
      api &&
      Array.isArray((api as PageResponseApi<AvaliacaoResumoApi>).content)
    ) {
      return toPage<AvaliacaoResumoApi>(
        api as PageResponseApi<AvaliacaoResumoApi>,
        page ?? 0,
        size
      );
    }

    throw new Error("Invalid API shape: expected paginated content or array.");
  } catch (err: any) {
    const status = err?.status ?? err?.response?.status;
    if (status === 404) {
      return emptyPage<AvaliacaoResumoApi>(page ?? 0, size ?? 10);
    }
    throw err;
  }
}
