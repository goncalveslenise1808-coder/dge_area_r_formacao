import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/atoms/card"
import {Table} from "@/components/atoms/table"
import {TrainingStatsCards} from "@/components/organisms/TrainingStatsCards";
import {HistoryTableHeader} from "@/components/templates/sgf/Historico/components/HistoryTable/HistoryTableHeader";
import {HistoryTableRow} from "@/components/templates/sgf/Historico/components/HistoryTable/HistoryTableRow";
import {historico} from "@/dataEstaticos/dadosEstaticos";
import {Calendar, CircleCheck, CircleSlash, FileText} from "lucide-react";

export function HistoricoFormacaoTemplate() {

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Histórico de Formação</h1>
                <p className="text-muted-foreground">Consulte todas as formações que ministrou</p>
            </div>

            {/* Car Info */}
            <TrainingStatsCards
                values={[4, 3, 1, 6]}
                titles={['Total Pedidos', 'Em Análise', 'Aprovados', 'Cancelados']}
                icons={[Calendar, FileText, CircleCheck, CircleSlash]}
            />

            <Card>
                <CardHeader>
                    <CardTitle>Formações Realizadas</CardTitle>
                    <CardDescription>Lista completa das formações ministradas</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <HistoryTableHeader/>
                        <HistoryTableRow historico={historico}/>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
