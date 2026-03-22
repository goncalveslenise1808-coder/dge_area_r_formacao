export type ManifestacaoStatus = "Pendente" | "Concluído" | "Em Análise" | "Rejeitado"

export interface HistoricoType {
    id: number,
    formacao: string,
    periodo: string,
    local: string,
    participantes: number,
    avaliacao: number,
}

export interface Preferencia {
    familiaProfissional: string
    qualificacao: string
    modulo: string
    unidadeFormativa: string
}

export interface Manifestacao {
    id: string
    nomeCompleto: string
    numDocumento: string
    tipoDocumento: string
    nif: string
    dataNascimento: string
    email: string
    telemovel: string
    habilitacao: string
    areaformacao: string
    especializacao: string
    entidadeNome: string
    entidadeNif: string
    preferencias: Preferencia[]
    status: ManifestacaoStatus
    dataSubmissao: string
    dataAtualizacao: string
}


export interface IGetLocazacaos {
    id: string;
    nome: string;
}

export interface IGetLocazacaosResponse {
    data: IGetLocazacaos[];
}