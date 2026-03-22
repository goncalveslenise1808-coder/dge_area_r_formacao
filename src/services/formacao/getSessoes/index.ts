"use server";

import { customFetch } from "@/lib/customFetch";
import { GetSessoesParams, PageResponseApi, SessaoApi, Page } from "./types";

export async function getSessoes({
  personId,
  registrationCode,
  unitId,
  page = 0,
  size = 10,
}: GetSessoesParams): Promise<Page<SessaoApi> | null> {
  const qs = new URLSearchParams({
    registrationCode,
    ...(unitId ? { unitId: String(unitId) } : {}),
    page: String(page),
    size: String(size),
  }).toString();

  try {
    const res = await customFetch<
      PageResponseApi<SessaoApi> | { data: PageResponseApi<SessaoApi> }
    >(`/plano/sessoes/${personId}?${qs}`, { method: "GET" });

    if (!res) throw new Error("No response from server.");

    const api: PageResponseApi<SessaoApi> =
      "data" in (res as any) ? (res as any).data : (res as any);

    if (!api || !Array.isArray(api.content)) {
      throw new Error("Invalid API shape: expected paginated content.");
    }
    console.log({ api });
    return api;
  } catch (err: any) {
    const status = err?.status ?? err?.response?.status;
    if (status === 404) {
      return null;
    }
    throw err;
  }
}
