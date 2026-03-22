import {
  UnidadeFormativaResumoApi,
  ModuloComUnidadesApi,
  PageResponseApi,
  UnidadeFormativaResumo,
  ModuloComUnidades,
  Page,
} from "./types";

export function mapUnidade(
  u: UnidadeFormativaResumoApi
): UnidadeFormativaResumo {
  return {
    unidadeId: u.unidade_id,
    codigo: u.codigo_unidade,
    nome: u.nome_unidade,
    horas: u.horas_unidade,
    metodoAvaliacao: u.metodo_avaliacao ?? null,
    tipoConteudo: u.tipo_conteudo ?? null,
  };
}
export function mapModuloComUnidades(
  api: ModuloComUnidadesApi
): ModuloComUnidades {
  return {
    candidatoId: api.candidato_id,
    pessoaId: api.pessoa_id,
    moduloId: api.id_modulo,
    adicional: api.adicional,
    nomeModulo: api.nome_modulo,
    cargaHorariaModulo: api.carga_horaria_modulo,
    totalUnidades: api.total_unidades,
    totalSessoes: api.total_sessoes,
    unidades: Array.isArray(api.unidades) ? api.unidades.map(mapUnidade) : [],
  };
}

export function mapPage<TApi, TOut>(
  api: PageResponseApi<TApi>,
  itemMapper: (x: TApi) => TOut
): Page<TOut> {
  return {
    content: (api.content ?? []).map(itemMapper),
    pageable: api.pageable,
    totalPages: api.totalPages ?? 0,
    totalElements: api.totalElements ?? 0,
    last: !!api.last,
    numberOfElements: api.numberOfElements ?? api.content?.length ?? 0,
    first: !!api.first,
    size: api.size ?? api.pageable?.pageSize ?? 10,
    number: api.number ?? api.pageable?.pageNumber ?? 0,
    sort: api.sort ?? api.pageable?.sort,
    empty: !!api.empty,
  };
}

export function emptyPage<T>(page: number, size: number): Page<T> {
  return {
    content: [],
    pageable: {
      pageNumber: page,
      pageSize: size,
      sort: { sorted: false, unsorted: true, empty: true },
    },
    totalPages: 0,
    totalElements: 0,
    last: true,
    first: true,
    numberOfElements: 0,
    size,
    number: page,
    sort: { sorted: false, unsorted: true, empty: true },
    empty: true,
  };
}
