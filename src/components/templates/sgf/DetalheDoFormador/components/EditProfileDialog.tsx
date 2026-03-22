"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/atoms/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/atoms/tabs";
import { Button } from "@/components/atoms/button";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dispatch, SetStateAction, useState } from "react";
import { EditTabsContent } from "./edit-tabs-content";

/* ---------------- SCHEMAS ---------------- */
const formacaoSchema = z.object({
    grau: z.string().nonempty(),
    curso: z.string().nonempty(),
    instituicao: z.string().nonempty(),
    ano: z.string(),
});

const experienciaSchema = z.object({
    cargo: z.string().nonempty(),
    empresa: z.string().nonempty(),
    periodo: z.string().nonempty(),
});

export const profileSchema = z.object({
    nome: z.string(),
    cargo: z.string(),
    email: z.string().email(),
    telefone: z.string(),
    localizacao: z.string(),
    nif: z.string(),
    morada: z.string(),
    sobre: z.string(),
    formacoes: z.array(formacaoSchema),
    experiencias: z.array(experienciaSchema),
    especializacoes: z.array(z.string()),
});

export type ProfileForm = z.infer<typeof profileSchema>;

interface EditProfileDialogProps {
    isEditOpen: boolean;
    setIsEditOpen: Dispatch<SetStateAction<boolean>>;
}

export function EditProfileDialog({
  isEditOpen,
  setIsEditOpen,
}: EditProfileDialogProps) {
    const [activTabs, setActivTabs] = useState("pessoal");

    const methods = useForm<ProfileForm>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            nome: "João Dias",
            cargo: "Formador Sénior",
            email: "joao.dias@email.com",
            telefone: "+351 912 345 678",
            localizacao: "Lisboa, Portugal",
            nif: "123456789",
            morada: "Rua das Flores, 123",
            sobre: "Formador com mais de 10 anos de experiência.",
            formacoes: [
                {
                    grau: "Mestrado",
                    curso: "Gestão de RH",
                    instituicao: "Universidade de Lisboa",
                    ano: "2015",
                },
                {
                    grau: "Licenciatura",
                    curso: "Psicologia",
                    instituicao: "Universidade do Porto",
                    ano: "2012",
                },
            ],
            experiencias: [
                {
                    cargo: "Formador Sénior",
                    empresa: "DGE",
                    periodo: "2018 - Presente",
                },
            ],
            especializacoes: ["Gestão", "Liderança"],
        },
    });

    const onSubmit = (data: ProfileForm) => {
        console.log("Dados salvos:", data);
        setIsEditOpen(false);
    };

    return (
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Editar Perfil</DialogTitle>
                    <DialogDescription>
                        Atualize as suas informações pessoais e profissionais
                    </DialogDescription>
                </DialogHeader>

                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <Tabs value={activTabs} onValueChange={setActivTabs} className="mt-4">
                            <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="pessoal">Dados Pessoais</TabsTrigger>
                                <TabsTrigger value="formacao">Formação</TabsTrigger>
                                <TabsTrigger value="experiencia">Experiência</TabsTrigger>
                                <TabsTrigger value="especializacoes">Especializações</TabsTrigger>
                            </TabsList>

                            {/* Todos os TabsContent */}
                            <EditTabsContent activTabs={activTabs} />
                        </Tabs>

                        <DialogFooter className="mt-6">
                            <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>
                                Cancelar
                            </Button>
                            <Button type="submit">Guardar Alterações</Button>
                        </DialogFooter>
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    );
}
