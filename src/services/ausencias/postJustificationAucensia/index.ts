import { customFetch } from "@/lib/customFetch";
import { IAusenciaList } from "@/services/ausencias/getListAusencia/type";
import { USE_MOCK_DATA } from "@/services/mock/data";

export async function postJustificationAucensia({
    pessoaId,
    payload
}: {
    pessoaId: number
    payload: FormData
}) {
    // Em modo mock, simular sucesso
    if (USE_MOCK_DATA) {
        return { success: true, message: "Justificação enviada com sucesso" };
    }

    try {
        const justification = new FormData();

        // Campos simples
        justification.append("absenceId", payload.get("absenceId") as string);
        justification.append("absenceReason", payload.get("absenceReason") as string);
        justification.append("justificationDescription", payload.get("justificationDescription") as string);

        // Arquivo
        if (payload.get("attachment") instanceof File) {
            justification.append("attachment", payload.get("attachment") as File);
        }

        const data = await customFetch<IAusenciaList[]>(
            `/ausencia/justificar/${pessoaId}`,
            {
                method: "POST",
                body: justification
            }
        );

        return data;
    } catch (error) {
        console.error("Erro ao enviar justificação:", error);
        return { success: false, message: "Erro ao enviar justificação" };
    }
}
