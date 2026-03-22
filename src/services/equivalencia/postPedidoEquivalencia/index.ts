'use server';
import {IResponseEquivalencia} from "@/services/equivalencia/getEquivalencia/interface/type";
import {customFetchDominio} from "@/lib/customFetchDominio";

function limparFilesInvalidos(obj: any) {
    for (const key in obj) {
        if (!obj.hasOwnProperty(key)) continue;

        const value = obj[key];

        if (value instanceof File) continue;  // ok

        if (key.endsWith(".file")) {
            delete obj[key];
        }

        if (typeof value === "object" && value !== null) {
            limparFilesInvalidos(value);
        }
    }
}

export async function appendNestedFormData(formData: FormData, data: any, parentKey = '') {
    if (data === null || data === undefined) return;

    if (typeof data === 'object' && !(data instanceof File)) {
        Object.keys(data).forEach(key => {
            const fullKey = parentKey ? `${parentKey}.${key}` : key;
            appendNestedFormData(formData, data[key], fullKey);
        });
    } else {
        formData.append(parentKey, data);
    }
}

export interface IResponseWrapper {
    ok: boolean;
    data?: IResponseEquivalencia;
    message?: string;
}

export async function postPedidoEquivalencia(payload: any): Promise<IResponseWrapper> {
    try {

        const formData = new FormData();
        appendNestedFormData(formData, payload);

        const data = await customFetchDominio<IResponseEquivalencia>(
            `/pedidos/portal`,
            {
                method: "POST",
                body: formData,
            }
        );

        return {
            ok: true,
            data,
        };
    } catch (err: any) {
        return {
            ok: false,
            message: err.response?.data?.message || err.message || JSON.stringify(err),
        };
    }
}

export async function updatetPedidoEquivalencia(
    payload: any,
    n_processo: string
): Promise<IResponseWrapper> {
    try {
        limparFilesInvalidos(payload);
        const formData = new FormData();
        appendNestedFormData(formData, payload);

        const data = await customFetchDominio<IResponseEquivalencia>(
            `/pedidos/portal/requisicoes/${n_processo}/pedidos`,
            {
                method: "PUT",
                body: formData,
            }
        );
        return {
            ok: true,
            data,
        };
    } catch (err: any) {
        return {
            ok: false,
            message: err.response?.data?.message || err.message || JSON.stringify(err),
        };
    }
}
