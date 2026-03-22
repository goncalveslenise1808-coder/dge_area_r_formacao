export interface Requisicao {
    id: number;
    nProcesso: number;
    dataCreate: string;
    dataUpdate: string | null;
    userCreate: string | null;
    userUpdate: string | null;
    etapa: number;
    status: number;
}

export interface Requerente {
    id?: number;
    pessoaId?: number;
    nif: number;
    nome: string;
    docNumero: string;
    dataNascimento: string;
    nacionalidade: string;
    sexo: string;
    habilitacao: string;
    docIdentificacao: string;
    dataEmissaoDoc: string;
    dataValidadeDoc: string;
    email: string | null;
    contato: string | null;
    userCreate: string | null;
    userUpdate: string | null;
    dateCreate: string;
    dataUpdate: string | null;
}

export interface InstituicaoEnsino {
    id: number;
    nome: string;
    dateCreate: string | null;
    pais: string;
    status: string | null;
    userCreate: string | null;
}

export interface Pedido {
    formacao_profissional: string;
    ano_conclusao: string
    ano_inicio: string
    carga_horaria: string
    instituicao: string
    pais_obtencao: string
}

export interface Payload {
    requerente: Requerente;
    pedidos: Pedido[];
}
