export interface IDocumentNecessary {
  id?: number;
  label: string;
  url: string;
  file: {
    documentId: string;
    url: string;
  };
}

export interface IProgramaFormativa {
  denominacao: string;
  label: string;
}

export interface ISaidaProfissional {
  descricao: string;
  label: string;
}

export interface IOfertaFormativa {
  referencia_formacao: string;
  formacao: string;
  codigo_qualificacao: string;
  denominacao_entidade: string;
  nif_entidade: string;
  slug: string;
  url_logo_entidade: string | null;
  website_entidade: string | null;
  data_inicio: string;
  data_fim: string;
  duracao: string;
  carga_horaria: string;
  numero_vagas: string;
  periodo_formacao: string;
  valor_matricula: string | null;
  valor_propina: string;
  data_inicio_formacao: string;
  data_fim_formacao: string;
  data_avalicao: string;
  data_resultado: string;
  condicoes_acesso: string;
  detalhes_oferta: string | null;
  ilha: string;
  concelho: string;
  nivel: string;
  modalidade: string;
  familia: string | null;
  tipo_oferta: string | null;
  tipo_oferta_codigo: string;
  documentos_necessarios: IDocumentNecessary[];
  criterio_selecao: ISaidaProfissional[];
  programa_formativo: IProgramaFormativa[];
  saida_profissional_desc: string | null;
  saidas_profissionais: ISaidaProfissional[];
  texto_informativo: string | null;
  statusCandidatoCurso?: string;
}

export interface ISort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface IPageable {
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
  sort: ISort;
}

export interface IQualificacoesApiResponse {
  content: any[];
  pageable: IPageable;
  totalElements: number;
  last: boolean;
  totalPages: number;
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  sort: ISort;
  empty: boolean;
}

export interface IPaginatedResult<T> {
  items: T[];
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  pageable: IPageable;
  sort: ISort;
  empty: boolean;
}

export interface ISearch {
  pesquisa?: string;
  dmModalidade?: string;
  nivel?: string;
  nif_entidade?: string;
  denominacaoFamilia?: string;
  denominacaoQualif?: string;
  codigoQualif?: string;
  code?: string;
  page?: number;
  size?: number;
}
