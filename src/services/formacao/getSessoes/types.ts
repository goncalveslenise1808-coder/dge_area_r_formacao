export type SortApi = {
  sorted: boolean;
  unsorted: boolean;
  empty?: boolean;
};

export type PageableApi = {
  pageNumber: number;
  pageSize: number;
  sort: SortApi;
  offset?: number;
  unpaged?: boolean;
  paged?: boolean;
};

export type SessaoApi = {
  sessao_id: number;
  candidato_id: number;
  pessoa_id: number;

  nome_qualificacao: string;
  codigo_qualificacao: string;
  nivel: string;
  metodologia: string;
  modalidade: string;
  coordenador: string;
  horas_totais: number;

  nome_modulo: string;
  codigo_modulo: string;
  nome_unidade: string;
  codigo_unidade: string;
  horas_modulo: number;
  horas_unidade: number;

  objetivo_geral: string;
  status_sessao: string;
  numero_sessao: number;
  tipo_sessao: string;
  nome_formador: string;
  local_sessao: string;
  metodo_avaliacao: string;
  horas_sessao: number;
  tipo_conteudo: string;
};

export type PageResponseApi<T> = {
  content: T[];
  pageable: PageableApi;
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  sort?: SortApi;
  empty: boolean;
};

export type SortInfo = SortApi;

export type Pageable = {
  pageNumber: number;
  pageSize: number;
  offset?: number;
  paged?: boolean;
  unpaged?: boolean;
  sort: SortInfo;
};

export type Page<T> = {
  content: T[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  numberOfElements: number;
  first: boolean;
  size: number;
  number: number;
  sort?: SortInfo;
  empty: boolean;
};

export type GetSessoesParams = {
  personId: number;
  registrationCode: string;
  unitId?: number;
  page?: number;
  size?: number;
};
