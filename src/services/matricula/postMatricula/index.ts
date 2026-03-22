'use server'
import {customFetch} from "@/lib/customFetch";
import {IConfirmarMatriculaResponse} from "@/services/matricula/type";

interface ICandProps {
    pessoaId?: number;
}
export async function postConfirMatricula({
  pessoaId,
}: ICandProps): Promise<IConfirmarMatriculaResponse> {
    const data = await customFetch<IConfirmarMatriculaResponse>(
        `/matricula/confirmar/${pessoaId}`,
        {
            method: "POST",
        }
    );

    return data;
}
