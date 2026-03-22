'use client';
import {motion} from 'framer-motion';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/atoms/card';
import {Label} from '@/components/atoms/label';
import {Input} from '@/components/atoms/input';
import {GraduationCap, Trash2, X} from 'lucide-react';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from '@/components/atoms/select';
import {useCallback, useContext, useEffect, useState} from "react";
import {Button} from "@/components/atoms/button";
import {getByIdNacionalidade, IPais} from "@/services/equivalencia/dominios";
import {EquivalenciaCreateContext} from "@/components/templates/equivalencia/pedido/context/EquivalenciaContext";

export function EquivalenciaExperiencia({disabled = false}) {
    const isLocked = disabled;
    const lockClass = "cursor-not-allowed bg-gray-100 opacity-70";

    const value_context = useContext(EquivalenciaCreateContext);
    const {formData, setFormData, indicesPedidos, insOptions, nacionalidade, pedido_feito} = value_context || {};

    const [paisSelect, setPaisSelect] = useState<Record<number, IPais>>({});
    const [outroInstituicao, setOutroInstituicao] = useState<Record<number, boolean>>({});
    const [isInitialized, setIsInitialized] = useState(false);
    const [anoFimLocal, setAnoFimLocal] = useState<Record<number, string>>({});

    useEffect(() => {
        if (!setFormData || !pedido_feito || !indicesPedidos || isInitialized) return;

        indicesPedidos.forEach((index) => {
            const pedidoIndex = pedido_feito.pedidos?.[index];

            if (pedidoIndex) {
                // Preenche campos principais
                setFormData((prev) => ({
                    ...prev,
                    [`pedidos[${index}].formacaoProf`]: pedidoIndex.formacaoProf || "",
                    [`pedidos[${index}].carga`]: pedidoIndex.carga?.toString() || "",
                    [`pedidos[${index}].numDeclaracao`]: "",
                    [`pedidos[${index}].anoInicio`]: pedidoIndex.anoInicio?.toString() || "",
                    [`pedidos[${index}].anoFim`]: pedidoIndex.anoFim?.toString() || "",
                    [`pedidos[${index}].instEnsino.nome`]: pedidoIndex.instituicaoEnsinoNome || "",
                    [`pedidos[${index}].instEnsino.id`]: pedidoIndex.instituicaoEnsino?.toString() || "",
                    [`pedidos[${index}].documentos[0].idTpDoc`]: pedidoIndex.documentos?.[0]?.idTpDoc || "",
                    [`pedidos[${index}].documentos[0].nome`]: pedidoIndex.documentos?.[0]?.fileName || "",
                }));

                // Determina o país da instituição
                let paisCodigo = pedidoIndex.paisInstituicao || "";
                let paisNome = pedidoIndex.paisNome || "";

                // Se tiver nacionalidade, busca descrição
                if (nacionalidade) {
                    const paisInfo = nacionalidade.flat().find((p) => p?.VALOR === pedidoIndex.paisInstituicao);
                    if (paisInfo) {
                        paisCodigo = paisInfo.VALOR;
                        paisNome = paisInfo.DESCRICAO;
                    }
                }

                setFormData((prev) => ({
                    ...prev,
                    [`pedidos[${index}].instEnsino.pais`]: paisCodigo,
                }));

                setPaisSelect((prev) => ({
                    ...prev,
                    [index]: {id: pedidoIndex.instituicaoEnsino || 0, pais: paisNome, codigo: paisCodigo}
                }));

                // Verifica se a instituição está no insOptions
                if (insOptions && pedidoIndex.instituicaoEnsino) {
                    const foundInst = insOptions.find(inst => inst.descricao === pedidoIndex.instituicaoEnsinoNome);
                    if (!foundInst) {
                        setOutroInstituicao((prev) => ({...prev, [index]: true}));
                    }
                }
            }
        });

        setIsInitialized(true);
    }, [pedido_feito, indicesPedidos, setFormData, insOptions, nacionalidade, isInitialized]);

    const updateField = useCallback((field: string, value: string) => {
        if (!setFormData) return null;
        setFormData((prev) => ({...prev, [field]: value}));
    }, [setFormData]);

    /*const addExperiencia = () => {
        const novoIndex = indicesPedidos?.length ? Math.max(...indicesPedidos) + 1 : 0;

        if (setFormData){
            setFormData((prev) => ({
                ...prev,
                [`pedidos[${novoIndex}].formacaoProf`]: "",
                [`pedidos[${novoIndex}].carga`]: "",
                [`pedidos[${novoIndex}].numDeclaracao`]: "",
                [`pedidos[${novoIndex}].anoInicio`]: "",
                [`pedidos[${novoIndex}].anoFim`]: "",
                [`pedidos[${novoIndex}].instEnsino.nome`]: "",
                [`pedidos[${novoIndex}].instEnsino.id`]: "",
                [`pedidos[${novoIndex}].instEnsino.pais`]: "",
                [`pedidos[${novoIndex}].documentos[0].idTpDoc`]: "",
                [`pedidos[${novoIndex}].documentos[0].nome`]: "",
                [`pedidos[${novoIndex}].documentos[0].file`]: ""
            }));
        }
    };*/

    const handleSelectInstituicaoChange = async (index: number, value: string) => {
        updateField(`pedidos[${index}].instEnsino.id`, value);

        try {
            const pais = await getByIdNacionalidade({id: Number(value)});
            setPaisSelect((prev) => ({
                ...prev,
                [index]: {id: Number(value), pais: pais.pais, codigo: pais.codigo},
            }));
            updateField(`pedidos[${index}].instEnsino.pais`, pais.codigo);
        } catch (error) {
            console.error("Erro ao buscar país:", error);
        }
    };

    const handleOutroInstituicao = (index: number) => {
        setOutroInstituicao((prev) => ({...prev, [index]: true}));

        setPaisSelect((prev) => {
            const clone = {...prev};
            delete clone[index];
            return clone;
        });

        // limpar campos
        updateField(`pedidos[${index}].instEnsino.id`, "");
        updateField(`pedidos[${index}].instEnsino.pais`, "");
        updateField(`pedidos[${index}].instEnsino.nome`, "");
    };

    const handleSelectInstituicao = (index: number) => {
        setOutroInstituicao((prev) => ({...prev, [index]: false}));
    };

    const removeExperiencia = (index: number) => {
        if (!setFormData) return null;
        setFormData((prev) => {
            const novoForm = {...prev};
            Object.keys(novoForm).forEach((key) => {
                if (key.startsWith(`pedidos[${index}]`)) {
                    delete novoForm[key];
                }
            });
            return novoForm;
        });
        setOutroInstituicao((prev) => {
            const novo = {...prev};
            delete novo[index];
            return novo;
        });
        setPaisSelect((prev) => {
            const novo = {...prev};
            delete novo[index];
            return novo;
        });
    };

    const listaNacionalidades = nacionalidade?.flat();

    return (
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5, delay: 0.3}}
        >
            <Card className='dark:bg-[#1d293d]'>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <GraduationCap className="w-6 h-6 text-blue-500"/>
                            Dados Académicos
                        </CardTitle>
                        {/* <Button variant="outline" className="border-2" onClick={addExperiencia}>
                            <Plus className="w-4 h-4 mr-2" />
                            Adicionar
                        </Button>*/}
                    </div>
                </CardHeader>

                <CardContent className="space-y-10">
                    {indicesPedidos && indicesPedidos.map((index) => (
                        <div key={index} className="space-y-6 border rounded-xl p-4 shadow-sm">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold">{`${index + 1}ª -`} Experiência</h3>
                                {indicesPedidos.length > 1 && (
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => removeExperiencia(index)}
                                    >
                                        <Trash2 className="w-4 h-4 mr-1"/>
                                        Remover
                                    </Button>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* --- Formação --- */}
                                <div>
                                    <Label>Formação Profissional *</Label>
                                    <Input
                                        required
                                        value={formData?.[`pedidos[${index}].formacaoProf`] as string || ""}
                                        disabled={isLocked}
                                        onChange={(e) => updateField(`pedidos[${index}].formacaoProf`, e.target.value.slice(0, 100))}
                                        className={`${isLocked ? lockClass : ""} h-10 border-2`}
                                        placeholder="Formação Profissional"
                                    />
                                </div>

                                {/* --- Carga Horária --- */}
                                <div>
                                    <Label>Carga Horária *</Label>
                                    <Input
                                        required
                                        value={formData?.[`pedidos[${index}].carga`] as string || ""}
                                        onChange={(e) => {
                                            let value = e.target.value.replace(/\D/g, '').slice(0, 4);
                                            if (Number(value) > 5000) value = '5000';
                                            updateField(`pedidos[${index}].carga`, value);
                                        }}
                                        className={`${isLocked ? lockClass : ""} h-10 border-2`}
                                        placeholder="Carga Horária"
                                        disabled={isLocked}
                                        inputMode="numeric"
                                    />

                                    {formData?.[`pedidos[${index}].carga`] && (
                                        Number(formData?.[`pedidos[${index}].carga`]) < 10 ? (
                                            <p className="text-sm text-red-600 mt-1 italic">
                                                A carga horária deve ser entre 10 e 5000 horas.
                                            </p>
                                        ) : (
                                            <p className="text-sm text-gray-500 mt-1 italic">
                                                {formData?.[`pedidos[${index}].carga`] as string} horas
                                            </p>
                                        )
                                    )}
                                </div>

                                {/* --- Instituição --- */}
                                <div>
                                    <Label>Instituição de Ensino *</Label>
                                    {outroInstituicao[index] ? (
                                        <div className="relative flex items-center">
                                            <Input
                                                required
                                                value={formData?.[`pedidos[${index}].instEnsino.nome`] as string || ""}
                                                onChange={(e) => updateField(`pedidos[${index}].instEnsino.nome`, e.target.value)}
                                                className={`${isLocked ? lockClass : ""} h-10 border-2`}
                                                placeholder="Instituição de Ensino"
                                                disabled={isLocked}
                                            />
                                            <Button
                                                onClick={() => {
                                                    updateField(`pedidos[${index}].instEnsino.nome`, "");
                                                    updateField(`pedidos[${index}].instEnsino.id`, "");
                                                    updateField(`pedidos[${index}].instEnsino.pais`, "");
                                                    handleSelectInstituicao(index);
                                                }}
                                                className="absolute right-2 text-gray-500 hover:text-red-500 bg-transparent"
                                            >
                                                <X className="w-4 h-4"/>
                                            </Button>
                                        </div>
                                    ) : (
                                        <Select
                                            value={formData?.[`pedidos[${index}].instEnsino.id`] as string || ""}
                                            onValueChange={(value) => handleSelectInstituicaoChange(index, value)}
                                            disabled={isLocked}
                                        >
                                            <SelectTrigger
                                                className={`${isLocked ? lockClass : ""} h-10 border-2`}
                                            >
                                                <SelectValue placeholder="Selecione a Instituição"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {insOptions?.map((inst, i) => (
                                                    <SelectItem key={i} value={inst.valor.toString()}>
                                                        {inst.descricao}
                                                    </SelectItem>
                                                ))}
                                                <Button
                                                    type="button"
                                                    className="bg-transparent text-black cursor-pointer"
                                                    onClick={() => handleOutroInstituicao(index)}
                                                >
                                                    + Outra (digitar)
                                                </Button>
                                            </SelectContent>
                                        </Select>
                                    )}
                                </div>

                                {/* --- País --- */}
                                <div>
                                    <Label>País de Obtenção *</Label>
                                    <Select
                                        value={formData?.[`pedidos[${index}].instEnsino.pais`] as string || ""}
                                        onValueChange={(value) => updateField(`pedidos[${index}].instEnsino.pais`, value)}
                                        disabled={isLocked}
                                    >
                                        <SelectTrigger
                                            className={`${isLocked ? lockClass : ""} h-10 border-2`}
                                        >
                                            <SelectValue placeholder="Selecione o país"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {paisSelect[index] ? (
                                                <SelectItem value={paisSelect[index].codigo}>
                                                    {paisSelect[index].pais}
                                                </SelectItem>
                                            ) : (
                                                listaNacionalidades?.map((pais, i) => (
                                                    <SelectItem key={i} value={pais?.VALOR || ''}>
                                                        {pais?.DESCRICAO}
                                                    </SelectItem>
                                                ))
                                            )}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* --- Ano de Início --- */}
                                <div>
                                    <Label>Ano de Início *</Label>
                                    <Input
                                        required
                                        value={formData?.[`pedidos[${index}].anoInicio`] as string || ""}
                                        onChange={(e) => updateField(`pedidos[${index}].anoInicio`, e.target.value.replace(/\D/g, '').slice(0, 4))}
                                        className={`${isLocked ? lockClass : ""} h-10 border-2`}
                                        placeholder="Ano de início"
                                        disabled={isLocked}
                                        inputMode="numeric"
                                    />
                                    {formData?.[`pedidos[${index}].anoInicio`] && Number(formData?.[`pedidos[${index}].anoInicio`]) > new Date().getFullYear() && (
                                        <p className="text-sm text-red-600 mt-1 italic">
                                            O ano de início não pode ser no futuro.
                                        </p>
                                    )}
                                </div>

                                {/* --- Ano de Conclusão --- */}
                                <div>
                                    <Label>Ano de Conclusão *</Label>
                                    <Input
                                        required
                                        value={anoFimLocal[index] ?? formData?.[`pedidos[${index}].anoFim`] ?? ""}
                                        onChange={(e) => {
                                            const valor = e.target.value.replace(/\D/g, '').slice(0, 4);
                                            setAnoFimLocal(prev => ({...prev, [index]: valor}));

                                            if (Number(valor) <= new Date().getFullYear()) {
                                                updateField(`pedidos[${index}].anoFim`, valor);
                                            } else {
                                                updateField(`pedidos[${index}].anoFim`, "");
                                            }
                                        }}
                                        className={`${isLocked ? lockClass : ""} h-10 border-2`}
                                        placeholder="Ano de conclusão"
                                        inputMode="numeric"
                                        disabled={isLocked}
                                    />

                                    {anoFimLocal[index] && (
                                        Number(anoFimLocal[index]) < Number(formData?.[`pedidos[${index}].anoInicio`] || 0) ? (
                                            <p className="text-sm text-red-600 mt-1 italic">
                                                O ano de conclusão deve ser igual ou superior ao ano de início.
                                            </p>
                                        ) : Number(anoFimLocal[index]) > new Date().getFullYear() ? (
                                            <p className="text-sm text-red-600 mt-1 italic">
                                                Lamentamos, mas não é possível solicitar a equivalência enquanto o curso
                                                não estiver concluído.
                                            </p>
                                        ) : null
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </motion.div>
    );
}
