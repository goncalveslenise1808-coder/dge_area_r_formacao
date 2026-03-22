import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/atoms/card";
import {Briefcase, GraduationCap} from "lucide-react";
import {Separator} from "@/components/atoms/separator";
import {Badge} from "@/components/atoms/badge";

export function ProfessionalInfoCard(){
    return(
        <Card className="md:col-span-2">
            <CardHeader>
                <CardTitle>Informações Profissionais</CardTitle>
                <CardDescription>Dados sobre formação e experiência</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <GraduationCap className="h-5 w-5 text-muted-foreground" />
                        <h3 className="font-semibold">Formação Académica</h3>
                    </div>
                    <div className="space-y-2 pl-7">
                        <div>
                            <p className="font-medium">Mestrado em Gestão de Recursos Humanos</p>
                            <p className="text-sm text-muted-foreground">Universidade de Lisboa - 2015</p>
                        </div>
                        <div>
                            <p className="font-medium">Licenciatura em Psicologia</p>
                            <p className="text-sm text-muted-foreground">Universidade do Porto - 2012</p>
                        </div>
                    </div>
                </div>

                <Separator />

                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <Briefcase className="h-5 w-5 text-muted-foreground" />
                        <h3 className="font-semibold">Experiência Profissional</h3>
                    </div>
                    <div className="space-y-2 pl-7">
                        <div>
                            <p className="font-medium">Formador Sénior - DGE</p>
                            <p className="text-sm text-muted-foreground">2018 - Presente</p>
                        </div>
                        <div>
                            <p className="font-medium">Consultor de Formação</p>
                            <p className="text-sm text-muted-foreground">2015 - 2018</p>
                        </div>
                    </div>
                </div>

                <Separator />

                <div>
                    <h3 className="font-semibold mb-3">Áreas de Especialização</h3>
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">Gestão de Equipas</Badge>
                        <Badge variant="outline">Liderança</Badge>
                        <Badge variant="outline">Comunicação</Badge>
                        <Badge variant="outline">Desenvolvimento Pessoal</Badge>
                        <Badge variant="outline">Recursos Humanos</Badge>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}