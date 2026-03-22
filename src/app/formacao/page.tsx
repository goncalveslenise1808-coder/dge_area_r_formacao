import { notFound, redirect } from "next/navigation";
import { getProfilesByUserAndAppCode } from "@/services/profiles/getProfilesByUserAndAppCode";
import { buildProfilesFromResponse } from "@/services/profiles/getProfilesByUserAndAppCode/utils";
import { getCachedMyAccount } from "../cache/cached-my-account";
import RedirectWithSkeleton from "@/components/organisms/RedirectWithSkeleton";

export default async function IndexPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { page } = await searchParams;
  const me: any = await getCachedMyAccount();
  if (!me) {
    return <RedirectWithSkeleton to={`/`} />;
  }

  const resp = await getProfilesByUserAndAppCode({
    user_email: me?.email,
    user_id: me?.id,
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
  //return <RedirectWithSkeleton to={`/formacao/${first.id}`} />;
}
