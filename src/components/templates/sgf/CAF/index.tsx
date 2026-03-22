import { Button } from "@/components/atoms/button"
import { FileText } from "lucide-react"
import {CertificationSummaryCards} from "@/components/templates/sgf/CAF/components/CertificationSummaryCards";
import {CertificatesTable} from "@/components/templates/sgf/CAF/components/CertificatesTable/CertificatesTable";

type CertificateStatus = "valid" | "expired"
export interface Certificate {
    id: number
    name: string
    number: string
    validity: string
    status: CertificateStatus
}

export const certificates: Certificate[] = [
    {
        id: 1,
        name: "CAP - Pedagogical Aptitude Certificate",
        number: "F123456",
        validity: "2027-12-31",
        status: "valid",
    },
    {
        id: 2,
        name: "Training Management Certification",
        number: "GF789012",
        validity: "2026-06-30",
        status: "valid",
    },
    {
        id: 3,
        name: "E-Learning Specialization",
        number: "EL345678",
        validity: "2025-03-15",
        status: "expired",
    },
]

export function CAFTemplate() {

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">CCF</h1>
                    <p className="text-muted-foreground">Certificados de Aptidão de Formador</p>
                </div>
                <Button>
                    <FileText className="mr-2 h-4 w-4" />
                    Adicionar Certificado
                </Button>
            </div>

            <CertificationSummaryCards/>
            <CertificatesTable certificates={certificates}/>
        </div>
    )
}
