"use server";

import { customFetch } from "@/lib/customFetch";
import {
  GetModulosParams,
  ModuloResumo,
  Page,
} from "./types";
import { mapModuloResumo, mapPage } from "./mapper";

export async function getModulosSemUnidades({
  personId,
  registrationCode,
  page = 0,
  size = 10,
}: GetModulosParams): Promise<Page<ModuloResumo>> {
  const qs = new URLSearchParams({
    registrationCode,
    page: String(page),
    size: String(size),
  }).toString();

  const res = await customFetch(`/plano/modulos/${personId}?${qs}`, {
    method: "GET",
  });

  if (!res) {
    throw new Error("No response from server.");
  }

  const api = res;
  return mapPage(api as any, mapModuloResumo);
}
