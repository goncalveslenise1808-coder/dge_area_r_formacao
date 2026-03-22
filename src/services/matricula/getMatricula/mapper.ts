import {IMatriculaInfo} from "@/services/matricula/type";

export function mapperGetDataMatricula(response: any): IMatriculaInfo {
    return {
        duc: response.duc ?? "",
        applicationCode: response.applicationCode ?? "",
        enrollmentFee: response.enrollmentFee ?? "",
        qualificationDescription: response.qualificationDescription ?? "",
        registrationDate: response.registrationDate ?? "",
        status: response.status ?? ""
    };
}
