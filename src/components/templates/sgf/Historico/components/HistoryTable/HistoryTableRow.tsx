import {TableBody, TableCell, TableRow} from "@/components/atoms/table";
import {Badge} from "@/components/atoms/badge";
import {HistoricoType} from "@/services/sgf/type";

interface HistoricoTableProps {
    historico: HistoricoType[]
}
export function HistoryTableRow({historico}: HistoricoTableProps){
    return(
        <TableBody>
            {historico.map((item) => (
                <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.formacao}</TableCell>
                    <TableCell>{item.periodo}</TableCell>
                    <TableCell>{item.local}</TableCell>
                    <TableCell className="text-center">{item.participantes}</TableCell>
                    <TableCell className="text-center">
                        <Badge variant="secondary">{item.avaliacao}/5.0</Badge>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    )
}