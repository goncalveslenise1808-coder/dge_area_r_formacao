import { IProfileResponse, Profile, IAccessItem } from "./types";

const slug = (s: string) =>
  s?.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9_-]/g, "") || "";

function buildKey(acc: IAccessItem, index: number) {
  if (acc.userinfo && acc.profile_info) {
    const code = acc.profile_info.code;
    const pessoaId = acc.userinfo.pessoa_id ?? 0;
    return {
      key: `${slug(code)}_${pessoaId}`,
      type: code,
      name: acc.profile_info.name,
      description: acc.profile_info.description ?? null,
    };
  }

  if (acc.entityinfo?.permission) {
    const perm = acc.entityinfo.permission;
    const entityId = acc.entityinfo.id;
    return {
      key: `${slug(perm)}_${entityId}`,
      type: perm,
      name: acc.entityinfo.name ?? perm,
      description: acc.entityinfo.permission_description ?? null,
    };
  }

  return { key: `profile_${index}`, type: "DEFAULT", name: "Perfil", description: null };
}

export function buildProfilesFromResponse(resp: IProfileResponse | null): Profile[] {
  if (!resp?.accesses?.length) return [];
  return resp?.accesses?.map((acc, i) => {
    const { key, type, name, description } = buildKey(acc, i);
    return {
      key,
      type,
      id: key,
      name,
      avatar: null,
      description,
      pessoaId: acc.userinfo?.pessoa_id ?? null,
      profileId: acc.profile_info?.id ?? null,
      entityId: acc.entityinfo?.id ?? null,
    };
  });
}
