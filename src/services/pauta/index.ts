import { customFetch } from "@/lib/customFetch";
import {mapCurso} from "@/services/pauta/mapper";
import { Curso } from "@/services/pauta/type";

export async function getPauta({
   pessoaId,
   registrationCode
}: {
    pessoaId: number;
    registrationCode?: string;
}): Promise<Curso[]> {
    const data = await customFetch(`/pauta/${pessoaId}?registrationCode=${registrationCode}`, {
        method: "GET",
    });

    return Array.isArray(data) ? data.map(mapCurso) : [];
}
