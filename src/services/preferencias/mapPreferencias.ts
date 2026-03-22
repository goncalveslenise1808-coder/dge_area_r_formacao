import {FormacaoResponse} from "@/services/preferencias/type";

export function mapPreferencias(res: any): FormacaoResponse {
    return {
        familias: res?.familias ?? [],
        qualificacoes: res?.qualificacoes ?? [],
        modulos: res?.modulos ?? [],
        unidades: res?.unidades ?? [],
        selecionadas: res?.selecionadas ?? {
            entidadeId: 0,
            codigoFamilia: "",
            qualificacaoId: 0,
            moduloId: 0,
            moduloOrigem: ""
        }
    };
}