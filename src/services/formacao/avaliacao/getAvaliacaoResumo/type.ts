export type SortApi = {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
};

export type PageableApi = {
  pageNumber: number;
  pageSize: number;
  sort: SortApi;
  offset: number;
  paged: boolean;
  unpaged: boolean;
};

export type PageResponseApi<T> = {
  content: T[];
  pageable: PageableApi;
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  sort: SortApi;
  empty: boolean;
};

export type Page<T> = {
  content: T[];
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
};

export type AvaliacaoResumoApi = {
  turmaFormandoId: number;
  edicaoId: number;
  edicaoTurmaId: number;
  turmaFormadorId: number;
  nomeCurso: string;
  nomeFormador: string;
  moduloAdicional: boolean;
  moduloId: number;
  modulo: string;
  avaliacaoGeral?: number,
  avaliacaoFormador?: number,
  unidadeAdicional: boolean;
  unidadeId: number;
  unidade: string;
  tipoAvaliacao: string | null;
  statusAvaliacao: string | null;
  dataAvaliacao: string | null;
};

export type GetAvaliacoesResumoParams = {
  personId: number | string;
  registrationCode: string;
  page?: number;
  size?: number;
};
