export interface IEvento {
    titulo: string;
    descricao: string;
    data: string;
    items: IItems;
}

export interface IAnexo {
    titulo: string;
    datetime: string;
    url: string;
    input: boolean;
}

export interface IItems {
    estado: string;
    "Link Pag Online": string;
    "Link Duc"?: string;
    valor?: string;
    "link duc"?: string; // incluído porque aparece com minúsculas em um item
}

export interface IComunicacaoUrl {
    titulo: string;
    url: string;
    target: string;
}

export interface IComunicacao {
    titulo: string;
    datetime: string;
    descricao: string;
    items?: Record<string, string>;
    urls?: IComunicacaoUrl[];
}

export type IDetalhes = Record<string, string>;

export interface IProcesso {
    id: number,
    numero: string;
    app_dad: string;
    pessoa_id: number;
    entidade_nif: string | null;
    tipo: string;
    titulo: string;
    descricao: string;
    entidade: string;
    nuDuc?: string;
    urlDucPagamento?: string;
    verduc?: string;
    percentagem: number;
    data_inicio: string;
    data_fim: string;
    data_fim_previsto: string;
    etapa_atual: string;
    estado: string;
    estado_desc: string;
    detalhes: IDetalhes;
    eventos: IEvento[];
    anexos: IAnexo[];
    comunicacoes: IComunicacao[];
}

/* Tipagem para response */

interface IInstEnsino {
    id: number;
    nome: string;
    dateCreate: string | null;
    pais: string;
    status: number | null;
    userCreate: any | null;
}

export interface IPedido {
    id: string;
    instEnsino: IInstEnsino;
    formacaoProf: string;
    carga: number;
    anoInicio: number;
    anoFim: number;
    nivel?: string | null;
    familia?: string | null;
    despacho?: string | null;
    numDeclaracao?: string | null;
    dataDespacho?: string | null;
    urlDucPagamento?: string | null;
    nuDuc?: string | null;
    entidade?: string | null;
    referencia?: string | null;
    verduc?: string | null;
    documentos?: any | null;
    documentosresp?: any | null;
    status: number;
    etapa: string;
}

interface IRequisicao {
    id: number;
    dataCreate: string;
    dataUpdate: string | null;
    status: number;
    etapa: number;
    userCreate?: any | null;
    userUpdate?: any | null;
    pessoaId?: any | null;
    idPessoa?: any | null;
    pedidos?: any | null;
    nProcesso: number;
}

interface IRequerente {
    id: number;
    nif: number;
    nome: string;
    docNumero: string;
    dataNascimento: string;
    nacionalidade: string;
    sexo: string;
    sexo_desc: string;
    habilitacao: string;
    docIdentificacao: string;
    dataEmissaoDoc: string;
    dataValidadeDoc: string;
    email?: string | null;
    contato?: string | null;
    userCreate?: any | null;
    userUpdate?: any | null;
    dateCreate: string;
    dataUpdate?: string | null;
}

export interface IResponseEquivalencia {
    requisicao: IRequisicao;
    requerente: IRequerente;
    pedidos: IPedido[];
}


/* Type para API getPedidoEnviadoForProcesso */
