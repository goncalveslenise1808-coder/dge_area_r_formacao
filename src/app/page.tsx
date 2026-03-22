import { redirect, notFound } from "next/navigation";
import { getCachedMyAccount } from "./cache/cached-my-account";
import { getProfilesByUserAndAppCode } from "@/services/profiles/getProfilesByUserAndAppCode";
import { buildProfilesFromResponse } from "@/services/profiles/getProfilesByUserAndAppCode/utils";

export default async function IndexPage() {
  const me: any = await getCachedMyAccount();
  if (!me) {
    redirect("/");
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

  redirect(`/formacao/${first.id}`);
}
