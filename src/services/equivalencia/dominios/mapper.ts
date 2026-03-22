import {IDocumentoAnexo} from "@/services/equivalencia/dominios/type";

export function mapDocumentos(data: any[]): IDocumentoAnexo[] {
    return data.map((item) => ({
        descricao: item.DESCRICAO,
        obrigatorio: item.Obrigatorio === "1",
        valor: Number(item.VALOR),
    }));
}
