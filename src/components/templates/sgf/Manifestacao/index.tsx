"use client"

import type React from "react"
import {CardNewManifestacao,} from "@/components/templates/sgf/Manifestacao/components/manifestacao-new-manifestacao";
import {IDominioItem} from "@/services/equivalencia/dominios/type";
import {IPessoaInfo} from "@/services/profiles/type";
import {Entidade} from "@/services/entidade/type";

export interface Manifestacao {
    id: number
    formacao: string
    data: string
    status: string
    areaFormacao?: string
    disponibilidade?: string
    observacoes?: string
    nif?: string
    morada?: string
    contacto?: string
    entidade?: string
    qualificacao?: string
    modulo?: string
}

export interface ManifestacaoProps {
    docIdentification: IDominioItem[]
    tipoDocumento: IDominioItem[]
    SIM_NAO: IDominioItem[]
    genero: IDominioItem[]
    countries: any,
    grau_escolar: any,
    user: IPessoaInfo | undefined
    entidade: Entidade[]
    resolvedSearchParams?: { [key: string]: string | string[] | undefined }
}

export function ManifestacaoTemplate(props: ManifestacaoProps) {
    const {
        docIdentification,
        tipoDocumento,
        SIM_NAO,
        user,
        genero,
        countries,
        grau_escolar,
        entidade,
        resolvedSearchParams
    } = props

    return (
        <main className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-4 sm:py-6 lg:py-8 w-full">
                <CardNewManifestacao
                    resolvedSearchParams={resolvedSearchParams}
                    user={user}
                    grau_escolar={grau_escolar}
                    docIdentification={docIdentification}
                    tipoDocumento={tipoDocumento}
                    SIM_NAO={SIM_NAO}
                    genero={genero}
                    countries={countries}
                    entidade={entidade}
                />
            </div>
        </main>
    )
}
