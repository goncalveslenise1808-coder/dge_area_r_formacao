export interface Entidade {
    id: string
    nome: string
    nif: string
    telefone?: string
    email?: string
    orgId: number | null
    ilhaId: string
    concelhoId: string
    ilha: string
    concelho: string
    urlLogoEntidade: string | null
    websiteEntidade: string
    status: string
    dm_natureza: string
}

