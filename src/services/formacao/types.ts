export type AulaStatus = "concluida" | "pendente";
export type PlanoSessao = {
  id: string | number;
  numero: number;
  status: AulaStatus;
  tipologia: "teorica" | "pratica" | "laboratorio" | "campo";
  formador: { id: string | number; nome: string };
  local: string;
  tipoConteudo: string;
  formaAvaliacao?: string;
  duracaoMin: number;
  data?: string;
  hora?: string;
  gravacaoUrl?: string;
  anexos?: { label: string; url: string }[];
  links?: { label: string; url: string }[];
};

export type UnidadeFormativa = {
  id: string | number;
  codigo?: string;
  nome: string;
  cargaHoraria: number;
  secoes?: number;
  sessoes: PlanoSessao[];
};

export type ModuloStats = {
  totalUFs: number;
  totalSessoes: number;
  sessoesConcluidas: number;
  sessoesPendentes: number;
  cargaHorariaUFs: number;
  duracaoTotalSessoesMin: number;
  proximaSessao?: {
    id: string | number;
    numero: number;
    data?: string;
    hora?: string;
    ufId: string | number;
    ufNome: string;
  };
};

export type ModuloRich = {
  id: string | number;
  codigo?: string;
  nome: string;
  horas: number;
  completo?: boolean;
  progresso?: number;
  ufs: UnidadeFormativa[];
  stats?: ModuloStats;
  totalUFs: number;
  totalSessoes: number;
};

export type CursoDetalheEncadeado = {
  id: number;
  nome: string;
  entidade: string;
  coordenador: string;
  dataInicio: string;
  dataFim: string;
  horasCompletas: number;
  cargaHoraria: number;
  proximaAula?: string;
  progresso: number;
  status: "em_curso" | "concluido";
  modulos: ModuloRich[];
};
