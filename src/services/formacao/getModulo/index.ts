"use server";

import { customFetch } from "@/lib/customFetch";

import {
  GetModulosComUnidadesParams,
  ModuloComUnidades,
  ModuloComUnidadesApi,
  Page,
  PageResponseApi,
} from "./types";
import { emptyPage, mapModuloComUnidades, mapPage } from "./mapper";

export async function getModulosComUnidades({
  personId,
  registrationCode,
  page = 0,
  size = 10,
}: GetModulosComUnidadesParams): Promise<Page<ModuloComUnidades>> {
  const qs = new URLSearchParams({
    registrationCode,
    page: String(page),
    size: String(size),
  }).toString();

  try {
    const res = await customFetch<
      | PageResponseApi<ModuloComUnidadesApi>
      | { data: PageResponseApi<ModuloComUnidadesApi> }
    >(`/plano/modulos_unidades/${personId}?${qs}`,
        {
            method: "GET"
        });

    if (!res) throw new Error("No response from server.");

    const api: PageResponseApi<ModuloComUnidadesApi> =
      "data" in (res as any) ? (res as any).data : (res as any);

    if (!api || !Array.isArray(api.content)) {
      throw new Error("Invalid API shape: expected paginated content.");
    }
    return mapPage(api, mapModuloComUnidades);
  } catch (err: any) {
    const status = err?.status ?? err?.response?.status;
    if (status === 404) {
      return emptyPage<ModuloComUnidades>(page, size);
    }
    throw err;
  }
}
