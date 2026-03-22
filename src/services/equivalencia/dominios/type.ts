export interface IDocumentoAnexo {
    descricao: string;
    obrigatorio?: boolean;
    valor: number;
}

export interface IDominioItem {
    value: string;
    label: string;
}

export type IDominioResponse = Record<string, Record<string, string>[]>;
