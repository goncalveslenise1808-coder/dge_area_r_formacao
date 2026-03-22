import {TableHead, TableHeader, TableRow} from "@/components/atoms/table";

export function HistoryTableHeader(){
    return(
        <TableHeader>
            <TableRow>
                <TableHead>Formação</TableHead>
                <TableHead>Período</TableHead>
                <TableHead>Local</TableHead>
                <TableHead className="text-center">Participantes</TableHead>
                <TableHead className="text-center">Avaliação</TableHead>
            </TableRow>
        </TableHeader>
    )
}