"use server";

import { customFetch } from "@/lib/customFetch";
import { GravarAvaliacaoBody, GravarAvaliacaoResponse } from "./type";

export async function saveAvaliacaoAction(
  personId: string | number,
  registrationCode: string,
  body: GravarAvaliacaoBody
): Promise<GravarAvaliacaoResponse> {
  if (!personId || !registrationCode) {
    throw new Error("Missing personId or registrationCode.");
  }

    console.log("💾 saveAvaliacaoAction chamado", {
        personId,
        registrationCode,
        body,
    });

  const qs = new URLSearchParams({
    personId: String(personId),
    registrationCode,
  }).toString();

  const res = await customFetch<GravarAvaliacaoResponse | { data: GravarAvaliacaoResponse }>(

    `/avaliacao/gravar-avaliacao?${qs}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  const data = ("data" in (res as any) ? (res as any).data : res) as GravarAvaliacaoResponse;

  console.log("💾 Resposta do backend:", data);

  if (!data) {
    throw new Error("Empty response from server.");
  }
  return { success: true };
}

/*
export async function saveAvaliacaoAction(
    personId: string | number,
    registrationCode: string,
    body: GravarAvaliacaoBody
): Promise<GravarAvaliacaoResponse> {
    if (!personId || !registrationCode) {
        throw new Error("Missing personId or registrationCode.");
    }

    console.log("💾 saveAvaliacaoAction chamado", {
        personId,
        registrationCode,
        body,
    });

    const qs = new URLSearchParams({
        personId: String(personId),
        registrationCode,
    }).toString();

    const res = await customFetch<{ success: boolean; message?: string; data?: any }>(
        `/avaliacao/gravar-avaliacao?${qs}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        }
    );

    const data = "data" in res ? res.data : res;

    console.log("💾 Resposta do backend:", data);

    if (!data || !data.success) {
        throw new Error(data?.message || "Erro ao gravar avaliação.");
    }

    // Retorna toda a resposta do backend, não apenas { success: true }
    return data as GravarAvaliacaoResponse;
}
*/
