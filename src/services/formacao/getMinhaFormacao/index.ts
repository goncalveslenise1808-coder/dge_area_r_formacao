"use server";
import { customFetch } from "@/lib/customFetch";
import {IFormacao} from "../getMinhasFormacoes/type";

interface ICandProps {
  id?: number;
}

export async function getMinhaFormacao({ id }: ICandProps): Promise<IFormacao> {

  const data: any = await customFetch(`/candidatos-selecionados/${id}`, {
    method: "GET",
  });

  return data?.data || [];
}
