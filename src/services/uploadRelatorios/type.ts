export interface IUploadRelatorio {
    content: {
        estagiarioId: number;
        nomeCurso: string;
        modulo: string;
        periodo: string;
        estado: string;
        relatorioUpload: string;
    }[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    last: boolean;
}

export interface IGetDocumentType {
    id: string;
    descricao: string;
}

export type IGetDocumentTypeResponse = IGetDocumentType[]