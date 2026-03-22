'use server'
import {customFetch} from "@/lib/customFetch";
import {IGetDocumentTypeResponse, IUploadRelatorio} from "@/services/uploadRelatorios/type";

export async function getTypeDocument({
  reference
}:{
    reference: "RELAT_ESTAGIO" | "RELAT_AVALIACAO" | "RELAT_FORMACAO"
}){
    const data = await  customFetch<IGetDocumentTypeResponse>(
        `/relatorio/tipos-documento?reference=${reference}`,
        {
            method: 'GET'
        }
    )

    return data;
}

export async function getListPendingRelatorioEstagio({
     personId,
     registrationCode,
}:{
    personId: string
    registrationCode: string
    page?: number
    size?: number
}){
    const data = await  customFetch<IUploadRelatorio>(
        `/relatorio/lista?personId=${personId}&registrationCode=${registrationCode}`,
        {
            method: 'GET'
        }
    )

    return data;
}

export async function postUploadRelatorios({
    internshipId,
    documentTypeId,
    attachment
}:{
    internshipId: number
    documentTypeId: string
    attachment: File
}){

    const formData = new FormData();

    formData.append('attachment', attachment);

    const data: any = await  customFetch(
        `/relatorio/upload?internshipId=${internshipId}&documentTypeId=${documentTypeId}`,
        {
            method: 'POST',
            body: formData
        }
    )

    return data;
}