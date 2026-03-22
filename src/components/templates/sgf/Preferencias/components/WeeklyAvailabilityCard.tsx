import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/atoms/card";
import {Checkbox} from "@/components/atoms/checkbox";
import {Label} from "@/components/atoms/label";
import {disponibilidade} from "@/dataEstaticos/dadosEstaticos";

export function WeeklyAvailabilityCard(){

    return(
        <Card>
            <CardHeader>
                <CardTitle>Disponibilidade Semanal</CardTitle>
                <CardDescription>Indique os períodos em que está disponível para formações</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {disponibilidade.map((item) => (
                        <div key={item.dia} className="flex items-center gap-4 border-b pb-3 last:border-0">
                            <span className="w-32 font-medium">{item.dia}</span>
                            <div className="flex gap-4">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id={`${item.dia}-manha`} defaultChecked={item.manha} />
                                    <Label htmlFor={`${item.dia}-manha`}>Manhã</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id={`${item.dia}-tarde`} defaultChecked={item.tarde} />
                                    <Label htmlFor={`${item.dia}-tarde`}>Tarde</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id={`${item.dia}-noite`} defaultChecked={item.noite} />
                                    <Label htmlFor={`${item.dia}-noite`}>Noite</Label>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}