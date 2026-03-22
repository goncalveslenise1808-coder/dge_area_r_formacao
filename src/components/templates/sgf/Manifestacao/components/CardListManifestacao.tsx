import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/atoms/card";
import {FileText} from "lucide-react";
import {Button} from "@/components/atoms/button";
import type React from "react";
import { Manifestacao } from "..";

interface CardListManifestacaoProps{
    manifestacoes?: Manifestacao[],
    setSelectedManifestacao?: React.Dispatch<React.SetStateAction<Manifestacao | null>>,
    setDetailsOpen?: React.Dispatch<React.SetStateAction<boolean>>
    setManifestacaoToCancel?: React.Dispatch<React.SetStateAction<Manifestacao | null>>
    setCancelOpen?: React.Dispatch<React.SetStateAction<boolean>>,
    getStatusBadge: (status: string) => React.ReactNode
}

export function CardListManifestacao({
    manifestacoes,
    getStatusBadge
}: CardListManifestacaoProps){
    const handleViewDetails = (item: Manifestacao) => {
      /*  setSelectedManifestacao?.(item)
        setDetailsOpen?.(true)*/
    }
    const handleCancelClick = (item: Manifestacao) => {
        //setManifestacaoToCancel?.(item)
        //setCancelOpen?.(true)
    }
    return(
        <div className="grid gap-4">
            {manifestacoes?.map((item) => (
                <Card key={item.id}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                        <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <CardTitle className="text-lg">{item.formacao}</CardTitle>
                                <CardDescription>Submetida em {item.data}</CardDescription>
                            </div>
                        </div>
                        {getStatusBadge(item.status)}
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleViewDetails(item)}>
                                Ver Detalhes
                            </Button>
                            {item.status === "pendente" && (
                                <Button variant="outline" size="sm" onClick={() => handleCancelClick(item)}>
                                    Cancelar
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}