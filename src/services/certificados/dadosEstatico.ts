import {IEquivalencia} from "@/services/equivalencia/certificado/type";

export const equivalenciasMock: IEquivalencia[] = [
    {
        id: 1,
        formacaoOriginal: "Licenciatura em Engenharia Informática",
        entidadeOriginal: "Universidade de Lisboa",
        equivalencia: "Bacharelato em Engenharia Informática",
        nivelQualificacao: "Nível 6",
        url: "https://exemplo.com/equivalencias/eng-info-1.pdf",
        dataEmissao: "2023-09-15",
        entidadeEmissora: "DGES — Direção-Geral do Ensino Superior",
        numeroProcesso: "PROC-2023-001245",
        paisOrigem: "Portugal"
    },
    {
        id: 2,
        formacaoOriginal: "Diploma Avançado em Redes e Telecomunicações",
        entidadeOriginal: "Instituto Politécnico de Angola",
        equivalencia: "Curso Técnico Profissional em Redes",
        nivelQualificacao: "Nível 5",
        url: "https://exemplo.com/equivalencias/redes-2022.pdf",
        dataEmissao: "2022-11-02",
        entidadeEmissora: "Direção Nacional de Educação Técnica",
        numeroProcesso: "PROC-2022-008921",
        paisOrigem: "Angola"
    },
    {
        id: 3,
        formacaoOriginal: "Curso Técnico em Farmácia",
        entidadeOriginal: "Centro de Formação Brasil",
        equivalencia: "Técnico de Farmácia",
        nivelQualificacao: "Nível 4",
        url: "https://exemplo.com/equivalencias/farmacia-2021.pdf",
        dataEmissao: "2021-05-28",
        entidadeEmissora: "Ministério da Saúde",
        numeroProcesso: "PROC-2021-004312",
        paisOrigem: "Brasil"
    },
    {
        id: 4,
        formacaoOriginal: "Master em Gestão de Projetos",
        entidadeOriginal: "Universidad de Madrid",
        equivalencia: "Pós-graduação em Gestão de Projetos",
        nivelQualificacao: "Nível 7",
        url: "https://exemplo.com/equivalencias/gestao-projetos-2020.pdf",
        dataEmissao: "2020-12-10",
        entidadeEmissora: "Conselho Nacional de Educação",
        numeroProcesso: "PROC-2020-003891",
        paisOrigem: "Espanha"
    },
    {
        id: 5,
        formacaoOriginal: "Bacharel em Administração",
        entidadeOriginal: "Universidade Federal do Rio de Janeiro",
        equivalencia: "Licenciatura em Administração",
        nivelQualificacao: "Nível 6",
        url: "https://exemplo.com/equivalencias/administracao-2019.pdf",
        dataEmissao: "2019-07-06",
        entidadeEmissora: "DGES",
        numeroProcesso: "PROC-2019-002176",
        paisOrigem: "Brasil"
    }
];
