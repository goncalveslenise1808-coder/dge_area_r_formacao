import {customFetch} from "@/lib/customFetch";
import {Entidade} from "@/services/entidade/type";
import { mockEntidadeFormadoras, USE_MOCK_DATA } from "@/services/mock/data";

export async function getEntidadeFormadoras(): Promise<Entidade[]> {
    // Usar dados mock em desenvolvimento
    if (USE_MOCK_DATA) {
        return mockEntidadeFormadoras;
    }

    try {
        const entidades = await customFetch<Entidade[]>(
            `/entidades-formadoras`,
            {method: "GET"}
        )

        if (!Array.isArray(entidades)) {
            console.error(`[getEntidadeFormadoras] Resposta inválida da API. Esperado array, recebeu ${typeof entidades}`)
            return mockEntidadeFormadoras; // Fallback para mock
        }

        return entidades
    } catch (error) {
        console.error("Erro ao buscar entidades formadoras:", error);
        return mockEntidadeFormadoras; // Fallback para mock
    }
}
