export interface IConfirmarMatriculaResponse {
    success: boolean;
    duc: string | null;
    Reference: string | null;
    amount: number | null;
    message: string;
}

export interface IMatriculaInfo {
    duc: string;
    applicationCode: string;
    enrollmentFee: string;
    qualificationDescription: string;
    registrationDate: string;
    status: string;
}
