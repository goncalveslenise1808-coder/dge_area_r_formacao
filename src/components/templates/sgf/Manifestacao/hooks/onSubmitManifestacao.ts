import {toast} from "sonner"
import {postManifestacaoInteresse} from "@/services/sgf/postManifestacaoInteresse"

interface SubmitParams {
    data: any
    userId?: number | undefined
    router: any
    methods: any
    Pathname: string
}

export async function onSubmitManifestacao(props: SubmitParams) {

    const {data, userId, router, methods, Pathname} = props

    if (!data) return

    let resp

    try {

        resp = await postManifestacaoInteresse(data, userId)

        if (!resp?.success) {
            toast.error(resp?.message || "Erro ao enviar manifestação.")
            return
        }

        toast.success(
            "A sua manifestação de interesse foi enviada com sucesso.",
            {
                description: "Em breve entraremos em contacto.",
                duration: 4000
            }
        )

        router.refresh()

        // limpa apenas campos que não devem permanecer
        methods.reset({
            ...methods.getValues(),

            paisOrigem: "",
            habilitacao: "",
            areaFormacao: "",
            especializacao: "",

            possuiCCF: "",
            numCCF: "",

            entidadeId: "",
            entidadeNome: "",
            entidadeNif: "",
            entidadeContacto: "",
            entidadeEmail: "",

            preferencias: [],
            anexos: [],
            foto: null
        })

        router.push(`/formacao/${Pathname}/sgf/acompanhamento`)

    } catch (error) {

        console.error("Erro no envio da manifestação:", error)

        toast.error(
            resp?.message || "Ocorreu um erro ao processar o pedido."
        )
    }
}