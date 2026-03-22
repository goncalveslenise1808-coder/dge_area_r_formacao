import { Button } from "@/components/atoms/button"
import { Badge } from "@/components/atoms/badge"
import { TableCell, TableRow } from "@/components/atoms/table"
import { Download, CheckCircle, AlertCircle } from "lucide-react"
import {Certificate} from "@/components/templates/sgf/CAF";

interface CertificatesTableRowProps {
    cert: Certificate
}

export function CertificatesTableRow({ cert }: CertificatesTableRowProps) {
    return (
        <TableRow>
            <TableCell className="font-medium">{cert.name}</TableCell>
            <TableCell>{cert.number}</TableCell>
            <TableCell>
                {new Date(cert.validity).toLocaleDateString("en-GB")}
            </TableCell>

            <TableCell className="text-center">
                {cert.status === "valid" ? (
                    <Badge className="bg-green-500 hover:bg-green-600">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Valid
                    </Badge>
                ) : (
                    <Badge variant="destructive">
                        <AlertCircle className="mr-1 h-3 w-3" />
                        Expired
                    </Badge>
                )}
            </TableCell>

            <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                </Button>
            </TableCell>
        </TableRow>
    )
}
