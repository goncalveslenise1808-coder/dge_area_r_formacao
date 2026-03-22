'use client';
import { Card, CardContent } from '@/components/atoms/card';
//import { Badge } from '@/components/atoms/badge';
//import { CheckCircle } from 'lucide-react';
import {IEquivalencia} from "@/services/equivalencia/certificado/type";

export function EquivalenciaCertificadoList({
    certificados,
    selectedCertificado,
    setSelectedCertificado
}: {
    certificados: IEquivalencia[],
    selectedCertificado: any,
    setSelectedCertificado: (certificado: any) => void
}) {
    return (
        <div className="lg:col-span-1 ">
            <div className='space-y-4 sticky top-24'>
                <h3 className="text-xl font-bold">Meus Certificados</h3>
                {certificados?.map((certificado, index) => (
                    <Card
                        key={index}
                        className={`cursor-pointer transition-all duration-300 hover:shadow-xl ${selectedCertificado?.id === certificado?.id ? 'border-primary/50 bg-primary/5' : ''}`}
                        onClick={() => setSelectedCertificado(certificado)}
                    >
                        <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                    {certificado.numeroProcesso && (
                                        <p className="font-bold text-sm m b-1">{`EQ-${certificado.numeroProcesso}`}</p>
                                    )}
                                    <p className="text-xs text-muted-foreground mb-2">{certificado.formacaoOriginal}</p>
                                </div>
                                {/* <Badge className="bg-green-500/10 text-green-700 dark:text-green-300 border-2 border-green-500/20 font-medium text-xs">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Válido
                                </Badge>*/}
                            </div>
                            <div className="space-y-1 text-xs text-muted-foreground">
                                <p><strong>Tipo:</strong> {certificado.equivalencia}</p>
                                <p><strong>Nível:</strong> {certificado.nivelQualificacao}</p>
                                <p><strong>Emitido:</strong> {certificado.dataEmissao}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
