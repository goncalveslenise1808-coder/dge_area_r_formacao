import { IProcesso } from "./interface/type";

export function mapperProcesso(raw: IProcesso): IProcesso {
    return {
        id: raw?.id ?? 0,
        numero: raw.numero ?? '',
        app_dad: raw.app_dad ?? '',
        pessoa_id: raw.pessoa_id ?? '',
        entidade_nif: raw.entidade_nif ?? '',
        tipo: raw.tipo ?? '',
        titulo: raw.titulo ?? '',
        descricao: raw.descricao ?? '',
        entidade: raw.entidade ?? '',
        percentagem: raw.percentagem ?? '',
        data_inicio: raw.data_inicio ?? '',
        data_fim: raw.data_fim ?? '',
        data_fim_previsto: raw.data_fim_previsto ?? '',
        etapa_atual: raw.etapa_atual ?? '',
        estado: raw.estado ?? '',
        estado_desc: raw.estado_desc ?? '',
        detalhes: raw.detalhes ?? {},
        eventos: (raw.eventos || []).map((e: any) => ({
            titulo: e.titulo ?? '',
            descricao: e.descricao ?? '',
            data: e.data,
            items: e.items || {}
        })),
        anexos: (raw.anexos || []).map((e: any) => ({
            titulo: e.titulo ?? '',
            datetime: e.datetime ?? '',
            url: e.url,
            input: e.input ?? false
        })),
        comunicacoes: (raw.comunicacoes || []).map((c: any, index: number) => ({
            id: index,
            titulo: c.titulo ?? '',
            datetime: c.datetime ?? '',
            descricao: c.descricao ?? '',
            urls: Array.isArray(c.urls)
                ? c.urls.map((u: any) => ({
                    titulo: u.titulo ?? '',
                    url: u.url ?? '',
                    target: u.target ?? '',
                }))
                : []
        }))

    };
}
