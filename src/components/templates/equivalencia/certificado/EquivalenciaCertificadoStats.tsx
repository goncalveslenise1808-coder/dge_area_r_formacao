'use client';
import { Card, CardContent } from '@/components/atoms/card';
import { Award, FileText, Building2 } from 'lucide-react';

export function EquivalenciaCertificadoStats({ certificados }: { certificados: any[] }) {
    const paises = Array.from(new Set(certificados.map(c => c.paisOriginal)));
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-muted-foreground text-sm font-medium">Certificados</p>
                            <p className="text-3xl font-bold text-green-600">{certificados.length}</p>
                            <p className="text-muted-foreground text-sm">Emitidos</p>
                        </div>
                        <Award className="w-8 h-8 text-green-600" />
                    </div>
                </CardContent>
            </Card>
            <Card className="">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-muted-foreground text-sm font-medium">Formações</p>
                            <p className="text-3xl font-bold text-blue-600">{certificados.length}</p>
                            <p className="text-muted-foreground text-sm">Reconhecidas</p>
                        </div>
                        <FileText className="w-8 h-8 text-blue-600" />
                    </div>
                </CardContent>
            </Card>
            <Card className="">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-muted-foreground text-sm font-medium">Países</p>
                            <p className="text-3xl font-bold text-purple-600">{paises.length}</p>
                            <p className="text-muted-foreground text-sm">Origem</p>
                        </div>
                        <Building2 className="w-8 h-8 text-purple-600" />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
