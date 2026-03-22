export interface IProfileResponse {
  app_name: string;
  app_code: string;
  accesses: IAccessItem[];
}

export interface IAccessItem {
  userinfo: IUserInfo | null;
  entityinfo: IEntityInfo | null;
  profile_info: IProfileInfo | null;
}

export interface IUserInfo {
  id: number;
  email: string;
  name: string;
  pessoa_id: number | null;
}

export interface IEntityInfo {
  id: number;
  nif?: string | null;
  name?: string | null;
  permission?: string | null;
  permission_description?: string | null;
  [k: string]: unknown;
}

export interface IProfileInfo {
  id: number;
  code: string; 
  name: string;
  description: string | null;
}

export type Profile = {
  key: string;
  type: string; 
  id: string; 
  name: string; 
  avatar?: string | null; 
  description?: string | null;
  pessoaId?: number | null;
  profileId?: number | null;
  entityId?: number | null;
};