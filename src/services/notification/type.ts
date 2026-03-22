export interface IAlertaEmail {
    id: number;
    mensagem: string;
    assunto: string;
    email: string;
    estado: string;
    dataRegisto: string;
    dataEnvio: string;
    appCode: string | null;
    flagLeitura: "SIM" | "NAO";
    statusNotificacao?: "ATIVA" | "ARQUIVADA";
    tipo: string;
    de: string;
    idAplicacao: number | null;
    emailsEnviados: string;
    tipoProcesso: string;
}

export interface IAlertasResponse {
    arquivadas: IAlertaEmail[];
    ativas: IAlertaEmail[];
}
