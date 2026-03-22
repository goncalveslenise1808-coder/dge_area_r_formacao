
export type SortApi = {
  unsorted: boolean;
  sorted: boolean;
  empty: boolean;
};

export type PageableApi = {
  pageNumber: number;
  pageSize: number;
  sort: SortApi;
  offset: number;
  unpaged: boolean;
  paged: boolean;
};

export type SortInfo = {
  unsorted: boolean;
  sorted: boolean;
  empty: boolean;
};

export type Pageable = {
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
  sort: SortInfo;
};

export type ModuloResumo = {
  candidatoId: number;
  pessoaId: number;
  moduloId: number;
  adicional: boolean;
  nomeModulo: string;
  cargaHorariaModulo: number;
  totalUnidades: number;
  totalSessoes: number;
  unidades?: unknown | null;
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
  sort: SortInfo;
  empty: boolean;
};

export type GetModulosParams = {
  personId: number;
  registrationCode: string;
  page?: number;
  size?: number;
};
