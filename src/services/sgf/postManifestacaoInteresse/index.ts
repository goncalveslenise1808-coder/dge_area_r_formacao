'use server'
import {customFetch} from "@/lib/customFetch";
import {ManifestacaoFormData} from "@/components/templates/sgf/Manifestacao/hooks/Schema/useSchema";

interface ManiInteresseProps {
    success: boolean,
    message: string,
    data: {}
}

export async function postManifestacaoInteresse(
    data: ManifestacaoFormData,
    pessoaId: number | undefined
) {

    if (!pessoaId) {
        throw new Error("pessoaId é obrigatório");
    }

    const formData = new FormData();

    const appendFormData = (data: any, parentKey?: string) => {
        if (data === null || data === undefined) return;

        if (data instanceof File) {
            formData.append(parentKey!, data);
        } else if (Array.isArray(data)) {
            data.forEach((item, index) => {
                appendFormData(item, `${parentKey}[${index}]`);
            });
        } else if (typeof data === "object") {
            Object.keys(data).forEach(key => {
                appendFormData(
                    data[key],
                    parentKey ? `${parentKey}.${key}` : key
                );
            });
        } else {
            formData.append(parentKey!, data);
        }
    };

    appendFormData(data);

    const resp = await customFetch<ManiInteresseProps>(
        `/manifestacao-interesse?pessoaId=${pessoaId}`,
        {
            method: "POST",
            body: formData,
        }
    );

    return resp
}
