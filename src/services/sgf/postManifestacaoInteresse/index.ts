'use server'
import {customFetch} from "@/lib/customFetch";
import {ManifestacaoFormData} from "@/components/templates/sgf/Manifestacao/hooks/Schema/useSchema";
import { USE_MOCK_DATA } from "@/services/mock/data";

interface ManiInteresseProps {
    success: boolean,
    message: string,
    data: Record<string, unknown>
}

export async function postManifestacaoInteresse(
    data: ManifestacaoFormData,
    pessoaId: number | undefined
) {
    // Em modo mock, simular sucesso
    if (USE_MOCK_DATA) {
        return {
            success: true,
            message: "Manifestação de interesse registada com sucesso",
            data: { id: Date.now() }
        };
    }

    if (!pessoaId) {
        throw new Error("pessoaId é obrigatório");
    }

    const formData = new FormData();

    const appendFormData = (formDataObj: Record<string, unknown>, parentKey?: string) => {
        if (formDataObj === null || formDataObj === undefined) return;

        if (formDataObj instanceof File) {
            formData.append(parentKey!, formDataObj);
        } else if (Array.isArray(formDataObj)) {
            formDataObj.forEach((item, index) => {
                appendFormData(item, `${parentKey}[${index}]`);
            });
        } else if (typeof formDataObj === "object") {
            Object.keys(formDataObj).forEach(key => {
                appendFormData(
                    (formDataObj as Record<string, unknown>)[key] as Record<string, unknown>,
                    parentKey ? `${parentKey}.${key}` : key
                );
            });
        } else {
            formData.append(parentKey!, formDataObj as string);
        }
    };

    appendFormData(data as unknown as Record<string, unknown>);

    try {
        const resp = await customFetch<ManiInteresseProps>(
            `/manifestacao-interesse?pessoaId=${pessoaId}`,
            {
                method: "POST",
                body: formData,
            }
        );

        return resp;
    } catch (error) {
        console.error("Erro ao enviar manifestação de interesse:", error);
        return {
            success: false,
            message: "Erro ao enviar manifestação de interesse",
            data: {}
        };
    }
}
