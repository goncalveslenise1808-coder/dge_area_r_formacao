"use server"; // Indica que esta função roda no servidor (Next.js App Router)
import { cookies } from "next/headers";

const COOKIE_MY_TOKEN = "session_token"; // Nome do cookie que guarda o token JWT

// Obtém informações da sessão atual
export async function getSessionInfo() {
    // Acede ao cookie no servidor
    const store = await cookies();
    const sessionToken = store.get(COOKIE_MY_TOKEN)?.value;

    // Se não existir token, significa que o utilizador não está autenticado
    if (!sessionToken) return null;

    // Retorna o token para ser usado em chamadas à API
    return { sessionToken } as const;
}

// Faz logout do utilizador
export async function logout() {
    const cookieStore = await cookies();
    // Remove o cookie que contém o token da sessão
    cookieStore.delete('session_token');
}
