'use server'
import {customFetchDominio} from "@/lib/customFetchDominio";

export interface IGetReclamacaoProps {
    numeroProcesso: number,
    numeroApresentacao: number,
    paisObtencao: string,
    instituicaoFtp: string,
    cargaHoraria: number,
    dataDespacho: string,
    despacho: string,
    podeAlterarSolic: boolean,
    messagemEstado: string
}
export async function getReclamacao({n_processo}: {n_processo: string}) {
    const data = await customFetchDominio<IGetReclamacaoProps>(
        `/pedidos/processo/reclamacao/${n_processo}`, {
            method: "GET",
        });

    return data;
}

interface ReclamacaoProps {
    n_processo: string;
    observacao: string;
    decisao: number;
}
export async function postReclamacao({
     n_processo,
     observacao,
     decisao,
 }: ReclamacaoProps) {

    const formData = new FormData();

    formData.append("anexo", "");

    console.log("========================");
    console.log({formData_Enviado: formData});
    console.log("========================");

    const data = await customFetchDominio(
        `/reclamacao/${n_processo}?observacao=${encodeURIComponent(observacao)}&decisao=${decisao}`,
        {
            method: "POST",
            body: formData,
        }
    );

    return data;
}

