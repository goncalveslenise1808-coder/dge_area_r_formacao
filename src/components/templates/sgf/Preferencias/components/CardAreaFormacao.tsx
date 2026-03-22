import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/atoms/card";
import {Checkbox} from "@/components/atoms/checkbox";
import {Label} from "@/components/atoms/label";
import {areasFormacao} from "@/dataEstaticos/dadosEstaticos";

export function CardAreaFormacao(){
    return(
        <Card>
            <CardHeader>
                <CardTitle>Áreas de Formação</CardTitle>
                <CardDescription>Selecione as áreas em que tem interesse em formar</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-3">
                    {areasFormacao.map((area) => (
                        <div key={area} className="flex items-center space-x-2">
                            <Checkbox id={area} />
                            <Label htmlFor={area}>{area}</Label>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}