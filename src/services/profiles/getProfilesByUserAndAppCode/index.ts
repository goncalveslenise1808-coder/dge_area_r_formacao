import { customGlobalFetch } from "@/lib/customGlobalFetch";
import { APP_CODE } from "@/contants";
import { IProfileResponse } from "./types";

interface GetProfilesByUserAndAppCodeParams {
  user_id?: number;
  user_email?: string;
}

export async function getProfilesByUserAndAppCode({
  user_id,
  user_email,
}: GetProfilesByUserAndAppCodeParams): Promise<IProfileResponse | null> {
  const params = new URLSearchParams();
  if (user_id) params.append("user_id", user_id.toString());
  if (user_email) params.append("user_email", user_email);

  try {
    const data = await customGlobalFetch<IProfileResponse>(
      `/access/profile/by-user-and-app-code/${APP_CODE}?${params.toString()}`,
      {
        method: "GET",
      }
    );
    return data ?? null;
  } catch (error) {
    console.error("Erro ao buscar perfis:", error);
    return null;
  }
}
