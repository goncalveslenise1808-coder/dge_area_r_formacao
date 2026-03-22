import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/atoms/card";
import {Label} from "@/components/atoms/label";
import {Switch} from "@/components/atoms/switch";
import {notification} from "@/dataEstaticos/dadosEstaticos";

export function CardNotificacoes(){
    return(
        <Card>
            <CardHeader>
                <CardTitle>Notificações</CardTitle>
                <CardDescription>Gerencie como deseja receber notificações</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {notification.map(n => (
                    <div key={n.id} className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>{n.title}</Label>
                            <p className="text-sm text-muted-foreground">{n.description}</p>
                        </div>
                        <Switch defaultChecked={n.checked} />
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}