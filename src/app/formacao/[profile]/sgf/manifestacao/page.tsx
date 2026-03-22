import {ManifestacaoTemplate} from "@/components/templates/sgf/Manifestacao"
import {BreadcrumbNav} from "@/components/organisms/BreadcrumbNav";
import {getDominioAll, getNacionalidade} from "@/services/equivalencia/dominios";
import {getCachedMyAccount} from "@/app/cache/cached-my-account";
import {getDominios} from "@/services/dominios";
import {getEntidadeFormadoras} from "@/services/entidade";

export default async function ManifestacaoPage({
                                                   // params,
                                                   searchParams
                                               }: {
    //  params: Promise<{ profile: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {

    //const {profile} = await params;
    const resolvedSearchParams = await searchParams;

    const [
        user,
        documentoIdentificacao,
        tipoDocumento,
        genero,
        countries,
        grau_escolar,
        entidadeFormadora,
        SIM_NAO
    ] = await Promise.all([
        getCachedMyAccount(),
        getDominioAll({dad: 'equiv', domains: "TIPO_DOCUMENTO_IDENT"}),
        getDominioAll({dad: 'sgf', domains: "TIPO_DOCUMENTO_FORM"}),
        getDominioAll({dad: 'equiv', domains: "GENERO"}),
        getNacionalidade().catch(() => ({} as any)),
        getDominios({dominio: "GRAU_ACADEMICO"}).catch(() => ({} as any)),
        getEntidadeFormadoras().catch(() => ([] as any)),
        getDominioAll({dad: 'sgf', domains: "SIM_NAO"}),
    ]);
    const info_user = user?.pessoa_info

    return (
        <div className='ml-4 w-full'>
            <BreadcrumbNav
                homeHref={
                    process?.env?.NEXT_PUBLIC_CENTRAL_BASE_URL ||
                    "https://dge-central-base.vercel.app"
                }
                items={[
                    {
                        title: "SGF / Manifestação de Interesse",
                    },
                ]}
            />

            <ManifestacaoTemplate
                resolvedSearchParams={resolvedSearchParams}
                docIdentification={documentoIdentificacao}
                tipoDocumento={tipoDocumento}
                genero={genero}
                user={info_user}
                grau_escolar={grau_escolar}
                countries={countries}
                entidade={entidadeFormadora}
                SIM_NAO={SIM_NAO}
            />
        </div>
    )
}
