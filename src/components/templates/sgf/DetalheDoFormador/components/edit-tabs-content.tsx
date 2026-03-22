import {
    Controller,
    useFieldArray,
    useFormContext,
} from "react-hook-form";
import { TabsContent } from "@/components/atoms/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms/avatar";
import { Button } from "@/components/atoms/button";
import { Plus, Upload, X } from "lucide-react";
import { Label } from "@/components/atoms/label";
import { Input } from "@/components/atoms/input";
import { Textarea } from "@/components/atoms/textarea";
import { Card, CardContent } from "@/components/atoms/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/atoms/select";
import { Badge } from "@/components/atoms/badge";
import { ProfileForm } from "./EditProfileDialog";

interface Props {
    activTabs: string;
}

export function EditTabsContent({ activTabs }: Props) {
    const { control, register, watch, setValue, formState: { errors },} = useFormContext<ProfileForm>();

    const { fields: formacoesFields, append: appendFormacao, remove: removeFormacao } =
        useFieldArray({ control, name: "formacoes" });

    const { fields: experienciasFields, append: appendExperiencia, remove: removeExperiencia } =
        useFieldArray({ control, name: "experiencias" });

    const especializacoes = watch("especializacoes");

    const addEspecializacao = (nova: string) => {
        if (nova && !especializacoes.includes(nova)) {
            setValue("especializacoes", [...especializacoes, nova]);
        }
    };

    return(
        <>
            {
                activTabs && activTabs === 'pessoal' && (
                    <>
                        {/* Dados Pessoais */}
                        <TabsContent value="pessoal" className="space-y-4 mt-4">
                            <div className="flex justify-center mb-4">
                                <div className="relative">
                                    <Avatar className="h-24 w-24">
                                        <AvatarImage src="/professional-portrait.png" />
                                        <AvatarFallback>
                                            {watch("nome")
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                    <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 h-8 w-8 rounded-full">
                                        <Upload className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="nome">Nome Completo</Label>
                                    <Input id="nome" {...register("nome")} />
                                    <p className='mt-1 text-xs text-red-400'>{errors.nome?.message}</p>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cargo">Cargo</Label>
                                    <Input id="cargo" {...register("cargo")} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" {...register("email")} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="telefone">Telefone</Label>
                                    <Input id="telefone" {...register("telefone")} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="nif">NIF</Label>
                                    <Input id="nif" {...register("nif")} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="localizacao">Localização</Label>
                                    <Input id="localizacao" {...register("localizacao")} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="morada">Morada</Label>
                                <Input id="morada" {...register("morada")} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="sobre">Sobre</Label>
                                <Textarea id="sobre" {...register("sobre")} rows={3} />
                            </div>
                        </TabsContent>
                    </>
                )
            }

            {
                activTabs && activTabs === 'formacao' && (
                    <>
                        {/* Formação */}
                        <TabsContent value="formacao" className="space-y-4 mt-4">
                            {formacoesFields.map((formacao, index) => (
                                <Card key={formacao.id}>
                                    <CardContent className="pt-4">
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="font-medium text-sm text-muted-foreground">Formação {index + 1}</span>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => removeFormacao(index)}>
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Grau</Label>
                                                <Controller
                                                    control={control}
                                                    name={`formacoes.${index}.grau`}
                                                    render={({ field }) => (
                                                        <Select
                                                            value={field.value}
                                                            onValueChange={field.onChange}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Selecione o grau" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="Licenciatura">Licenciatura</SelectItem>
                                                                <SelectItem value="Mestrado">Mestrado</SelectItem>
                                                                <SelectItem value="Doutoramento">Doutoramento</SelectItem>
                                                                <SelectItem value="Pós-Graduação">Pós-Graduação</SelectItem>
                                                                <SelectItem value="Curso Técnico">Curso Técnico</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    )}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Ano de Conclusão</Label>
                                                <Input {...register(`formacoes.${index}.ano`)} placeholder="2020" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 mt-4">
                                            <div className="space-y-2">
                                                <Label>Curso</Label>
                                                <Input {...register(`formacoes.${index}.curso`)} placeholder="Nome do curso" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Instituição</Label>
                                                <Input {...register(`formacoes.${index}.instituicao`)} placeholder="Nome da instituição" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}

                            <Button type={'button'} variant="outline" className="w-full bg-transparent" onClick={() => appendFormacao({ grau: "", curso: "", instituicao: "", ano: "" })}>
                                <Plus className="mr-2 h-4 w-4" />
                                Adicionar Formação
                            </Button>
                        </TabsContent>
                    </>
                )
            }

            {
                activTabs && activTabs === 'experiencia' && (
                    <>
                        {/* Experiência */}
                        <TabsContent value="experiencia" className="space-y-4 mt-4">
                            {experienciasFields.map((exp, index) => (
                                <Card key={exp.id}>
                                    <CardContent className="pt-4">
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="font-medium text-sm text-muted-foreground">Experiência {index + 1}</span>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => removeExperiencia(index)}>
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Cargo</Label>
                                                <Input {...register(`experiencias.${index}.cargo`)} placeholder="Nome do cargo" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Período</Label>
                                                <Input {...register(`experiencias.${index}.periodo`)} placeholder="2020 - Presente" />
                                            </div>
                                        </div>
                                        <div className="space-y-2 mt-4">
                                            <Label>Empresa/Organização</Label>
                                            <Input {...register(`experiencias.${index}.empresa`)} placeholder="Nome da empresa" />
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}

                            <Button type={'button'} variant="outline" className="w-full bg-transparent" onClick={() => appendExperiencia({ cargo: "", empresa: "", periodo: "" })}>
                                <Plus className="mr-2 h-4 w-4" />
                                Adicionar Experiência
                            </Button>
                        </TabsContent>
                    </>
                )
            }

            {
                activTabs && activTabs === 'especializacoes' && (
                    <>
                        {/* Especializações */}
                        <TabsContent value="especializacoes" className="space-y-4 mt-4">
                            <div className="flex flex-wrap gap-2">
                                {especializacoes.map((esp) => (
                                    <Badge key={esp} variant="secondary" className="flex items-center gap-1 pr-1">
                                        {esp}
                                        <Button variant="ghost" size="icon" className="h-4 w-4 hover:bg-transparent">
                                            <X className="h-3 w-3" />
                                        </Button>
                                    </Badge>
                                ))}
                            </div>

                            <div className="flex gap-2">
                                <Input
                                    placeholder="Nova área de especialização"
                                    id="novaEspecializacao"
                                    onKeyDown={(e) => e.key === "Enter" && addEspecializacao((e.target as HTMLInputElement).value)}
                                />
                                <Button type={'button'} onClick={() => addEspecializacao((document.getElementById("novaEspecializacao") as HTMLInputElement).value)}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Adicionar
                                </Button>
                            </div>
                        </TabsContent>
                    </>
                )
            }
        </>
    )
}
