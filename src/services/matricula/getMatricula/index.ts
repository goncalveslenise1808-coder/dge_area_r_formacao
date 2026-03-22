'use server'
import {customFetch} from "@/lib/customFetch";
import {IMatriculaInfo} from "@/services/matricula/type";
import {mapperGetDataMatricula} from "@/services/matricula/getMatricula/mapper";

interface ICandProps {
    pessoaId?: number;
}
export async function getDataMatricula({
  pessoaId,
}: ICandProps): Promise<IMatriculaInfo> {
    const data = await customFetch<IMatriculaInfo>(
        `/matricula/${pessoaId}`,
        {
            method: "GET",
        }
    );
    console.log("========================");
    console.log({data: data});
    console.log("========================");
    return mapperGetDataMatricula(data);
}
