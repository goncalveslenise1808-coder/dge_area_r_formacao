'use server';
import { getCachedMyAccount } from "@/app/cache/cached-my-account";
import { postJustificationAucensia } from "@/services/ausencias/postJustificationAucensia/index";

export async function enviarJustificationAction(payload: any) {
    const data: any = await getCachedMyAccount();

    const pessoaId = data?.pessoa_info?.id;

    if (!pessoaId) throw new Error("Usuário não autenticado");
    const response = await postJustificationAucensia({ pessoaId, payload });

    return response;
}
