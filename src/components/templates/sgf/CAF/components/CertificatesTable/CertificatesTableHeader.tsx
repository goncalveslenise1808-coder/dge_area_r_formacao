import { TableHead, TableHeader, TableRow } from "@/components/atoms/table"

export function CertificatesTableHeader(){
    return (
        <TableHeader>
            <TableRow>
                <TableHead>Certificate</TableHead>
                <TableHead>Number</TableHead>
                <TableHead>Validity</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
            </TableRow>
        </TableHeader>
    )
}

