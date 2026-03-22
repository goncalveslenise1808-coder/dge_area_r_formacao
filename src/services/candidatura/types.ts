
export interface IPagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

export interface IDocumentNecessary {
    id: number,
    label: string,
    url: string,
    file: {
        documentId: string,
        url: string
    },
}

export interface IProgramaFormativa {
    id: number,
    title: string,
    description: string
}

export interface ISaidaProfissional {
    id: number,
    label: string
}

export interface IOfertaFormativa {
    codigo_qualificacao: string
    formacao: string;
    denominacao_entidade: string;
    familia: string;
    carga_horaria: string;
    concelho: string;
    valor_propina: string;
    valor_matricula: string;
    condicoes_acesso: string;
    data_fim: string;
    data_inicio: string;

    data_avalicao: string,
    data_resultado: string,
    data_inicio_formacao: string,
    data_fim_formacao: string,

    detalhes_oferta: string;
    documentId: string;
    slug: string;
    hora_fim: string;
    hora_inicio: string;
    ilha: string;
    metodologia: string;
    nif_entidade: number;
    nivel: string;
    numero_vagas: string;
    referencia_formacao: string;
    texto_informativo: string;
    duracao: string,
    modalidade: string,
    periodo_formacao: string,
    saida_profissional_desc: string;
    url_logo_entidade: string;
    website_entidade: string;

    documentos_necessarios: IDocumentNecessary[];
    programa_formativo: IProgramaFormativa[];
    saidas_profissionais?: ISaidaProfissional[];
    criterio_selecao?: ISaidaProfissional[];
}

export interface IOfertasFormativasData {
    nodes: IOfertaFormativa[];
    pageInfo?: IPagination;
}

export interface IOfertaFormativaListItem {
    documentId: string;
    formacao: string;
    denominacao_entidade: string;
    url_logo_entidade: string;
    slug: string;
    duracao: string;
    periodo_formacao: string;
    referencia_formacao: string;
    nivel: string;
}
