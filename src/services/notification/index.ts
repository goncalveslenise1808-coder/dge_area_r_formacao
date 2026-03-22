'use server'
import { customFetchBaseAPI } from "@/lib/customFetchBaseAPI";
import { IAlertasResponse } from "@/services/notification/type";

export async function getAlerta({ email }: { email: string }) {
    const data = await customFetchBaseAPI<IAlertasResponse>(
        `/notification?email=${email}`,
        {
            method: "GET"
        }
    );

    return data;
}

export async function putReadAlert({
    id
}:{
    id: number
}){
    const data = await customFetchBaseAPI<IAlertasResponse>(
        `/notification/read/${id}`,
        {
            method: "PUT"
        }
    );

    return data
}

export async function putStatusNotification({
   id,
   status
}:{
    id: number
    status: string
}){
    const data = await customFetchBaseAPI(
        `/notification/alterar-estado/${id}?status=${status}`,
        {
            method: "PUT"
        }
    );

    return data
}