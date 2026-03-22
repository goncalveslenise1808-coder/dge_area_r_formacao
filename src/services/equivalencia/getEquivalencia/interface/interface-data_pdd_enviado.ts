export interface IProcessoSend {
    idRequerente: number
    nif: number,
    nome: string,
    docNumero: number,
    dataNascimento: string,
    nacionalidade: string,
    sexo: string,
    habilitacao: string,
    docIdentificacao: string,
    dataEmissaoDoc: string,
    dataValidadeDoc: string,
    email: string,
    contato: number,
    dateCreate: string,
    dataUpdate: string,
    idPessoa: number,
    numeroProcesso: string,
    motivosRetificacao: IMotivoRetificacao[];
    pedidos: IPedido[];
}

export interface IMotivoRetificacao {
    numeroProcesso: number;
    motivoRetificacao: string;
}

export interface IPedido {
    id: number;
    formacaoProf: string;
    instituicaoEnsino: number;
    instituicaoEnsinoNome?: string;
    carga?: number;
    anoInicio: number;
    anoFim: number;
    paisInstituicao: string;
    paisNome: string;
    documentos: IDocumento[];
    podeAlterarSolic: boolean,
    messagemEstado: string
}

export interface IDocumento {
    id: number;
    fileName: string;
    path: string;
    tipoRelacao: string;
    idRelacao: number;
    idTpDoc: string;
    estado: string;
    appCode: string;
    previewUrl: string;
}
