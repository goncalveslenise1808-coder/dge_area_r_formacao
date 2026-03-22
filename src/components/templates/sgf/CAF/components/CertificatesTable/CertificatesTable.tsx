import { Table, TableBody } from "@/components/atoms/table"
import {CertificatesTableHeader} from "@/components/templates/sgf/CAF/components/CertificatesTable/CertificatesTableHeader";
import {CertificatesTableRow} from "@/components/templates/sgf/CAF/components/CertificatesTable/CertificatesTableRow";
import {Certificate} from "@/components/templates/sgf/CAF";

interface CertificatesTableProps {
    certificates: Certificate[]
}

export function CertificatesTable({ certificates }: CertificatesTableProps) {
    return (
        <Table>
            <CertificatesTableHeader />
            <TableBody>
                {certificates.map(cert => (
                    <CertificatesTableRow key={cert.id} cert={cert} />
                ))}
            </TableBody>
        </Table>
    )
}
