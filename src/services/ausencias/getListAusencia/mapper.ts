import {IAusenciaList, MotivoFalta, MotivoFaltaApi} from "./type";

export function mapperListaAusencia(raw: any): IAusenciaList {
    return {
        content: (raw?.content || []).map((item: any) => ({
            ausenciaId: Number(item.ausenciaId),
            data: String(item.data),
            tipoSessao: String(item.tipoSessao),
            numeroSessao: String(item.numeroSessao),
            modulo: String(item.modulo),
            unidadeFormacao: String(item.unidadeFormacao),
            justificacaoAusencia: {
                motivo: item.justificacaoAusencia?.motivo ?? null,
                estado: String(item.justificacaoAusencia?.estado ?? ""),
                observacoes: String(item.justificacaoAusencia?.observacoes ?? ""),
                linkAnexo: item.justificacaoAusencia?.linkAnexo ?? null
            }
        })),
        total: Number(raw?.total ?? 0),
        page: Number(raw?.page ?? 1),
        pageSize: Number(raw?.pageSize ?? 10)
    };
}


export function mapMotivosFalta(apiResponse: any): MotivoFalta[] {
    const lista = apiResponse?.MOTIVO_AUSENCIA;

    if (!Array.isArray(lista)) return [];

    return lista.flatMap((item: MotivoFaltaApi) =>
        Object.entries(item).map(([codigo, descricao]) => ({
            codigo,
            descricao,
        }))
    );
}