import { getMyAccount } from "@/services/profiles/getMyAccount";
import { cache } from "react";

// Usa o utilitário "cache" do React/Next.js
// 👉 Ele NÃO guarda em disco nem entre requests, apenas evita chamadas repetidas
// durante a mesma execução de renderização no servidor.
export const getCachedMyAccount = cache(async (fingerprint?: string) => {
    return await getMyAccount(fingerprint);
});
