export interface IJustificacaoAusencia {
    motivo: string | null;
    estado: string;
    observacoes: string;
    linkAnexo: string | null;
}

export interface IAusenciaItem {
    ausenciaId: number;
    data: string;
    tipoSessao: string;
    numeroSessao: string;
    modulo: string;
    unidadeFormacao: string;
    justificacaoAusencia: IJustificacaoAusencia;
}

export interface IAusenciaList {
    content: IAusenciaItem[];
    total: number;
    page: number;
    pageSize: number;
}

export interface MotivoFaltaApi {
    [codigo: string]: string;
}

export interface MotivoFalta {
    codigo: string;
    descricao: string;
}