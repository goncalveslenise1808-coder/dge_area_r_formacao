"use client"
import React, {useEffect, useMemo, useRef, useState} from "react"
import {Controller, useFieldArray, useFormContext, useWatch} from "react-hook-form"
import {Button} from "@/components/atoms/button"
import {Input} from "@/components/atoms/input"
import {Label} from "@/components/atoms/label"
import {TabsContent} from "@/components/atoms/tabs"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/atoms/select"
import {CheckCircle, FileText, Search, X} from "lucide-react"
import {IDominioItem} from "@/services/equivalencia/dominios/type";
import {IPessoaInfo} from "@/services/profiles/type";
import {Badge} from "@/components/atoms/badge";
import {Entidade} from "@/services/entidade/type";
import {getPreferencias} from "@/services/preferencias";
import {Familia, Modulo, Qualificacao, Unidade} from "@/services/preferencias/type";
import {IGetLocazacaos} from "@/services/sgf/type";
import {getConcelho, getFreguesias, getIlhas, getZona} from "@/services/sgf/geografia";
import {ManifestacaoFormData} from "@/components/templates/sgf/Manifestacao/hooks/Schema/useSchema";
import {FotoUploadCircular} from "@/components/templates/sgf/Manifestacao/components/FotoUploadCircular";

interface ModalTabsContentProps {
    docIdentification: IDominioItem[]
    tipoDocumento: IDominioItem[]
    genero: IDominioItem[]
    SIM_NAO: IDominioItem[]
    user: IPessoaInfo | undefined,
    countries: any
    grau_escolar: any
    entidade: Entidade[]
}

export function ManifestacaoTabsContent(props: ModalTabsContentProps) {
    const {docIdentification, tipoDocumento, entidade, user, genero, SIM_NAO, countries, grau_escolar} = props
    const {
        control,
        register,
        watch,
        setValue,
        reset,
        resetField,
        formState: {errors},
        trigger
    } = useFormContext<ManifestacaoFormData>()
    const {fields, append, remove} = useFieldArray({
        control,
        name: "preferencias",
    })

    /* useState */
    const [familias, setFamilias] = useState<Familia[]>([])
    const [qualificacoes, setQualificacoes] = useState<Qualificacao[]>([])
    const [modulos, setModulos] = useState<Modulo[]>([])
    const [unidades, setUnidades] = useState<Unidade[]>([])
    const [ilhasOptions, setIlhasOptions] = useState<IGetLocazacaos[]>([]);
    const [concelhosOptions, setConcelhosOptions] = useState<IGetLocazacaos[]>([]);
    const [freguesiasOptions, setFreguesiasOptions] = useState<IGetLocazacaos[]>([]);
    const [zonasOptions, setZonasOptions] = useState<IGetLocazacaos[]>([]);
    const [loadingConcelho, setLoadingConcelho] = useState(false);
    const [loadingFreguesia, setLoadingFreguesia] = useState(false);
    const [loadingZona, setLoadingZona] = useState(false);
    const [novaPreferencia, setNovaPreferencia] = useState({
        familiaProfissional: "",
        qualificacao: "",
        modulo: "",
        unidadeFormativa: "",
    })

    const [tipoDocumentoAnexoSelected, setTipoDocumentoAnexoSelected] = useState("")
    const [entidadePesquisa, setEntidadePesquisa] = useState("")
    const [showEntidadeList, setShowEntidadeList] = useState(false)

    /* useRef */
    const fileInputRef = useRef<HTMLInputElement>(null)
    const isInitialLoad = useRef(true)

    /* useWatch */
    const selectedIlha = useWatch({control, name: "ilha"})
    const selectedConcelho = useWatch({control, name: "concelho"})
    const selectedFreguesia = useWatch({control, name: "freguesia"})
    const entidadeId = useWatch({control, name: "entidadeId"})
    const entidadeNome = useWatch({control, name: "entidadeNome"})
    const anexos = watch("anexos") ?? []

    /* useMemo */
    const entidadesFiltradas = useMemo(() => {
        const termo = entidadeNome || entidadePesquisa

        if (!termo) return entidade

        return entidade?.filter(e =>
            e.nome.toLowerCase().includes(termo.toLowerCase())
        )
    }, [entidade, entidadeNome, entidadePesquisa])

    /* useEffect */
    useEffect(() => {
        if (!user) return

        reset({
            email: user?.email || "",
            telemovel: user?.telefone || "",
            ilha: user.ilha_id || "",
            concelho: user.concelho_id || "",
            freguesia: user.freguesia_id || "",
            zona: user.localidade_id || ""
        })

    }, [user])

    /* Preferencia */
    useEffect(() => {
        if (!entidadeId) return;

        async function fetchFamilias() {
            const res = await getPreferencias({
                entidadeId: String(entidadeId || ""),
                familiaId: "",
                qualificacaoId: "",
                moduloId: "",
                moduloOrigem: ""
            });

            setFamilias(res.familias);
            setQualificacoes([]);
            setModulos([]);
            setUnidades([]);
        }

        fetchFamilias();

    }, [entidadeId]);

    useEffect(() => {
        if (!novaPreferencia.familiaProfissional) return;

        async function fetchQualificacoes() {
            const res = await getPreferencias({
                entidadeId: String(watch("entidadeId")),
                familiaId: novaPreferencia.familiaProfissional,
                qualificacaoId: "",
                moduloId: "",
                moduloOrigem: ""
            });

            setQualificacoes(res.qualificacoes);
            setModulos([]);
            setUnidades([]);
        }

        fetchQualificacoes();

    }, [novaPreferencia.familiaProfissional]);

    useEffect(() => {
        if (!novaPreferencia.qualificacao) return;

        async function fetchModulos() {
            const res = await getPreferencias({
                entidadeId: String(watch("entidadeId")),
                familiaId: novaPreferencia.familiaProfissional,
                qualificacaoId: novaPreferencia.qualificacao,
                moduloId: "",
                moduloOrigem: ""
            });

            setModulos(res.modulos);
            setUnidades([]);
        }

        fetchModulos();

    }, [novaPreferencia.qualificacao]);

    useEffect(() => {
        if (!novaPreferencia.modulo) return;

        const moduloSelecionado = modulos.find(
            (m) => String(m.id) === novaPreferencia.modulo
        );

        if (!moduloSelecionado) return;

        async function fetchUnidades() {
            const res = await getPreferencias({
                entidadeId: String(watch("entidadeId")),
                familiaId: novaPreferencia.familiaProfissional,
                qualificacaoId: novaPreferencia.qualificacao,
                moduloId: String(moduloSelecionado?.id),
                moduloOrigem: moduloSelecionado?.origem
            });

            setUnidades(res.unidades);
        }

        fetchUnidades();

    }, [novaPreferencia.modulo]);

    /* Geografia */
    useEffect(() => {
        getIlhas().then(setIlhasOptions);
        resetField("ilha");
    }, []);

    useEffect(() => {
        if (!selectedIlha) return;

        // limpa concelho antigo
        setValue("concelho", "")
        setValue("freguesia", "")
        setValue("zona", "")

        setLoadingConcelho(true);

        getConcelho(selectedIlha).then((data) => {

            setConcelhosOptions(data)

            if (isInitialLoad.current && user?.concelho_id) {
                setValue("concelho", user.concelho_id)
            }
        })

    }, [selectedIlha]);

    useEffect(() => {
        if (!selectedConcelho) return;
        setLoadingFreguesia(true);
        getFreguesias(selectedConcelho).then((data) => {

            setFreguesiasOptions(data)

            if (isInitialLoad.current && user?.freguesia_id) {
                setValue("freguesia", user.freguesia_id)
            }
        })
    }, [selectedConcelho]);

    useEffect(() => {
        if (!selectedFreguesia) return;
        setLoadingZona(true);
        getZona(selectedFreguesia).then((data) => {
            setZonasOptions(data);

            if (isInitialLoad.current && user?.localidade_id) {
                setValue("zona", user.localidade_id)
                isInitialLoad.current = false
            }
        });
    }, [selectedFreguesia]);

    /* JSX */
    return (
        <>
            {/* Tab 1 - Dados Pessoais */}
            <TabsContent value="DADOS_PESSOAIS" className="space-y-4 sm:space-y-6 mt-4">
                <h3 className="text-base sm:text-lg font-medium">Dados Pessoais</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <FotoUploadCircular user={user}/>
                    <div className="space-y-2">
                        <Label className='flex gap-1 text-sm'>
                            Tipo de Documento
                            <span className='text-red-500'>*</span>
                        </Label>
                        {
                            user?.tipo_documento ? (
                                <div
                                    className="flex items-center gap-2 p-2 sm:p-3 bg-muted rounded-md dark:bg-[#081325]">
                                    <CheckCircle className="h-4 w-4 text-green-500 shrink-0"/>
                                    <Input
                                        className={`${user?.tipo_documento ? "border-0 bg-transparent w-auto h-auto" : ""}`} {...register("tipoDocumento")}
                                        disabled={!!watch('tipoDocumento')}/>
                                    <Badge variant="outline" className="ml-auto text-xs shrink-0">
                                        Validado
                                    </Badge>
                                </div>
                            ) : (
                                <Controller
                                    name="tipoDocumento"
                                    control={control}
                                    render={({field}) => (
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione"/>
                                            </SelectTrigger>
                                            <SelectContent className='dark:bg-[#081325]'>
                                                {docIdentification.map((tipo, idx: number) => (
                                                    <SelectItem key={idx} value={tipo.value}>
                                                        {tipo.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            )
                        }
                        {errors.tipoDocumento &&
                            <p className="text-sm text-red-500">{String(errors.tipoDocumento.message)}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label className='flex gap-1'>
                            Número de Documento
                            <span className='text-red-500'>*</span>
                        </Label>
                        <div className="flex items-center gap-2 p-2 bg-muted rounded-md dark:bg-[#081325]">
                            <CheckCircle className="h-4 w-4 text-green-500"/>
                            <Input
                                className={`${user?.tipo_documento ? "border-0 bg-transparent w-auto h-auto" : ""}`}
                                {...register("numDocumento")}
                                disabled={!!watch('numDocumento')}
                            />
                            <Badge variant="outline" className="ml-auto text-xs">
                                Validado
                            </Badge>
                        </div>
                        {errors.numDocumento &&
                            <p className="text-sm text-red-500">{String(errors.numDocumento.message)}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label className='flex gap-1'>
                            Data de Emissão
                            <span className='text-red-500'>*</span>
                        </Label>
                        <div className="flex items-center gap-2 p-2 bg-muted rounded-md dark:bg-[#081325]">
                            <CheckCircle className="h-4 w-4 text-green-500"/>
                            <Input
                                type="date"
                                className={`${user?.tipo_documento ? "border-0 bg-transparent w-auto h-auto" : ""}`}
                                {...register("dataEmissao")}
                                disabled={!!watch('dataEmissao')}
                            />
                            <Badge variant="outline" className="ml-auto text-xs">
                                Validado
                            </Badge>
                        </div>
                        {errors.dataEmissao &&
                            <p className="text-sm text-red-500">{String(errors.dataEmissao.message)}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label className='flex gap-1'>
                            Data de Validade
                            <span className='text-red-500'>*</span>
                        </Label>
                        <div className="flex items-center gap-2 p-2 bg-muted rounded-md dark:bg-[#081325]">
                            <CheckCircle className="h-4 w-4 text-green-500"/>
                            <Input
                                type={'date'}
                                className={`${user?.tipo_documento ? "border-0 bg-transparent w-auto h-auto" : ""}`}
                                {...register("dataValidade")}
                                disabled={!!watch('dataValidade')}
                            />
                            <Badge variant="outline" className="ml-auto text-xs">
                                Validado
                            </Badge>
                        </div>
                        {errors.dataValidade &&
                            <p className="text-sm text-red-500">{String(errors.dataValidade.message)}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label className='flex gap-1'>
                            NIF
                            <span className='text-red-500'>*</span>
                        </Label>
                        <div className="flex items-center gap-2 p-2 bg-muted rounded-md dark:bg-[#081325]">
                            <CheckCircle className="h-4 w-4 text-green-500"/>
                            <Input
                                className={`${user?.tipo_documento ? "border-0 bg-transparent w-auto h-auto" : ""}`}
                                {...register("nif")}
                                disabled={!!watch('nif')}
                            />
                            <Badge variant="outline" className="ml-auto text-xs">
                                Validado
                            </Badge>
                        </div>
                        {errors.nif && <p className="text-sm text-red-500">{String(errors.nif.message)}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label className='flex gap-1'>
                            Nome Completo
                            <span className='text-red-500'>*</span>
                        </Label>
                        <div className="flex items-center gap-2 p-2 bg-muted rounded-md dark:bg-[#081325]">
                            <CheckCircle className="h-4 w-4 text-green-500"/>
                            <Input
                                className={`${user?.tipo_documento ? "border-0 bg-transparent w-full h-auto" : ""}`}
                                {...register("nomeCompleto")}
                                disabled={!!watch('nomeCompleto')}
                            />
                            <Badge variant="outline" className="ml-auto text-xs">
                                Validado
                            </Badge>
                        </div>
                        {errors.nomeCompleto &&
                            <p className="text-sm text-red-500">{String(errors.nomeCompleto.message)}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label className='flex gap-1'>
                            Data de Nascimento
                            <span className='text-red-500'>*</span>
                        </Label>
                        <div className="flex items-center gap-2 p-2 bg-muted rounded-md dark:bg-[#081325]">
                            <CheckCircle className="h-4 w-4 text-green-500"/>
                            <Input
                                className={`${user?.tipo_documento ? "border-0 bg-transparent w-auto h-auto" : ""}`}
                                {...register("dataNascimento")}
                                disabled={!!watch('dataNascimento')}
                            />
                            <Badge variant="outline" className="ml-auto text-xs">
                                Validado
                            </Badge>
                        </div>
                        {errors.dataNascimento &&
                            <p className="text-sm text-red-500">{String(errors.dataNascimento.message)}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label className='flex gap-1'>
                            Nome da Mãe
                            <span className='text-red-500'>*</span>
                        </Label>
                        <div className="flex items-center gap-2 p-2 bg-muted rounded-md dark:bg-[#081325]">
                            <CheckCircle className="h-4 w-4 text-green-500"/>
                            <Input
                                className={`${user?.tipo_documento ? "border-0 bg-transparent w-full h-auto" : ""}`}
                                {...register("nomeMae")}
                                disabled={!!watch('nomeMae')}
                            />
                            <Badge variant="outline" className="ml-auto text-xs">
                                Validado
                            </Badge>
                        </div>
                        {errors.nomeMae && <p className="text-sm text-red-500">{String(errors.nomeMae.message)}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label className='flex gap-1'>
                            Nome do Pai
                            <span className='text-red-500'>*</span>
                        </Label>
                        <div className="flex items-center gap-2 p-2 bg-muted rounded-md dark:bg-[#081325]">
                            <CheckCircle className="h-4 w-4 text-green-500"/>
                            <Input
                                className={`${user?.tipo_documento ? "border-0 bg-transparent w-full h-auto" : ""}`}
                                {...register("nomePai")}
                                disabled={!!watch('nomePai')}
                            />
                            <Badge variant="outline" className="ml-auto text-xs">
                                Validado
                            </Badge>
                        </div>
                        {errors.nomePai && <p className="text-sm text-red-500">{String(errors.nomePai.message)}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label className='flex gap-1'>
                            Sexo
                            <span className='text-red-500'>*</span>
                        </Label>
                        {user?.sexo ? (
                            <div className="flex items-center gap-2 p-2 bg-muted rounded-md dark:bg-[#081325]">
                                <CheckCircle className="h-4 w-4 text-green-500"/>

                                <Input
                                    value={user?.sexo_desc}
                                    disabled={!!watch('sexo')}
                                    className="border-0 bg-transparent w-auto h-auto"
                                />

                                <input type="hidden" {...register("sexo")} value={user?.sexo}/>

                                <Badge variant="outline" className="ml-auto text-xs">
                                    Validado
                                </Badge>
                            </div>
                        ) : (
                            <Controller
                                name="sexo"
                                control={control}
                                render={({field}) => (
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione"/>
                                        </SelectTrigger>
                                        <SelectContent className="dark:bg-[#081325]">
                                            {genero.map((sexo, idx: number) => (
                                                <SelectItem key={idx} value={sexo.value || ""}>
                                                    {sexo.label || ""}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        )}
                        {errors.sexo && <p className="text-sm text-red-500">{String(errors.sexo.message)}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label className="flex gap-1">
                            Nacionalidade
                            <span className="text-red-500">*</span>
                        </Label>

                        <div className="flex items-center gap-2 p-2 bg-muted rounded-md dark:bg-[#081325]">
                            <CheckCircle className="h-4 w-4 text-green-500"/>

                            {/* Mostrar descrição */}
                            <Input
                                value={user?.nacionalidade || ""}
                                disabled={!!watch('nacionalidade')}
                                className="border-0 bg-transparent w-auto h-auto"
                            />

                            {/* Guardar ID para o formulário */}
                            <input
                                type="hidden"
                                {...register("nacionalidade")}
                                value={user?.nacionalidade_id || ""}
                            />

                            <Badge variant="outline" className="ml-auto text-xs">
                                Validado
                            </Badge>
                        </div>

                        {errors.nacionalidade && (
                            <p className="text-sm text-red-500">
                                {String(errors.nacionalidade.message)}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label className='flex gap-1'>
                            País de Origem
                            <span className='text-red-500'>*</span>
                        </Label>
                        {user?.pais ? (
                            <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                                <CheckCircle className="h-4 w-4 text-green-500"/>
                                <Input
                                    className={`${user?.pais ? "border-0 bg-transparent w-auto h-auto" : ""}`}
                                    {...register("paisOrigem")}
                                    disabled={!!watch('paisOrigem')}
                                />
                                <Badge variant="outline" className="ml-auto text-xs">
                                    Validado
                                </Badge>
                            </div>
                        ) : (
                            <Controller
                                name="paisOrigem"
                                control={control}
                                render={({field}) => (
                                    <Select value={field.value ?? ""} onValueChange={field.onChange}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {countries.map((pais: any, idx: number) => (
                                                <SelectItem key={idx} value={pais.VALOR}>
                                                    {pais.DESCRICAO}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        )}
                        {errors.paisOrigem && (
                            <p className="text-sm text-red-500">{String(errors.paisOrigem.message)}</p>
                        )}
                    </div>
                </div>
            </TabsContent>

            {/* Tab 2 - Dados Academicos */}
            <TabsContent value="DADOS_ACADEMICO" className="space-y-4 mt-4">

                <h3 className="text-lg font-medium mb-4">Habilitação Acadêmica</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* Habilitação Literária */}
                    <div className="space-y-2">

                        <Label className="flex gap-1">
                            Habilitação Literaria
                            <span className="text-red-500">*</span>
                        </Label>

                        <Controller
                            name="habilitacao"
                            control={control}
                            defaultValue=""
                            render={({field}) => (

                                <>

                                    <Select
                                        value={field.value}
                                        onValueChange={(val) => {
                                            field.onChange(val)
                                            trigger("habilitacao")
                                        }}
                                    >

                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Selecione"/>
                                        </SelectTrigger>

                                        <SelectContent>

                                            {grau_escolar?.map((grau: any, idx: number) => (
                                                <SelectItem key={idx} value={grau.value}>
                                                    {grau.label}
                                                </SelectItem>
                                            ))}

                                        </SelectContent>

                                    </Select>

                                    {errors.habilitacao && (
                                        <p className="text-sm text-red-500">
                                            {errors.habilitacao.message}
                                        </p>
                                    )}

                                </>

                            )}
                        />

                    </div>

                    {/* Área de Formação */}
                    <div className="space-y-2">

                        <Label className="flex gap-1">
                            Área de Formação
                            <span className="text-red-500">*</span>
                        </Label>

                        <Input
                            {...register("areaFormacao")}
                            className="w-full"
                        />

                        {errors.areaFormacao && watch("areaFormacao") == "" && (
                            <p className="text-sm text-red-500">
                                {String(errors.areaFormacao.message)}
                            </p>
                        )}

                    </div>

                    {/* Especialização */}
                    <div className="space-y-2 md:col-span-2">

                        <Label className="flex gap-1">
                            Especialização
                            <span className="text-red-500">*</span>
                        </Label>

                        <Input
                            {...register("especializacao")}
                            className="w-full"
                        />

                        {errors.especializacao && watch("especializacao") == "" && (
                            <p className="text-sm text-red-500">
                                {String(errors.especializacao.message)}
                            </p>
                        )}

                    </div>

                </div>

            </TabsContent>

            {/* Tab 3 - Contactos */}
            <TabsContent value="CONTACTOS" className="space-y-4 mt-4">
                <div>
                    <h3 className="text-lg font-medium mb-4">Contactos</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className='flex gap-1'>Email <span className='text-red-500'>*</span></Label>
                            <Input {...register("email")} />
                            {errors.email && watch('email') == "" &&
                                <p className="text-sm text-red-500">{String(errors.email.message)}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label className='flex gap-1'>Telemóvel <span className='text-red-500'>*</span></Label>
                            <Input {...register("telemovel")} />
                            {errors.telemovel && watch('telemovel') == "" &&
                                <p className="text-sm text-red-500">{String(errors.telemovel.message)}</p>}
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-medium mb-4">Endereço</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className='flex gap-1'>
                                Ilha
                                <span className='text-red-500'>*</span>
                            </Label>
                            <Controller
                                name="ilha"
                                control={control}
                                render={({field}) => (
                                    <Select value={field.value ?? ""} onValueChange={field.onChange}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {ilhasOptions.map((tipo) => (
                                                <SelectItem key={tipo.id} value={tipo.id}>
                                                    {tipo.nome}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className='flex gap-1'>
                                Concelho
                                <span className='text-red-500'>*</span>
                            </Label>
                            <Controller
                                name="concelho"
                                control={control}
                                render={({field}) => (
                                    <Select value={field.value ?? ""} onValueChange={field.onChange}>
                                        <SelectTrigger>
                                            <SelectValue
                                                placeholder={loadingConcelho ? "Carregando concelhos..." : !selectedIlha ? "Selecione a ilha primeiro" : "Selecione"}
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {concelhosOptions.map((tipo) => (
                                                <SelectItem key={tipo.id} value={tipo.id}>
                                                    {tipo.nome}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className='flex gap-1'>
                                Freguesia
                                <span className='text-red-500'>*</span>
                            </Label>
                            <Controller
                                name="freguesia"
                                control={control}
                                render={({field}) => (
                                    <Select value={field.value ?? ""} onValueChange={field.onChange}>
                                        <SelectTrigger>
                                            <SelectValue
                                                placeholder={loadingFreguesia ? "Carregando freguesias..." : !selectedConcelho ? "Selecione o concelho primeiro" : "Selecione"}
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {freguesiasOptions.map((tipo) => (
                                                <SelectItem key={tipo.id} value={tipo.id}>
                                                    {tipo.nome}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className='flex gap-1'>
                                Zona
                                <span className='text-red-500'>*</span>
                            </Label>
                            <Controller
                                name="zona"
                                control={control}
                                render={({field}) => (
                                    <Select value={field.value ?? ""} onValueChange={field.onChange}>
                                        <SelectTrigger>
                                            <SelectValue
                                                placeholder={loadingZona ? "Carregando zonas..." : !selectedFreguesia ? "Selecione a freguesia primeiro" : "Selecione"}
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {zonasOptions.map((tipo) => (
                                                <SelectItem key={tipo.id} value={tipo.id}>
                                                    {tipo.nome}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </TabsContent>

            {/* Tab 4 - Dados (CCF) */}
            <TabsContent value="CCF" className="space-y-4 mt-4">
                <h3 className="text-lg font-medium">Dados da Bolsa Nacional de Formadores (CCF)</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Possui CCF?</Label>
                        <Controller
                            name="possuiCCF"
                            control={control}
                            render={({field}) => (
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {SIM_NAO.map(item => {
                                            return (
                                                <SelectItem key={item.value} value={item.value}>
                                                    {item.label}
                                                </SelectItem>
                                            );
                                        })}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.possuiCCF &&
                            <p className="text-sm text-red-500">{String(errors.possuiCCF.message)}</p>}
                    </div>

                    {watch("possuiCCF") === "SIM" && (
                        <div className="space-y-2">
                            <Label>Nº de CCF</Label>
                            <div className="flex gap-2">
                                <Input {...register("numCCF")} placeholder="Número de inscrição na CCF"/>
                                <Button type="button" variant="outline">
                                    Auto-preencher
                                </Button>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Clique em &quot;Auto-preencher&quot; para buscar o número usando o NIF
                            </p>
                            {errors.numCCF &&
                                <p className="text-sm text-red-500">{String(errors.numCCF.message)}</p>}
                        </div>
                    )}
                </div>
            </TabsContent>

            {/* Tab 5 - Identificação da Entidade */}
            <TabsContent value="ENTIDADE" className="space-y-4 mt-4">
                <h3 className="text-lg font-medium">Identificação da Entidade Formadora</h3>

                <div className="grid grid-cols-2 gap-4">
                    <div className="relative col-span-1">

                        <div className="flex items-center rounded-md border border-input bg-background px-3 py-2">
                            <Search className="h-4 w-4 text-muted-foreground mr-2"/>

                            <Input
                                {...register("entidadeNome")}
                                value={watch("entidadeNome") || ""}
                                placeholder="Pesquisar entidade..."
                                className="border-none focus-visible:ring-0"

                                onChange={(e) => {
                                    const value = e.target.value

                                    setValue("entidadeNome", value)
                                    setEntidadePesquisa(value)
                                    setShowEntidadeList(true)

                                    // limpar entidade selecionada se o user começar a escrever
                                    setValue("entidadeId", "")
                                    setValue("entidadeNif", "")
                                    setValue("entidadeContacto", String(watch("entidadeContacto")));
                                    setValue("entidadeEmail", "")
                                }}

                                onFocus={() => setShowEntidadeList(true)}
                            />
                        </div>

                        {/* BOTÃO LIMPAR */}
                        {watch("entidadeId") && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-1 top-1/2 -translate-y-1/2"
                                onClick={() => {
                                    setValue("entidadeId", "")
                                    setValue("entidadeNome", "")
                                    setValue("entidadeNif", "")
                                    setValue("entidadeContacto", String(""))
                                    setValue("entidadeEmail", "")

                                    setEntidadePesquisa("")
                                    setShowEntidadeList(false)
                                }}
                            >
                                <X className="h-4 w-4 text-red-500"/>
                            </Button>
                        )}

                        {/* LISTA ENTIDADES */}
                        {showEntidadeList && entidadesFiltradas.length > 0 && (
                            <div
                                className="absolute z-50 w-full mt-1 bg-background border rounded-md shadow-lg max-h-48 overflow-y-auto">

                                {entidadesFiltradas.map((entidade, idx) => (
                                    <div
                                        key={idx}
                                        className="p-3 hover:bg-muted cursor-pointer border-b last:border-0"
                                        onClick={() => {

                                            setValue("entidadeId", String(entidade.id), {shouldValidate: true})
                                            setValue("entidadeNome", entidade.nome ?? "")
                                            setValue("entidadeNif", entidade.nif ?? "")
                                            setValue("entidadeContacto", String(entidade?.telefone) ?? "")
                                            setValue("entidadeEmail", entidade.email ?? "")

                                            setEntidadePesquisa(entidade.nome)
                                            setShowEntidadeList(false)
                                        }}
                                    >
                                        <p className="font-medium text-sm">{entidade.nome}</p>
                                        <p className="text-xs text-muted-foreground">
                                            NIF: {entidade.nif}
                                        </p>
                                    </div>
                                ))}

                            </div>
                        )}
                    </div>

                    {errors.entidadeId && !watch("entidadeId") && (
                        <p className="col-span-2 text-sm text-red-500">
                            {String(errors.entidadeId.message)}
                        </p>
                    )}
                </div>

                {/* DADOS ENTIDADE */}
                {watch("entidadeId") && (
                    <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg dark:bg-[#081325]">

                        <div className="space-y-2">
                            <Label>NIF</Label>
                            <Input value={watch("entidadeNif") || ""} disabled className="bg-muted"/>
                        </div>

                        <div className="space-y-2">
                            <Label>Contacto</Label>
                            <Input value={watch("entidadeContacto") || String(watch("entidadeContacto")) || ""} disabled
                                   className="bg-muted"/>
                        </div>

                        <div className="col-span-2 space-y-2">
                            <Label>Email</Label>
                            <Input value={watch("entidadeEmail") || ""} disabled className="bg-muted"/>
                        </div>

                    </div>
                )}
            </TabsContent>

            {/* Tab 6 - Preferências */}
            <TabsContent value="PREFERENCIAS" className="space-y-4 mt-4">
                <h3 className="text-lg font-medium">Preferências de Formação</h3>

                {/* Nova preferência */}
                <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
                    {/* Família */}
                    <div className="space-y-2">
                        <Label className='flex gap-1'>Família Profissional <span
                            className='text-red-500'>*</span></Label>
                        <Select value={novaPreferencia.familiaProfissional}
                                onValueChange={val => setNovaPreferencia(prev => ({
                                    ...prev,
                                    familiaProfissional: val
                                }))}>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione"/>
                            </SelectTrigger>
                            <SelectContent>
                                {familias.map(f =>
                                    <SelectItem
                                        key={f.familiaId}
                                        value={String(f.familiaId)}
                                    >
                                        {f.denominacaoFamilia}
                                    </SelectItem>
                                )}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Qualificação */}
                    <div className="space-y-2">
                        <Label className='flex gap-1'>Qualificação <span className='text-red-500'>*</span></Label>
                        <Select
                            value={novaPreferencia.qualificacao}
                            disabled={!novaPreferencia.familiaProfissional}
                            onValueChange={val => setNovaPreferencia(prev => ({...prev, qualificacao: val}))}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione"/>
                            </SelectTrigger>
                            <SelectContent>
                                {qualificacoes.map(q =>
                                    <SelectItem
                                        key={q.id}
                                        value={String(q.id)}
                                    >
                                        {q.denominacao}
                                    </SelectItem>
                                )}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Módulo */}
                    <div className="space-y-2">
                        <Label className='flex gap-1'>Módulo <span className='text-red-500'>*</span></Label>
                        <Select
                            value={novaPreferencia.modulo}
                            disabled={!novaPreferencia.qualificacao}
                            onValueChange={val => setNovaPreferencia(prev => ({...prev, modulo: val}))}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione"/>
                            </SelectTrigger>
                            <SelectContent>
                                {modulos.map(m => <SelectItem key={m.id} value={String(m.id)}>{m.label}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Unidade */}
                    <div className="space-y-2">
                        <Label className='flex gap-1'>Unidade Formativa <span className='text-red-500'>*</span></Label>
                        <Select
                            value={novaPreferencia.unidadeFormativa}
                            disabled={!novaPreferencia.modulo}
                            onValueChange={val => setNovaPreferencia(prev => ({...prev, unidadeFormativa: val}))}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione"/>
                            </SelectTrigger>
                            <SelectContent>
                                {unidades.map(u => <SelectItem key={u.id} value={String(u.id)}>{u.label}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="col-span-2">
                        <Button
                            type="button"
                            className="w-full"
                            disabled={!novaPreferencia.familiaProfissional || !novaPreferencia.qualificacao}
                            onClick={() => {
                                const familia = familias.find(f => String(f.familiaId) === novaPreferencia.familiaProfissional)
                                const qualificacao = qualificacoes.find(q => String(q.id) === novaPreferencia.qualificacao)
                                const modulo = modulos.find(m => String(m.id) === novaPreferencia.modulo)
                                const unidade = unidades.find(u => String(u.id) === novaPreferencia.unidadeFormativa)

                                append({
                                    ...novaPreferencia,

                                    familiaNome: familia?.denominacaoFamilia,
                                    qualificacaoNome: qualificacao?.denominacao,
                                    moduloNome: modulo?.label,
                                    unidadeNome: unidade?.label,
                                    unidadeOrigem: unidade?.origem
                                })

                                setNovaPreferencia({
                                    familiaProfissional: "",
                                    qualificacao: "",
                                    modulo: "",
                                    unidadeFormativa: "",
                                })
                            }}
                        >
                            Adicionar Preferência
                        </Button>
                    </div>

                    {errors.preferencias && watch('preferencias').length === 0 && (
                        <p className="text-sm text-red-500 mt-2">{errors.preferencias.message}</p>)}
                </div>

                {/* Preferências adicionadas */}
                {fields.length > 0 && (
                    <div className="space-y-2">
                        <Label>Preferências adicionadas</Label>

                        {fields.map((item, index) => {
                            // Família pode tentar API (caso já tenha carregado)
                            const familiaNome =
                                familias.find(f => String(f.codigoFamilia) === String(item.familiaProfissional))?.denominacaoFamilia
                                || item.familiaNome
                                || item.familiaProfissional;

                            // NÃO depende da API
                            const qualificacaoNome = item.qualificacaoNome || item.qualificacao;
                            const moduloNome = item.moduloNome || item.modulo;
                            const unidadeNome = item.unidadeNome || item.unidadeFormativa;

                            return (
                                <div key={index}>
                                    <div
                                        className="flex items-center justify-between p-3 bg-muted rounded-md dark:bg-[#081325] mt-4">
                                        <div className="text-sm">
                                            <p className="font-medium">
                                                {familiaNome} — {qualificacaoNome}
                                            </p>

                                            {item.modulo && (
                                                <p className="text-xs text-muted-foreground">
                                                    {moduloNome} {unidadeNome && `• ${unidadeNome}`}
                                                </p>
                                            )}
                                        </div>

                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => remove(index)}
                                        >
                                            <X className="h-4 w-4"/>
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </TabsContent>

            {/* Tab 7 - Anexos */}
            <TabsContent value="ANEXOS" className="space-y-4 mt-4">
                <h3 className="text-lg font-medium">Anexar Documentos</h3>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className='flex gap-1'>Tipo de Documento Anexo <span
                            className='text-red-500'>*</span></Label>
                        <Select
                            value={tipoDocumentoAnexoSelected}
                            onValueChange={(v) => setTipoDocumentoAnexoSelected(v)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione"/>
                            </SelectTrigger>
                            <SelectContent>
                                {tipoDocumento?.map((tipo, idx: number) => (
                                    <SelectItem key={idx} value={tipo.value}>
                                        {tipo?.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Anexar Documento</Label>
                        <Input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (!file || !tipoDocumentoAnexoSelected) return;

                                // Adiciona ao array de anexos mantendo os existentes
                                setValue("anexos", [...(anexos || []), {
                                    tipo: tipoDocumentoAnexoSelected,
                                    file
                                }], {shouldValidate: true});

                                // Limpa seleção
                                setTipoDocumentoAnexoSelected("");
                                if (fileInputRef.current) fileInputRef.current.value = "";
                            }}
                            disabled={!tipoDocumentoAnexoSelected}
                        />
                    </div>
                    <span className="text-xs text-blue-500">
                      É permitido anexar mais do que um documento
                    </span>
                </div>

                {anexos && anexos.length > 0 && (
                    <div className="space-y-2">
                        <Label>Documentos Anexados</Label>
                        <div className="space-y-2 max-h-48 overflow-y-auto mt-4">
                            {anexos.map((anexo: any, index: number) => (
                                <div key={index}
                                     className="flex items-center justify-between p-3 bg-muted rounded-md dark:bg-[#081325]">
                                    <div className="flex items-center gap-3">
                                        <FileText className="h-4 w-4 text-muted-foreground"/>
                                        <div>
                                            <p className="text-sm font-medium">
                                                {anexo?.file?.name || anexo?.name}
                                            </p>
                                        </div>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                            const newAnexos = anexos.filter((_: any, i: number) => i !== index);
                                            setValue("anexos", newAnexos, {shouldValidate: true});
                                        }}
                                    >
                                        <X className="h-4 w-4"/>
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </TabsContent>
        </>
    )
}
