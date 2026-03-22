import { Curso } from "@/services/pauta/type";


export function mapCurso(c: any): Curso {

    return {
        id: c.id,
        nomeCurso: c.nomeCurso,
        nomeEntidade: c.nomeEntidade,
        notaAtual: c.notaAtual,
        percentagem: c.percentagem,
        modulos: Array.isArray(c.modulos)
            ? c.modulos.map((m: any) => ({
                id: m.id,
                nomeModulo: m.nomeModulo,
                nota: m.nota,
                peso: m.peso,
                completo: m.completo,
                unidades: Array.isArray(m.unidades)
                    ? m.unidades.map((u: any) => ({
                        id: u.id,
                        unidadeNome: u.unidadeNome,
                        dateAvaliation: u.dateAvaliation,
                        nota: u.nota,
                        statusUnidade: u.statusUnidade
                    }))
                    : []
            }))
            : []
    };
}
