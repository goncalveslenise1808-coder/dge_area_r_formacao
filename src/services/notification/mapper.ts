/*
import { IAlertaProps } from "./type";

export function mapToAlerta(data: any): IAlertaProps {
    return {
        id: Number(data.id),
        mensagem: String(data.mensagem || ""),
        assunto: String(data.assunto || ""),
        email: String(data.email || ""),
        estado: String(data.estado || ""),
        dataRegisto: String(data.dataRegisto || ""),
        dataEnvio: String(data.dataEnvio || ""),
        appCode: data.appCode ?? null,
        flagLeitura: String(data.flagLeitura || ""),
        tipo: String(data.tipo || ""),
        de: String(data.de || ""),
        idAplicacao: data.idAplicacao ?? null,
        emailsEnviados: String(data.emailsEnviados || ""),
        tipoProcesso: String(data.tipoProcesso || ""),
        idProcesso: String(data.idProcesso || ""),
        tipoRelacao: String(data.tipoRelacao || ""),
        idRelacao: String(data.idRelacao || ""),
    };
}

export function mapToAlertas(data: any[]): IAlertaProps[] {
    if (!Array.isArray(data)) return [];
    const alertas = data.map(mapToAlerta);
    console.log("mapToAlertas -> array completo:", alertas);
    return alertas
}

/!*
import { IEmailHistorico, IHistoricoEmails } from "./type";

export function mapToEmailHistorico(data: IEmailHistorico): IEmailHistorico {

    console.log("========================");
    console.log({DataMapper: data});
    console.log("========================");
    return {
        id: Number(data.id),
        mensagem: String(data.mensagem || ""),
        assunto: String(data.assunto || ""),
        email: String(data.email || ""),
        estado: String(data.estado || ""),
        dataRegisto: String(data.dataRegisto || ""),
        dataEnvio: String(data.dataEnvio || ""),
        appCode: data.appCode ?? null,
        flagLeitura: data.flagLeitura === 'SIM' ? 'SIM' : 'NAO',
        tipo: String(data.tipo || ""),
        de: String(data.de || ""),
        idAplicacao: data.idAplicacao != null ? Number(data.idAplicacao) : null,
        emailsEnviados: String(data.emailsEnviados || ""),
        tipoProcesso: data.tipoProcesso != null ? String(data.tipoProcesso) : null,
        idProcesso: data.idProcesso != null ? Number(data.idProcesso) : null,
        tipoRelacao: data.tipoRelacao != null ? String(data.tipoRelacao) : null,
        idRelacao: data.idRelacao != null ? Number(data.idRelacao) : null,
        statusNotificacao: data.statusNotificacao === 'ARQUIVADA' ? 'ARQUIVADA' : 'ATIVA',
    };
}

export function mapToHistoricoEmails(data: any[]): IHistoricoEmails {
    if (!Array.isArray(data)) {
        return { arquivadas: [], ativas: [] };
    }

    const historico = data.map(mapToEmailHistorico);

    return {
        ativas: historico,
        arquivadas: historico,
    };
}
*!/
*/
