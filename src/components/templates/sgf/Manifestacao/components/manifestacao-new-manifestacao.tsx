"use client"

import React from "react"
import {FormProvider} from "react-hook-form"
import {usePathname, useRouter} from "next/navigation"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/atoms/card"
import {Tabs} from "@/components/atoms/tabs"

import {ModalTabsList} from "@/components/templates/sgf/Manifestacao/components/modal-tabs-list"
import {ManifestacaoTabsContent} from "@/components/templates/sgf/Manifestacao/components/manifestacao-tabs-content"

import {IPessoaInfo} from "@/services/profiles/type"
import {IDominioItem} from "@/services/equivalencia/dominios/type"
import {Entidade} from "@/services/entidade/type"
import {useManifestacaoForm} from "@/components/templates/sgf/Manifestacao/hooks/useManifestacaoForm";
import {useManifestacaoTabs} from "@/components/templates/sgf/Manifestacao/hooks/useManifestacaoTabs";
import {onSubmitManifestacao} from "@/components/templates/sgf/Manifestacao/hooks/onSubmitManifestacao";
import {CardFooterNavigation} from "@/components/templates/sgf/Manifestacao/components/CardFooterNavigation";
import {useManifestacaoStorage} from "@/components/templates/sgf/Manifestacao/hooks/useManifestacaoStorage";

interface CardNewManifestacaoProps {
    user: IPessoaInfo | undefined
    docIdentification: IDominioItem[]
    tipoDocumento: IDominioItem[]
    SIM_NAO: IDominioItem[]
    genero: IDominioItem[]
    countries: any
    grau_escolar: any
    entidade: Entidade[]
    resolvedSearchParams?: { [key: string]: string | string[] | undefined }
}

export function CardNewManifestacao(props: CardNewManifestacaoProps) {
    const router = useRouter()
    const pathname = usePathname()
    const Pathname = pathname.split("/")[2]

    const {
        resolvedSearchParams,
        user,
        docIdentification,
        tipoDocumento,
        SIM_NAO,
        genero,
        countries,
        grau_escolar,
        entidade
    } = props
    const motivoRetificacao = resolvedSearchParams?.motivo_retificacao;

    // USE-FORM
    const methods = useManifestacaoForm(user)

    // LOCAL STORAGE
    useManifestacaoStorage(methods)

    // TABS
    const {
        activeTab,
        isFirstTab,
        isLastTab,
        next,
        previous,
        goToTab,
    } = useManifestacaoTabs({
        methods,
        motivoRetificacao
    });

    // SUBMIT
    const onSubmit = async (data: any) => {
        await onSubmitManifestacao({
            data,
            userId: user?.id,
            router,
            methods,
            Pathname
        })
    }

    return (
        <Card className="border-none shadow-none sm:border sm:shadow-sm dark:bg-[#1d293d]">
            <CardHeader className="px-4 sm:px-6">
                <CardTitle className="text-lg sm:text-xl lg:text-2xl">
                    Nova Manifestação de Interesse
                </CardTitle>

                <CardDescription className="text-sm sm:text-base">
                    Preencha os dados abaixo para manifestar interesse numa formação.
                </CardDescription>
            </CardHeader>

            <CardContent className="px-4 sm:px-6">
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>

                        <Tabs
                            value={activeTab}
                            onValueChange={goToTab}
                            className="w-full mt-2 sm:mt-4"
                        >

                            <ModalTabsList
                                value={activeTab}
                                onChange={goToTab}
                            />

                            <ManifestacaoTabsContent
                                user={user}
                                grau_escolar={grau_escolar}
                                docIdentification={docIdentification}
                                tipoDocumento={tipoDocumento}
                                SIM_NAO={SIM_NAO}
                                genero={genero}
                                countries={countries}
                                entidade={entidade}
                            />

                        </Tabs>

                        <CardFooterNavigation
                            isFirstTab={isFirstTab}
                            isLastTab={isLastTab}
                            onNext={next}
                            onPrevious={previous}
                            isSubmitting={methods.formState.isSubmitting}
                        />
                    </form>
                </FormProvider>
            </CardContent>
        </Card>
    )
}