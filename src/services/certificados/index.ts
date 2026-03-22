"use server";

import { customGlobalFetch } from "@/lib/customGlobalFetch";
import { CertificadoApi, GetCertificadosParams } from "./types";

export async function getCertificados({
  pessoaId,
}: GetCertificadosParams): Promise<CertificadoApi[]> {
  if (!pessoaId) throw new Error("O parâmetro pessoaId é obrigatório.");

  try {
    const res = await customGlobalFetch<CertificadoApi[] | { data: CertificadoApi[] }
    >(`/certificados/pessoa/${pessoaId}`,
        {
            method: "GET"
        });

    const data = (res as any)?.data ?? res;

    if (!Array.isArray(data)) {
      throw new Error(
        "Formato inválido da API de certificados: esperado array."
      );
    }

    return data as CertificadoApi[];
  } catch (err: any) {
    const status = err?.status ?? err?.response?.status;
    if (status === 404) {
      return [];
    }
    throw err;
  }
}
