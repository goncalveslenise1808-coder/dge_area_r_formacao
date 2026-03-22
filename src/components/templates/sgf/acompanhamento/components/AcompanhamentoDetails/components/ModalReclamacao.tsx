'use client'
import { Button } from "@/components/atoms/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/atoms/dialog"
import { Card } from '@/components/atoms/card';
import { Label } from '@/components/atoms/label';
import { Input } from '@/components/atoms/input';
import { Textarea } from '@/components/atoms/textarea';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/atoms/select';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/atoms/accordion';
import {Info} from 'lucide-react';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { IGetReclamacaoProps, postReclamacao } from "@/services/reclamacao";
import { toast } from "sonner";
import {useState} from "react";

const ReclamacaoSchema = z.object({
    pretendeReclamar: z.enum(["1", "2"], {
        required_error: "Selecione uma opção",
    }),
    observacao: z.string().optional(),
    anexo: z.any().optional()
        .refine(
            (files) => !files || files instanceof FileList,
            "Anexo inválido"
        ),
}).refine(
    (data) =>
        data.pretendeReclamar !== "1" ||
        !!data.observacao?.trim(),
    {
        message: "A observação é obrigatória quando pretende reclamar",
        path: ["observacao"],
    }
);

type ReclamacaoForm = z.infer<typeof ReclamacaoSchema>;

export function ModalReclamacaoTemplate({
    dataR,
    children,
    setRefetchReclamacao
}: {
    dataR: IGetReclamacaoProps | undefined
    children: React.ReactNode
    setRefetchReclamacao: (value: boolean) => void
}) {

    const [open, setOpen] = useState(false);
    const fields = [
        { label: 'Nº do Processo', value: dataR?.numeroProcesso || '' },
        { label: 'Nº de Apresentação', value: dataR?.numeroApresentacao || '' },
        { label: 'País de Obtenção', value: dataR?.paisObtencao || '' },
        { label: 'Instituição', value: dataR?.instituicaoFtp || '' },
        { label: 'Carga Horária', value: dataR?.cargaHoraria || '' },
        { label: 'Data do Despacho', value: dataR?.dataDespacho || '' },
        { label: 'Despacho', value: dataR?.despacho || '' },
    ];

    const {
        register,
        control,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ReclamacaoForm>({
        resolver: zodResolver(ReclamacaoSchema),
        defaultValues: {
            pretendeReclamar: "1",
            observacao: "",
            anexo: undefined,
        },
    });

    const pretendeReclamar = watch("pretendeReclamar");

    async function handleSubmitForm(data: ReclamacaoForm) {

        try {
            const payload = {
                n_processo: String(dataR?.numeroProcesso),
                observacao: data.observacao ?? "",
                decisao: Number(data.pretendeReclamar),
            };

            if (!dataR?.podeAlterarSolic){
                toast.warning(dataR?.messagemEstado);
                return;
            }
            await postReclamacao(payload);

            toast.success("✅ Reclamação enviada com sucesso!");

            reset({
                pretendeReclamar: undefined,
                observacao: "",
                anexo: undefined,
            });

            setRefetchReclamacao(true)
            setOpen(false)
        } catch (error) {
            console.error(error);
            toast.error("Erro ao enviar a reclamação.");
        }
    }

    /*async function handleNaoReclamar() {
        if (!dataR?.podeAlterarSolic) {
            toast.warning(dataR?.messagemEstado);
            return;
        }

        try {
            toast.info("ℹ️ A registar que não pretende reclamar...");

            const payload = {
                n_processo: String(dataR.numeroProcesso),
                observacao: "",
                decisao: 2,
            };

            await postReclamacao(payload);

            toast.success(
                "✅ Registo efetuado com sucesso. Indicou que não pretende reclamar."
            );

            setRefetchReclamacao(true);
            setOpen(false);

        } catch (error: any) {
            console.error(error);

            // 👇 mensagem vinda da API (se existir)
            toast.error(
                error?.response?.data?.message ??
                "❌ O período de reclamação já se encontra encerrado."
            );
        }
    }
*/
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className="w-[95vw] max-w-5xl max-h-[90vh] overflow-hidden sm:rounded-2xl">
                <form onSubmit={handleSubmit(handleSubmitForm)}>

                    <div className="max-h-[80vh] overflow-y-auto space-y-6 pr-1">

                        <DialogHeader>
                            <DialogTitle>Reclamação</DialogTitle>
                            <DialogDescription>
                                O seu processo encontra-se em estado de reclamação.
                                Pode apresentar a sua reclamação no prazo de 5 dias.
                            </DialogDescription>

                            {!dataR?.podeAlterarSolic && (
                                <div className="flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg border border-yellow-300">
                                    <span>⚠️</span>
                                    <span>{dataR?.messagemEstado}</span>
                                </div>
                            )}
                        </DialogHeader>

                        <Accordion type="single" collapsible defaultValue="">
                            <AccordionItem value="detalhes" className="border-none">
                                <Card className="">
                                    <AccordionTrigger className="px-2 py-3 hover:no-underline bg-[#eff6ff]">
                                        <h1 className="text-base font-semibold">
                                            Detalhes do Processo
                                        </h1>
                                    </AccordionTrigger>

                                    <AccordionContent className="pt-0">
                                        <div className="w-full bg-white rounded-b-lg p-2 grid grid-cols-2 gap-2">
                                            {fields.map((item, idx) => (
                                                <div key={idx}>
                                                    <Label className="font-semibold">
                                                        {item.label}
                                                    </Label>
                                                    <div className="text-sm text-muted-foreground">
                                                        {item.value}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </AccordionContent>
                                </Card>
                            </AccordionItem>
                        </Accordion>

                        <Card className="grid gap-4 bg-[#eff6ff]">
                            <h1 className='p-2'>Formulário de Reclamação</h1>

                            <div className='w-full bg-white rounded-b-lg p-2'>
                                <Label>Pretendo reclama!</Label>
                                <Controller
                                    name="pretendeReclamar"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            value={field.value}
                                            disabled
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Opções</SelectLabel>
                                                    <SelectItem value="1">Sim</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />

                                {errors.pretendeReclamar && (
                                    <p className="text-red-500 text-sm">
                                        {errors.pretendeReclamar.message}
                                    </p>
                                )}

                                {pretendeReclamar === "1" && (
                                    <Accordion type="single" collapsible defaultValue="item-1">
                                        <AccordionItem value="item-1">
                                            <AccordionTrigger>
                                                Motivo da Reclamação *
                                            </AccordionTrigger>

                                            <AccordionContent className="flex flex-col gap-4">
                                                <Textarea
                                                    {...register("observacao")}
                                                    placeholder="Descreva o motivo da reclamação..."
                                                    className={`${errors.observacao ? "border-red-500" : ""}`}
                                                />
                                                {errors.observacao && (
                                                    <p className="text-red-500 text-sm">
                                                        {errors.observacao.message}
                                                    </p>
                                                )}

                                                <div>
                                                    <Label>Anexo (Opcional)</Label>
                                                    <Input
                                                        type="file"
                                                        {...register("anexo")}
                                                    />
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                )}
                            </div>
                        </Card>

                        <div className="bg-blue-500/5 rounded-2xl p-6 border-2 border-blue-500/20">
                            <div className="flex gap-2 text-sm text-blue-800">
                                <Info className="w-5 h-5 text-blue-600" />
                                <p>
                                    <strong>Atenção:</strong> Ao submeter a reclamação,
                                    o processo será reavaliado pela equipa técnica.
                                </p>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="py-4">
                       <div className='flex gap-2'>
                          {/* <Button
                               type="button"
                               variant="outline"
                               onClick={handleNaoReclamar}
                               disabled={isSubmitting || !dataR?.podeAlterarSolic}
                           >
                               Registrar que pretende não reclamar
                           </Button>*/}

                           <Button
                               type="submit"
                               disabled={isSubmitting || !dataR?.podeAlterarSolic}
                           >
                               Submeter Reclamação
                           </Button>
                       </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}