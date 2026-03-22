import {
  IDocumentNecessary,
  IOfertaFormativa,
  IProgramaFormativa,
  ISaidaProfissional,
  IQualificacoesApiResponse,
  IPaginatedResult,
} from "./type";

export function mapperOfertaFormativa(raw: any): IOfertaFormativa {
  return {
    referencia_formacao: raw?.referencia_formacao ?? "",
    formacao: raw?.formacao ?? "",
    codigo_qualificacao: raw?.codigo_qualificacao ?? "",
    denominacao_entidade: raw?.denominacao_entidade ?? "",
    nif_entidade: raw?.nif_entidade ?? "",
    slug: raw?.slug ?? "",
    url_logo_entidade: raw?.url_logo_entidade ?? null,
    website_entidade: raw?.website_entidade ?? null,
    data_inicio: raw?.data_inicio ?? "",
    data_fim: raw?.data_fim ?? "",
    duracao: raw?.duracao ?? "",
    carga_horaria: raw?.carga_horaria ?? "",
    numero_vagas: raw?.numero_vagas ?? "",
    periodo_formacao: raw?.periodo_formacao ?? "",
    valor_matricula: raw?.valor_matricula ?? null,
    valor_propina: raw?.valor_propina ?? "",
    data_inicio_formacao: raw?.data_inicio_formacao ?? "",
    data_fim_formacao: raw?.data_fim_formacao ?? "",
    data_avalicao: raw?.data_avalicao ?? "",
    data_resultado: raw?.data_resultado ?? "",
    condicoes_acesso: raw?.condicoes_acesso ?? "",
    detalhes_oferta: raw?.detalhes_oferta ?? null,
    ilha: raw?.ilha ?? "",
    concelho: raw?.concelho ?? "",
    nivel: raw?.nivel ?? "",
    modalidade: raw?.modalidade ?? "",
    familia: raw?.familia ?? null,
    tipo_oferta: raw?.tipo_oferta ?? null,
    tipo_oferta_codigo: raw?.tipo_oferta_codigo ?? "",
    documentos_necessarios: Array.isArray(raw?.documentos_necessarios)
      ? raw.documentos_necessarios.map(
          (doc: any, index: number): IDocumentNecessary => ({
            id: index,
            label: doc?.label ?? "",
            url: doc?.url ?? "",
            file: { documentId: "", url: "" },
          })
        )
      : [],
    criterio_selecao: Array.isArray(raw?.criterio_selecao)
      ? raw.criterio_selecao.map(
          (crit: any): ISaidaProfissional => ({
            descricao: crit?.descricao ?? "",
            label: crit?.label ?? "",
          })
        )
      : [],
    programa_formativo: Array.isArray(raw?.programa_formativo)
      ? raw.programa_formativo.map(
          (prog: any): IProgramaFormativa => ({
            denominacao: prog?.denominacao ?? "",
            label: prog?.label ?? "",
          })
        )
      : [],
    saida_profissional_desc: raw?.saida_profissional_desc ?? null,
    saidas_profissionais: Array.isArray(raw?.saidas_profissionais)
      ? raw.saidas_profissionais.map(
          (item: any): ISaidaProfissional => ({
            descricao: item?.descricao ?? "",
            label: item?.label ?? "",
          })
        )
      : [],
    texto_informativo: raw?.texto_informativo ?? null,
  };
}

export function mapQualificacoesResponse(
  raw: IQualificacoesApiResponse,
  fallbackPage = 0,
  fallbackSize = 10
): IPaginatedResult<IOfertaFormativa> {
  const items = Array.isArray(raw?.content)
    ? raw.content.map(mapperOfertaFormativa)
    : [];
  return {
    items,
    page: raw?.number ?? fallbackPage,
    size: raw?.size ?? fallbackSize,
    totalPages: raw?.totalPages ?? 0,
    totalElements: raw?.totalElements ?? 0,
    first: raw?.first ?? false,
    last: raw?.last ?? false,
    numberOfElements: raw?.numberOfElements ?? items.length,
    pageable: raw?.pageable ?? {
      pageNumber: fallbackPage,
      pageSize: items.length,
      offset: fallbackPage * (raw?.size ?? fallbackSize),
      paged: true,
      unpaged: false,
      sort: raw?.sort ?? { sorted: false, unsorted: true, empty: true },
    },
    sort: raw?.sort ?? { sorted: false, unsorted: true, empty: true },
    empty: raw?.empty ?? items.length === 0,
  };
}
