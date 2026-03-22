import { IEquivalencia } from "./type";

export function mapToEquivalencia(data: any): IEquivalencia | IEquivalencia[] {
    if (Array.isArray(data)) {
        return data.map((item, index) => ({
            id: index,
            formacaoOriginal: String(item.formacaoOriginal || ''),
            entidadeOriginal: String(item.entidadeOriginal || ''),
            equivalencia: String(item.equivalencia || ''),
            nivelQualificacao: String(item.nivelQualificacao || ''),
            url: String(item.url || ''),
            dataEmissao: String(item.dataEmissao || ''),
            entidadeEmissora: String(item.entidadeEmissora || ''),
            numeroProcesso: String(item.numeroProcesso || ''),
            paisOrigem: String(item.paisOrigem || '')
        }));
    }

    return {
        id: 0,
        formacaoOriginal: String(data.formacaoOriginal || ''),
        entidadeOriginal: String(data.entidadeOriginal || ''),
        equivalencia: String(data.equivalencia || ''),
        nivelQualificacao: String(data.nivelQualificacao || ''),
        url: String(data.url || ''),
        dataEmissao: String(data.dataEmissao || ''),
        entidadeEmissora: String(data.entidadeEmissora || ''),
        numeroProcesso: String(data.numeroProcesso || ''),
        paisOrigem: String(data.paisOrigem || '')
    };
}
