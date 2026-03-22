import { redirect, notFound } from "next/navigation";
import { getCachedMyAccount } from "./cache/cached-my-account";
import { getProfilesByUserAndAppCode } from "@/services/profiles/getProfilesByUserAndAppCode";
import { buildProfilesFromResponse } from "@/services/profiles/getProfilesByUserAndAppCode/utils";
import { USE_MOCK_DATA, mockMyAccount } from "@/services/mock/data";

export default async function IndexPage() {
  // Obter dados do utilizador (real ou mock)
  const me: any = await getCachedMyAccount() ?? (USE_MOCK_DATA ? mockMyAccount : null);
  
  if (!me) {
    redirect("/");
  }

  // Obter email e id do utilizador
  const userEmail = me?.user?.email ?? me?.email;
  const userId = me?.user?.user_id ?? me?.id;

  const resp = await getProfilesByUserAndAppCode({
    user_email: userEmail,
    user_id: userId,
  });

  const profiles = buildProfilesFromResponse(resp);
  const first = profiles[0];

  if (!first) {
    notFound();
  }

  redirect(`/formacao/${first.id}`);
}
