'use server'
import { customFetchBaseAPI } from "@/lib/customFetchBaseAPI";
import { IAlertasResponse } from "@/services/notification/type";
import { mockNotificacoes, USE_MOCK_DATA } from "@/services/mock/data";

export async function getAlerta({ email }: { email: string }) {
    // Usar dados mock em desenvolvimento
    if (USE_MOCK_DATA) {
        return mockNotificacoes;
    }

    try {
        const data = await customFetchBaseAPI<IAlertasResponse>(
            `/notification?email=${email}`,
            {
                method: "GET"
            }
        );

        return data ?? mockNotificacoes;
    } catch (error) {
        console.error("Erro ao buscar alertas:", error);
        return mockNotificacoes; // Fallback para mock
    }
}

export async function putReadAlert({
    id
}:{
    id: number
}){
    // Em modo mock, simular sucesso
    if (USE_MOCK_DATA) {
        return { success: true };
    }

    try {
        const data = await customFetchBaseAPI<IAlertasResponse>(
            `/notification/read/${id}`,
            {
                method: "PUT"
            }
        );

        return data;
    } catch (error) {
        console.error("Erro ao marcar alerta como lido:", error);
        return { success: false };
    }
}

export async function putStatusNotification({
   id,
   status
}:{
    id: number
    status: string
}){
    // Em modo mock, simular sucesso
    if (USE_MOCK_DATA) {
        return { success: true };
    }

    try {
        const data = await customFetchBaseAPI(
            `/notification/alterar-estado/${id}?status=${status}`,
            {
                method: "PUT"
            }
        );

        return data;
    } catch (error) {
        console.error("Erro ao alterar estado da notificação:", error);
        return { success: false };
    }
}
