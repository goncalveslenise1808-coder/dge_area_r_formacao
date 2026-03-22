'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/atoms/card';
import { Button } from '@/components/atoms/button';
import { Badge } from '@/components/atoms/badge';
import {
    Award, FileText, Calendar, Building2, CheckCircle, Share2, Download, ExternalLink
} from 'lucide-react';
import {IEquivalencia} from "@/services/equivalencia/certificado/type";
import {EmptyState} from "@/components/organisms/EmptyState";

export function EquivalenciaCertificadoDetails({
    certificado,
    onDownload,
    onShare,
    onValidate
}: {
    certificado: IEquivalencia,
    onDownload: (cert: any) => void,
    onShare: (cert: any) => void,
    onValidate: (url: string) => void
}) {

    return (
        <div className="lg:col-span-2">
            <Card className="">
                <CardHeader>
                    <div className="flex items-start justify-between">
                        <div>
                            {certificado.numeroProcesso && (
                                <CardTitle className="text-xl">{`EQ-${certificado.numeroProcesso}`}</CardTitle>
                            )}
                            <p className="text-muted-foreground">{certificado.equivalencia}</p>
                        </div>
                        <Badge className="bg-green-500/10 text-green-700 dark:text-green-300 border-2 border-green-500/20 font-medium">
                            Certificado Válido
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    {certificado.url ? (
                        <div className="dark:from-green-950/20 dark:to-emerald-950/20 rounded-2xl  border-2 dark:border-green-800/50">
                            <embed src={certificado.url}
                                className="w-full h-[60vh] rounded-lg border-2 border-gray-300"
                            />
                        </div>
                    ):(
                        <EmptyState
                            title="Nenhum certificado emitido"
                        />
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">
                                <strong>Processo:</strong> {`Nº ${certificado.numeroProcesso}`}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">
                                <strong>Emissão:</strong> {certificado.dataEmissao}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">
                                <strong>País Origem:</strong> {certificado.paisOrigem}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">
                                <strong>Nível:</strong> {certificado.nivelQualificacao}
                            </span>
                        </div>
                    </div>

                    {/* Observações */}
                    <div className="bg-blue-500/5 rounded-xl p-4 border-2 border-blue-500/20">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-blue-600" />
                            Observações
                        </h4>
                       {/* <p className="text-sm text-muted-foreground">
                            {certificado.observacoes}
                        </p>*/}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                            onClick={() => onDownload(certificado?.url)}
                            className="flex-1 h-12 font-semibold "
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Download PDF
                        </Button>
                        <Button
                            onClick={() => onShare(certificado)}
                            variant="outline"
                            className="flex-1 h-12 border-2 font-semibold"
                        >
                            <Share2 className="w-4 h-4 mr-2" />
                            Partilhar
                        </Button>
                        <Button
                            onClick={() => onValidate(certificado.url)}
                            variant="outline"
                            className="flex-1 h-12 border-2 font-semibold"
                        >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Validar Online
                        </Button>
                    </div>

                    {/* Validation Info */}
                    <div className="bg-green-500/5 rounded-xl p-4 border-2 border-green-500/20">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            Validação do Certificado
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">
                            Este certificado pode ser validado online através do link oficial:
                        </p>
                       {/* <code className="text-xs bg-muted p-2 rounded block break-all">
                            {certificado.validacao}
                        </code>*/}
                        <p className="text-xs text-muted-foreground mt-2">
                            Entidade Emissora: {certificado.entidadeEmissora}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
