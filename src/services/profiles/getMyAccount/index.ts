import { customGlobalFetch } from "@/lib/customGlobalFetch";
import { IMyAccountResponse } from "../type";
import { getSessionInfo } from "@/services/utils";

export async function getMyAccount(
  _fingerprint?: string
): Promise<IMyAccountResponse | null> {
  const session = await getSessionInfo();
  if (!session) return null;

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
    return res ?? null;
  } catch (error) {
    console.error("Erro ao buscar conta:", error);
    return null;
  }
}
