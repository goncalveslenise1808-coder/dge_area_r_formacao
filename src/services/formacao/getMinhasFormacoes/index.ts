"use server";
import { customFetch } from "@/lib/customFetch";
import {IFormacoesResponse} from "./type";

interface ICandProps {
  pessoaId?: number;
}

export async function getMinhasFormacoes({
  pessoaId,
}: ICandProps){

  try {
      const data = await customFetch<IFormacoesResponse>(
          `/candidatos-selecionados/pessoa/${pessoaId}/cursos`,
          {
              method: "GET",
          }
      );

      if (!data || data?.success === false) {
          return {
              success: false,
              message: "Operation not completed",
              data: {
                  cursosFinalizados: [],
                  cursosEmAndamento: []
              }
          };
      }

      return data || {};
  }catch (e) {
      console.log(e)
      return {
          success: false,
          message: "Operation not completed",
          data: {
              cursosFinalizados: [],
              cursosEmAndamento: []
          }
      };
  }

}
