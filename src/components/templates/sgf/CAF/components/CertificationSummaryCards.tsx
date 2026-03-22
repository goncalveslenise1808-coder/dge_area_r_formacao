import {Card, CardContent, CardHeader, CardTitle} from "@/components/atoms/card";

export function CertificationSummaryCards(){
    return(
        <div className="grid gap-4 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Certificados Válidos</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold text-green-600">2</div>
                    <p className="text-sm text-muted-foreground">certificados ativos</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Próxima Renovação</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold text-amber-600">Jun 2026</div>
                    <p className="text-sm text-muted-foreground">Certificação em Gestão de Formação</p>
                </CardContent>
            </Card>
        </div>
    )
}