import { customGlobalFetch } from "@/lib/customGlobalFetch";
import { IMyAccountResponse } from "../type";
import { getSessionInfo } from "@/services/utils";
import { mockMyAccount, USE_MOCK_DATA } from "@/services/mock/data";

export async function getMyAccount(
  _fingerprint?: string
): Promise<IMyAccountResponse | null> {
  // Usar dados mock em desenvolvimento
  if (USE_MOCK_DATA) {
    return mockMyAccount;
  }

  const session = await getSessionInfo();
  if (!session) return mockMyAccount; // Fallback para mock se não houver sessão

  try {
    const res = await customGlobalFetch<IMyAccountResponse>(
        `/session/me`,
        {
          method: "GET",
          headers: {
            "X-SESSION-TOKEN": session.sessionToken,
            "X-FINGERPRINT": "valor-do-fingerprint",
            "Content-Type": "application/json",
          },
          cache: "no-cache",
        });
    return res ?? mockMyAccount;
  } catch (error) {
    console.error("Erro ao buscar conta:", error);
    return mockMyAccount; // Fallback para mock em caso de erro
  }
}
