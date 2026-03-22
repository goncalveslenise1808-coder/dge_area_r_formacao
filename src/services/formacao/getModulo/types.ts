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

export type UnidadeFormativaResumoApi = {
  unidade_id: number;
  codigo_unidade: string;
  nome_unidade: string;
  horas_unidade: number;
  metodo_avaliacao?: string | null;
  tipo_conteudo?: string | null;
};

export type ModuloComUnidadesApi = {
  candidato_id: number;
  pessoa_id: number;
  id_modulo: number;
  adicional: boolean;
  nome_modulo: string;
  carga_horaria_modulo: number;
  total_unidades: number;
  total_sessoes: number;
  unidades: UnidadeFormativaResumoApi[] | null;
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

export type UnidadeFormativaResumo = {
  unidadeId: number;
  codigo: string;
  nome: string;
  horas: number;
  metodoAvaliacao?: string | null;
  tipoConteudo?: string | null;
};

export type ModuloComUnidades = {
  candidatoId: number;
  pessoaId: number;
  moduloId: number;
  adicional: boolean;
  nomeModulo: string;
  cargaHorariaModulo: number;
  totalUnidades: number;
  totalSessoes: number;
  unidades: UnidadeFormativaResumo[];
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

export type GetModulosComUnidadesParams = {
  personId: number;
  registrationCode: string;
  page?: number;
  size?: number;
};
