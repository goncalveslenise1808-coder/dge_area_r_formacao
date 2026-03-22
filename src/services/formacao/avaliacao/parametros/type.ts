export type GetParametrosAvaliacaoParams = {
  formReferente: string;
  categAvaliador: string;
};

export type ParametroTopicoApi = {
  parameterDetailId: number;
  topicoParametro: string;
  classificacao?: string | null;
  ordem: number;
};

export type ParametroAvaliacaoApi = {
  parameterId?: number;
  tituloParametro: string;
  ordem: number;
  topicos: ParametroTopicoApi[];
};

export type ClassificacaoValor = {
  key: string | number;
  value: string;
};

export type ParametrosAvaliacaoResponse = {
  parametrosAvaliacoes: ParametroAvaliacaoApi[];
  classificacaoValores: ClassificacaoValor[];
};

export type CriterioForm = {
  id: string;
  label: string;
  ordem: number;
  parameterId?: number;
  parametroAvalDetalhId?: number;
  tituloParametro?: string;
};

export type ParametrosFormConfig = {
  criterios: CriterioForm[];
  classificacoes: ClassificacaoValor[];
};
