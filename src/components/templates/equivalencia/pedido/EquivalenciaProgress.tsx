'use client';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/atoms/card';
import { Badge } from '@/components/atoms/badge';

export function EquivalenciaProgress({ documentos }: { documentos: any[] }) {
    const documentosAnexados = documentos.filter(doc => doc.anexado);
    const progressoDocumentos = (documentosAnexados.length / documentos.length) * 100;

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <Card className="">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold">Progresso do Pedido</h3>
                        <Badge className="bg-blue-500/10 text-blue-700 dark:text-blue-300 border-2 border-blue-500/20">
                            {Math.round(progressoDocumentos)}% Completo
                        </Badge>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Documentos anexados</span>
                            <span>{documentosAnexados.length}/{documentos.length}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-3 border-2">
                            <div
                                className="bg-blue-600 h-full rounded-full transition-all duration-300"
                                style={{ width: `${progressoDocumentos}%` }}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
