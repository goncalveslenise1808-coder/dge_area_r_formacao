import {customFetchDominio} from "@/lib/customFetchDominio";
import {IEquivalencia} from "@/services/equivalencia/certificado/type";
import {mapToEquivalencia} from "@/services/equivalencia/certificado/mapper";

export async function getCertificado({ id }: { id: number }) {
    try {
        if (!id) return null;

        const data = await customFetchDominio<IEquivalencia[]>(
            `/certificado/portal/${id}`,
            { method: "GET" }
        );

        return mapToEquivalencia(data);

    } catch (error: any) {
        console.error("Erro ao buscar certificado:", error?.message);
        return null;
    }
}
