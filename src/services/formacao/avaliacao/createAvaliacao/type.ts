export type TipoAvaliacao =
  | "AVAL_ACAO_FORMACAO"
  | "AVAL_FORMADOR"
  | "AVAL_MODULO"
  | string;

export type ParametroDetalheInput = {
  parametroAvalDetalhId: number;
  classificacao: string;
};

export type ParametroInput = {
  parametroAvalId: number;
  detalhes: ParametroDetalheInput[];
};

export type GravarAvaliacaoBody = {
  edicaoId: number;
  edicaoTurmaId: number;
  turmaFormadorId: number;
  moduloAdicional: boolean;
  moduloId: number;
  unidadeAdicional: boolean;
  unidadeId: number;
  tipoAvaliacao: TipoAvaliacao;
  //observacao?: string | null;
  origem?: string | null;
  parametros: ParametroInput[];
};

export type GravarAvaliacaoResponse = {
  success: boolean;
  message?: string | null;
  id?: number | string | null;
};
