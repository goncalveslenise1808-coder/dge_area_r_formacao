import { notFound, redirect } from "next/navigation";
import { getProfilesByUserAndAppCode } from "@/services/profiles/getProfilesByUserAndAppCode";
import { buildProfilesFromResponse } from "@/services/profiles/getProfilesByUserAndAppCode/utils";
import { getCachedMyAccount } from "../cache/cached-my-account";
import RedirectWithSkeleton from "@/components/organisms/RedirectWithSkeleton";
import { USE_MOCK_DATA, mockMyAccount } from "@/services/mock/data";

export default async function IndexPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { page } = await searchParams;
  const me: any = await getCachedMyAccount() ?? (USE_MOCK_DATA ? mockMyAccount : null);
  
  if (!me) {
    return <RedirectWithSkeleton to={`/`} />;
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

  if (page) {
    return redirect(`/formacao/${first.id}/${page}`);
  }

  redirect(`/formacao/${first.id}`);
}
