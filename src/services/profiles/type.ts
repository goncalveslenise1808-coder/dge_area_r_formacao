export type ProfileType = 'jovem' | 'formador' | 'entidade';

export interface Profile {
    id: string;
    name: string;
    type: ProfileType;
    avatar: string;
    description: string;
}

export interface IPessoaInfo {
    id: number;
    num_documento: string;
    tipo_documento: string;
    nome: string;
    data_nasc: string;
    nome_mae: string;
    nome_pai: string;
    dt_validade: string;
    dt_emissao: string;
    estado_civil: string;
    estado_civil_desc: string;
    sexo: string;
    sexo_desc: string;
    nif: string;
    nacionalidade_id: string;
    nacionalidade: string;
    naturalidade_id: string;
    naturalidade: string;
    concelho_id: string;
    concelho: string;
    ilha: string | null;
    pais: string | null;
    localidade: string;
    bairro: string;
    email: string;
    telefone: string;
    foto: string;
    ilha_id: string;
    freguesia_id: string;
    freguesia: string | null;
    localidade_id: string;
    csu_nia: string | null;
    csu_nivel: string | null;
}

export interface IUser {
    user_id: number;
    status: string;
    session_token: string;
    email: string;
    sub_cmdcv: string | null;
    name: string;
    pessoa_info: IPessoaInfo; //Add KJ -> Opticional Helder so para tral kel erro
    contacts: any;
    info_school: any;
}

export interface IMyAccountResponse {
    user: IUser;
    provider: string;
    redirectUrl?: string;
    session_token: string;
    pessoa_info?: IPessoaInfo;
}


export interface IUserInfo {
    id: number;
    email: string;
    name: string;
    pessoa_id: number;
}

export interface IEntityInfo {
    id: number | string;
    nif?: string;
    name: string;
    permission?: string;
    permission_description?: string;
}

export interface IProfileInfo {
    id: number;
    code: string;
    name: string;
    description: string;
}

export interface IAccessProfile {
    userinfo: IUserInfo | null;
    entityinfo: IEntityInfo | null;
    profile_info: IProfileInfo | null;
}

export interface IProfileResponse {
    app_name: string;
    app_code: string;
    accesses: IAccessProfile[];
}
