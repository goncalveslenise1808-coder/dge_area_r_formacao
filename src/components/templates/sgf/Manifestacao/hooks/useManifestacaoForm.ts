import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {ManifestacaoFormData, manifestacaoSchema} from "@/components/templates/sgf/Manifestacao/hooks/Schema/useSchema";

/**
 * Hook responsável por inicializar o formulário da Manifestação
 * usando React Hook Form + validação com Zod.
 *
 * Recebe o objeto user para pré-preencher os campos.
 */
export function useManifestacaoForm(user: any) {

    /**
     * useForm cria e controla todo o estado do formulário:
     * - valores
     * - validação
     * - erros
     * - submissão
     */
    return useForm<ManifestacaoFormData>({

        /**
         * Integra Zod com React Hook Form
         * Assim todas as validações são definidas no schema Zod
         */
        resolver: zodResolver(manifestacaoSchema),

        /**
         * Valores iniciais do formulário.
         * Se o user existir, usa os dados dele.
         * Caso contrário usa string vazia.
         */
        defaultValues: {

            // Dados de documento
            tipoDocumento: user?.tipo_documento || "",
            numDocumento: user?.num_documento || "",
            dataEmissao: user?.dt_emissao || "",
            dataValidade: user?.dt_validade || "",
            nif: user?.nif || "",

            // Dados pessoais
            nomeCompleto: user?.nome || "",
            dataNascimento: user?.data_nasc || "",
            nomeMae: user?.nome_mae || "",
            nomePai: user?.nome_pai || "",
            sexo: user?.sexo || "",
            nacionalidade: user?.nacionalidade_id || "",
            paisOrigem: user?.pais || "",

            // Contactos
            email: user?.email || "",
            telemovel: user?.telefone || "",

            // Endereço
            ilha: user?.ilha_id || "",
            concelho: user?.concelho_id || "",
            freguesia: user?.freguesia_id || "",
            zona: user?.localidade_id || "",

            // Foto do utilizador
            foto: user?.foto || ""
        }
    })
}