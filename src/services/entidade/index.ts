import {customFetch} from "@/lib/customFetch";
import {Entidade} from "@/services/entidade/type";

export async function getEntidadeFormadoras(): Promise<Entidade[]> {
    const entidades = await customFetch<Entidade[]>(
        `/entidades-formadoras`,
        {method: "GET"}
    )

    if (!Array.isArray(entidades)) {
        throw new Error(`[getEntidadeFormadoras] Resposta inválida da API. Esperado array, recebeu ${typeof entidades}`)
    }

    return entidades
}