import { customFetch } from "@/lib/customFetch";
import { IAusenciaList } from "@/services/ausencias/getListAusencia/type";

export async function postJustificationAucensia({
    pessoaId,
    payload
}: {
    pessoaId: number
    payload: any
}) {
    const justification = new FormData();

    // Campos simples
    justification.append("absenceId", payload.get("absenceId"));
    justification.append("absenceReason", payload.get("absenceReason"));
    justification.append("justificationDescription", payload.get("justificationDescription"));

    // Arquivo
    if (payload.get("attachment") instanceof File) {
        justification.append("attachment", payload.get("attachment"));
    }

    const data = await customFetch<IAusenciaList[]>(
        `/ausencia/justificar/${pessoaId}`,
            {
                method: "POST",
                    body: justification
            }
        );

    return data;
}