import {z} from "zod"

export const fileSchema = z.instanceof(File);

export const fotoSchema = z.union([
    z.instanceof(File)
        .refine((f) => f.size <= 5 * 1024 * 1024, "Máx 5MB"),
    z.string().url("Informe uma URL válida"),
])
    .optional()
    .nullable();

export const anexoSchema = z.object({
    tipo: z.string().min(1),
    file: fileSchema,
})

export const tabFieldsMap: Record<string, (keyof ManifestacaoFormData)[]> = {
    "DADOS_PESSOAIS": [
        "tipoDocumento",
        "numDocumento",
        "dataEmissao",
        "dataValidade",
        "nif",
        "nomeCompleto",
        "dataNascimento",
        "nomeMae",
        "nomePai",
        "sexo",
        "nacionalidade",
        "paisOrigem",
    ],
    "DADOS_ACADEMICO": [
        "habilitacao",
        "areaFormacao",
        "especializacao",
    ],
    "CONTACTOS": [
        "email",
        "telemovel",
        "ilha",
        "concelho",
        "freguesia",
    ],
    "CCF": [
        "possuiCCF",
        "numCCF",
    ],
    "ENTIDADE": [
        "entidadeId",
    ],
    "PREFERENCIAS": [
        "preferencias",
    ],
    "ANEXOS": [
        "anexos",
    ],
};

export const manifestacaoSchema = z.object({
    /* Dados pessoais */
    tipoDocumento: z.string().min(1, 'Selecione o tipo de documento'),
    numDocumento: z.string().min(1, 'Informe o número do documento'),
    dataEmissao: z.string().min(1, 'Informe a data de emissão'),
    dataValidade: z.string().min(1, 'Informe a data de validade'),
    nif: z.string().length(9, 'O NIF deve conter exatamente 9 dígitos').regex(/^\d+$/, 'O NIF deve conter apenas números'),
    nomeCompleto: z.string().min(1, 'Informe o nome completo'),
    dataNascimento: z.string().min(1, 'Informe a data de nascimento'),
    nomeMae: z.string().min(1, 'Informe o nome da mãe'),
    nomePai: z.string().min(1, 'Informe o nome do pai'),
    sexo: z.string().min(1, 'Selecione o sexo'),
    nacionalidade: z.string().min(1, 'Informe a nacionalidade'),
    paisOrigem: z.string().min(1, 'Informe o país de origem'),

    /* Dados Academico */
    habilitacao: z.string().min(1, 'Selecione a habilitação académica'),
    areaFormacao: z.string().min(1, 'Informe a área de formação'),
    especializacao: z.string().min(1, 'Informe a especialização'),

    /* Contactos */
    email: z.string().min(1, 'Informe o email').email('Informe um email válido'),
    telemovel: z.string().min(7, 'O telemóvel deve ter pelo menos 7 dígitos').regex(/^\d+$/, 'O telemóvel deve conter apenas números'),
    outroContacto: z.string().optional(),

    /* Localização */
    ilha: z.string().min(1, 'Selecione a ilha'),
    concelho: z.string().min(1, 'Selecione o concelho'),
    freguesia: z.string().min(1, 'Selecione o freguesia'),
    zona: z.string().optional(),
    endereco: z.string().optional(),
    concelho_id: z.string().optional(),
    freguesia_id: z.string().optional(),
    zona_id: z.string().optional(),

    possuiCCF: z.string().min(1, 'Selecione se possui BNF'),
    numCCF: z.string().optional(),

    /* Entidade */
    entidadeId: z.string().min(1, "Selecione a entidade"),
    entidadeNome: z.string().optional(),
    entidadeNif: z.string().optional(),
    entidadeContacto: z.string().optional(),
    entidadeEmail: z.string().email("Informe um email válido").optional().or(z.literal("")),

    /* Preferências */
    preferencias: z.array(
        z.object({
            familiaProfissional: z.string().min(1),
            familiaNome: z.string().optional(),

            qualificacao: z.string().min(1),
            qualificacaoNome: z.string().optional(),

            modulo: z.string().optional(),
            moduloNome: z.string().optional(),

            unidadeFormativa: z.string().optional(),
            unidadeNome: z.string().optional(),

            unidadeOrigem: z.string().optional(),
        })
    ).min(1, 'Adicione pelo menos uma preferência'),

    /* UPLOADS */
    foto: fotoSchema,

    anexos: z.array(anexoSchema).optional(),

}).superRefine((data, ctx) => {
    if (data.possuiCCF === "sim" && !data.numCCF) {
        ctx.addIssue({
            path: ["numCCF"],
            code: z.ZodIssueCode.custom,
            message: "Informe o número do CCF",
        });
    }
});

export type ManifestacaoFormData = z.infer<typeof manifestacaoSchema>


/*
export const manifestacaoSchema = z.object({
    tipoDocumento: z.string().optional(),
    numDocumento: z.string().optional(),
    dataEmissao: z.string().optional(),
    dataValidade: z.string().optional(),
    nif: z.string()
        .optional()
        .refine((v) => !v || /^\d{9}$/.test(v), "O NIF deve ter 9 dígitos"),
    nomeCompleto: z.string().optional(),
    dataNascimento: z.string().optional(),
    nomeMae: z.string().optional(),
    nomePai: z.string().optional(),
    sexo: z.string().optional(),
    nacionalidade: z.string().optional(),
    paisOrigem: z.string().optional(),

    habilitacao: z.string().optional(),
    areaFormacao: z.string().optional(),
    especializacao: z.string().optional(),

    email: z.string()
        .optional()
        .refine((v) => !v || /\S+@\S+\.\S+/.test(v), "Informe um email válido"),
    telemovel: z.string()
        .optional()
        .refine((v) => !v || /^\d{7,}$/.test(v), "O telemóvel deve ter pelo menos 7 dígitos"),

    ilha: z.string().optional(),
    concelho: z.string().optional(),
    freguesia: z.string().optional(),

    possuiCCF: z.string().optional(),
    numCCF: z.string().optional(),

    entidadeId: z.string().optional(),

    preferencias: z.array(z.any()).optional(),

    foto: z.union([
        z.instanceof(File)
            .refine((f) => !f || f.size <= 5 * 1024 * 1024, "Máx 5MB"),
        z.string().url().optional(),
    ]).optional(),

    anexos: z.array(
        z.object({
            tipo: z.string().min(1),
            file: z.instanceof(File),
        })
    ).optional(),

}).superRefine((data, ctx) => {
    // Exemplo: só exigir numCCF se possuiCCF="sim" e campo preenchido
    if (data.possuiCCF === "sim" && data.numCCF && data.numCCF.trim() === "") {
        ctx.addIssue({
            path: ["numCCF"],
            code: z.ZodIssueCode.custom,
            message: "Informe o número do CCF",
        });
    }
});
*/
