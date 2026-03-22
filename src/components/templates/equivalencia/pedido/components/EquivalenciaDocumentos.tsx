'use client';
import React, {useContext, useRef} from 'react';
import {motion} from 'framer-motion';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/atoms/card';
import {Badge} from '@/components/atoms/badge';
import {Button} from '@/components/atoms/button';
import {AlertCircle, CheckCircle, CircleEllipsis, Upload} from 'lucide-react';
import {Input} from '@/components/atoms/input';
import {toast} from "sonner";
import {EquivalenciaCreateContext} from "@/components/templates/equivalencia/pedido/context/EquivalenciaContext";

export function EquivalenciaDocumentos({disabled = false}) {
    const isLocked = disabled;
    const lockClass = "cursor-not-allowed bg-gray-100 opacity-70";

    const value_context = useContext(EquivalenciaCreateContext);
    const {formData, setFormData, documentos, indicesPedidos} = value_context || {};

    const inputFileRef = useRef<HTMLInputElement | null>(null);
    const documentoSelecionadoRef = useRef<{ pedidoIndex: number, docId: number } | null>(null);

    /*const indicesPedidos = Array.from(
        new Set(
            Object.keys(formData || {})
                .map((key) => {
                    const match = key.match(/pedidos\[(\d+)\]/);
                    return match ? parseInt(match[1], 10) : null;
                })
                .filter((v): v is number => v !== null)
        )
    ).sort((a, b) => a - b);*/

    const handleAnexarClick = (pedidoIndex: number, docId: number) => {
        documentoSelecionadoRef.current = {pedidoIndex, docId};
        inputFileRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        const ref = documentoSelecionadoRef.current;

        //if (!file || !ref) return;
        if (!file || !ref) {
            event.target.value = ''; // garante que input será resetado
            return;
        }

        const {pedidoIndex, docId} = ref;

        const tamanhoMaximo = 10 * 1024 * 1024;

        if (file.size > tamanhoMaximo) {
            toast.error('O ficheiro não pode ter mais de 10MB.');
            event.target.value = '';
            return;
        }

        const documento = documentos?.find((d) => d.valor === docId);
        if (!documento) return;

        const index = documentos?.findIndex((d) => d.valor === docId);
        if (setFormData) {
            setFormData((prev) => ({
                ...prev,
                [`pedidos[${pedidoIndex}].documentos[${index}].idTpDoc`]: String(docId),
                [`pedidos[${pedidoIndex}].documentos[${index}].nome`]: documento.descricao,
                [`pedidos[${pedidoIndex}].documentos[${index}].file`]: file
            }));
        }

        event.target.value = '';
    };

    const isAnexado = (pedidoIndex: number, id: number) => {
        if (!formData) return false;
        const index = documentos?.findIndex((d) => d.valor === id);
        return !!formData[`pedidos[${pedidoIndex}].documentos[${index}].file`];
    };

    return (
        <>
            <Input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                style={{display: 'none'}}
                ref={inputFileRef}
                onChange={handleFileChange}
            />

            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5, delay: 0.4}}
            >
                {indicesPedidos?.map((pedidoIndex) => (
                    <Card key={pedidoIndex} className="mt-6 dark:bg-[#1d293d]">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Upload className="w-5 h-5"/>
                                Documentos do Pedido {pedidoIndex + 1}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {documentos?.map((documento) => {
                                const anexado = isAnexado(pedidoIndex, documento.valor);
                                const index = documentos.findIndex((d) => d.valor === documento.valor);
                                const file = formData?.[`pedidos[${pedidoIndex}].documentos[${index}].file`] as File | undefined;

                                return (
                                    <div
                                        key={documento.valor}
                                        className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border-2 transition dark:bg-[#1d293d] dark:border-white/15 ${
                                            anexado ? 'bg-green-50 border-green-200' : documento.obrigatorio ? 'bg-blue-50 border-blue-200' : 'bg-muted/20 border-muted/30'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            {anexado
                                                ? <CheckCircle className="w-5 h-5 text-green-600"/>
                                                : documento.obrigatorio
                                                    ? <AlertCircle className="w-5 h-5 text-red-600/80"/>
                                                    : <CircleEllipsis className="w-5 h-5 text-blue-600"/>
                                            }

                                            <div>
                                                <p className="font-medium">{documento.descricao}</p>

                                                {file && (
                                                    <p className="text-xs text-muted-foreground mt-1 italic">{file.name}</p>
                                                )}
                                                {!anexado && documento.obrigatorio && (
                                                    <p className="flex gap-2 items-center text-xs text-red-600/80 mt-1 font-medium">
                                                        {/*<TriangleAlert className='w-4 h-4'/>*/}
                                                        É obrigatório anexar este documento.
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 mt-2 sm:mt-0">
                                            {anexado && (
                                                <Badge
                                                    className="bg-green-500/10 text-green-700 dark:text-green-300 border-2 border-green-500/20">
                                                    Anexado
                                                </Badge>
                                            )}
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className={`${isLocked ? lockClass : ""} border-2 dark:bg-gray-800 dark:text-gray-100`}
                                                onClick={isLocked ? () => {
                                                } : () => handleAnexarClick(pedidoIndex, documento.valor)}
                                            >
                                                <Upload className="w-4 h-4 mr-2"/>
                                                {anexado ? 'Substituir' : 'Anexar'}
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })}

                        </CardContent>
                    </Card>
                ))}
            </motion.div>
        </>
    );
}
