export interface ICursoCandidatura {
  cursoCandatoId: number;
  qualifOfertaId: number;
  ordemPreferencia: number;
  denominacaoQualif: string;
  nomeEntidade: string;
  statusCandidatoCurso: string;
  concelho: string;
  dataFim: string;
  dataInicioCurso: string;
  nivel: string;
  cargaHoraria: string;
  entidadeId: number;
  urlLogoEntidade: string;
}

export interface IDocs {
  path: string;
  name: string;
}

export interface ICandidatura {
  id: number;
  nome: string;
  statusCandidatura: string;
  statusCandidaturaCode: string;
  codigoCandidatura: string;
  pontuacao: number | null;
  dateCreate: string;
  dataFimCandidatura: string;
  cursos: ICursoCandidatura[];
  docs: IDocs[];
}

export interface ICandidaturaResponse {
  candidaturas_activas: ICandidatura[];
  candidaturas_arquivadas: ICandidatura[];
}
