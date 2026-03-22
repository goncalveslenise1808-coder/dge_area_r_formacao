import {IDominioItem, IDominioResponse} from "@/services/equivalencia/dominios/type";

export function mapDominio(data: IDominioResponse): IDominioItem[] {
    const [domainKey] = Object.keys(data);

    const items = data[domainKey];

    return items.map((item) => {
        const [value, label] = Object.entries(item)[0];
        return { value, label };
    });
}
