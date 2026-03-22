"use server";

import { customFetch } from "@/lib/customFetch";
import type {
  GetParametrosAvaliacaoParams,
  ParametrosAvaliacaoResponse,
  ParametrosFormConfig,
  CriterioForm,
} from "./type";

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function getParametrosAvaliacao({
  formReferente,
  categAvaliador,
}: GetParametrosAvaliacaoParams): Promise<ParametrosFormConfig> {
  const qs = new URLSearchParams({
    formReferente,
    categAvaliador,
  }).toString();

  const res = await customFetch<ParametrosAvaliacaoResponse | { data: ParametrosAvaliacaoResponse }>(
      `/avaliacao/parametros-avaliacao/parametros?${qs}`,
      {
         method: "GET"
      });

  const api: ParametrosAvaliacaoResponse = "data" in (res as any) ? (res as any).data : (res as any);

  const criterios: CriterioForm[] = api?.parametrosAvaliacoes?.flatMap((p) => (p.topicos ?? []).map((t) => ({
        id: [p.parameterId ?? p.tituloParametro, t.parameterDetailId ?? t.topicoParametro,].map((x) => String(x)).map(slugify).join("__"),
        label: t.topicoParametro,
        ordem: t.ordem ?? 0,
        parameterId: p.parameterId,
        parametroAvalDetalhId: t.parameterDetailId,
        tituloParametro: p.tituloParametro,
      }))
    ).sort((a, b) => a.ordem - b.ordem);
/*
    console.log("========================");
    console.log({
        criterios: criterios,
        classificacaoValores: api.classificacaoValores
    });
    console.log("========================");*/
  return {
    criterios,
    classificacoes: api.classificacaoValores,
  };
}
