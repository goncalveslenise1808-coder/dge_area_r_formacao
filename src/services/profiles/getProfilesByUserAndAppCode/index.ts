import { customGlobalFetch } from "@/lib/customGlobalFetch";
import { APP_CODE } from "@/contants";
import { IProfileResponse } from "./types";
import { mockProfileResponse, USE_MOCK_DATA } from "@/services/mock/data";

interface GetProfilesByUserAndAppCodeParams {
  user_id?: number;
  user_email?: string;
}

export async function getProfilesByUserAndAppCode({
  user_id,
  user_email,
}: GetProfilesByUserAndAppCodeParams): Promise<IProfileResponse | null> {
  // Usar dados mock em desenvolvimento
  if (USE_MOCK_DATA) {
    return mockProfileResponse;
  }

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
    return data ?? mockProfileResponse;
  } catch (error) {
    console.error("Erro ao buscar perfis:", error);
    return mockProfileResponse; // Fallback para mock
  }
}
