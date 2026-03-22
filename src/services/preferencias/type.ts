export interface Familia {
    familiaId?: string,
    denominacaoFamilia: string
    codigoFamilia: string
}

export interface Qualificacao {
    id: number
    denominacao: string
}

export interface Modulo {
    id: number
    label: string
    origem: string
}

export interface Unidade {
    id: number
    label: string
    origem: string
}

export interface Selecionadas {
    entidadeId: number
    codigoFamilia: string
    qualificacaoId: number
    moduloId: number
    moduloOrigem: string
}

export interface FormacaoResponse {
    familias: Familia[]
    qualificacoes: Qualificacao[]
    modulos: Modulo[]
    unidades: Unidade[]
    selecionadas: Selecionadas
}