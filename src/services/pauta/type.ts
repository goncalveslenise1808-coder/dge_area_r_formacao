export interface Unidade {
    id: number;
    unidadeNome: string;
    dateAvaliation: string;
    nota: number;
    statusUnidade: string;
}

export interface Modulo {
    id: number;
    nomeModulo: string;
    nota: number;
    peso: string;
    completo: boolean;
    unidades: Unidade[];
}

export interface Curso {
    id: number;
    nomeCurso: string;
    nomeEntidade: string;
    notaAtual: number;
    percentagem: number;
    modulos: Modulo[];
}

