export interface IFormacao {
    candidatoSelecionadoId: number;
    nomeCandidato: string;
    codeCandidatura: string;
    nomeCurso: string;
    entidadeFormadora: string;
    nivel: string;
    modalidade: string;
    totalModulos: string;
    metodologia: string;
    objetivoGeral: string;
    colaborador: string;
}

export interface IFormacoesResponse {
    success: boolean;
    message: string;
    data: {
        cursosFinalizados: IFormacao[];
        cursosEmAndamento: IFormacao[];
    };
}
