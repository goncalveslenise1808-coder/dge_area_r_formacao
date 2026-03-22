import {  ModuloResumo, Page } from "./types";

export function mapModuloResumo(api: any): ModuloResumo {
  return {
    candidatoId: api.candidato_id,
    pessoaId: api.pessoa_id,
    moduloId: api.id_modulo,
    adicional: api.adicional,
    nomeModulo: api.nome_modulo,
    cargaHorariaModulo: api.carga_horaria_modulo,
    totalUnidades: api.total_unidades,
    totalSessoes: api.total_sessoes,
    unidades: api.unidades ?? null,
  };
}

export function mapPage<TApi, TOut>(
  api: any,
  itemMapper: (x: TApi) => TOut
): Page<TOut> {
  return {
    content: (api.content ?? []).map(itemMapper),
    pageable: {
      pageNumber: api.pageable?.pageNumber ?? api.number ?? 0,
      pageSize: api.pageable?.pageSize ?? api.size ?? 10,
      offset: api.pageable?.offset ?? 0,
      paged: api.pageable?.paged ?? true,
      unpaged: api.pageable?.unpaged ?? false,
      sort: api.pageable?.sort ?? api.sort,
    },
    totalPages: api.totalPages ?? 0,
    totalElements: api.totalElements ?? 0,
    last: !!api.last,
    numberOfElements: api.numberOfElements ?? api.content?.length ?? 0,
    first: !!api.first,
    size: api.size ?? api.pageable?.pageSize ?? 10,
    number: api.number ?? api.pageable?.pageNumber ?? 0,
    sort: api.sort,
    empty: !!api.empty,
  };
}
