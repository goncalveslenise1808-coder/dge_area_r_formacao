/**
 * Mock Data - Dados estáticos para desenvolvimento
 * Este ficheiro contém dados mock para todas as APIs do projeto
 */

import { IPessoaInfo, IMyAccountResponse } from "@/services/profiles/type";
import { IProfileResponse } from "@/services/profiles/getProfilesByUserAndAppCode/types";
import { IDominioItem, IDocumentoAnexo } from "@/services/equivalencia/dominios/type";
import { Entidade } from "@/services/entidade/type";
import { Familia, Qualificacao, Modulo, Unidade, FormacaoResponse } from "@/services/preferencias/type";
import { IProcesso } from "@/services/equivalencia/getEquivalencia/interface/type";
import { IAusenciaList, MotivoFalta } from "@/services/ausencias/getListAusencia/type";

// ============================================
// MOCK USER DATA
// ============================================
export const mockPessoaInfo: IPessoaInfo = {
  id: 1001,
  num_documento: "123456789",
  tipo_documento: "BI",
  nome: "Maria da Luz Santos",
  data_nasc: "1995-06-15",
  nome_mae: "Ana Santos",
  nome_pai: "José Santos",
  dt_validade: "2028-06-15",
  dt_emissao: "2020-06-15",
  estado_civil: "S",
  estado_civil_desc: "Solteiro(a)",
  sexo: "F",
  sexo_desc: "Feminino",
  nif: "987654321",
  nacionalidade_id: "CV",
  nacionalidade: "Cabo-verdiana",
  naturalidade_id: "1",
  naturalidade: "Praia",
  concelho_id: "1",
  concelho: "Praia",
  ilha: "Santiago",
  pais: "Cabo Verde",
  localidade: "Achada Santo António",
  bairro: "Terra Branca",
  email: "maria.santos@email.cv",
  telefone: "+238 991 23 45",
  foto: "",
  ilha_id: "1",
  freguesia_id: "1",
  freguesia: "Nossa Senhora da Graça",
  localidade_id: "1",
  csu_nia: "CSU123456789",
  csu_nivel: "A"
};

export const mockMyAccount: IMyAccountResponse = {
  user: {
    user_id: 1,
    status: "active",
    session_token: "mock-session-token-12345",
    email: "maria.santos@email.cv",
    sub_cmdcv: null,
    name: "Maria da Luz Santos",
    pessoa_info: mockPessoaInfo,
    contacts: [
      { tipo: "email", valor: "maria.santos@email.cv" },
      { tipo: "telefone", valor: "+238 991 23 45" }
    ],
    info_school: null
  },
  provider: "local",
  session_token: "mock-session-token-12345",
  pessoa_info: mockPessoaInfo
};

export const mockProfileResponse: IProfileResponse = {
  app_name: "Formação",
  app_code: "FORMACAO",
  accesses: [
    {
      userinfo: {
        id: 1,
        email: "maria.santos@email.cv",
        name: "Maria da Luz Santos",
        pessoa_id: 1001
      },
      entityinfo: null,
      profile_info: {
        id: 1,
        code: "formador",
        name: "Formador",
        description: "Perfil de Formador"
      }
    },
    {
      userinfo: {
        id: 1,
        email: "maria.santos@email.cv",
        name: "Maria da Luz Santos",
        pessoa_id: 1001
      },
      entityinfo: null,
      profile_info: {
        id: 2,
        code: "jovem",
        name: "Jovem",
        description: "Perfil de Jovem em Formação"
      }
    }
  ]
};

// ============================================
// MOCK DOMINIOS DATA
// ============================================
export const mockTipoDocumentoIdent: IDominioItem[] = [
  { value: "BI", label: "Bilhete de Identidade" },
  { value: "PASSPORT", label: "Passaporte" },
  { value: "CNI", label: "Cartão Nacional de Identificação" },
  { value: "RP", label: "Residência Permanente" }
];

export const mockTipoDocumentoForm: IDominioItem[] = [
  { value: "CERTIFICADO", label: "Certificado" },
  { value: "DIPLOMA", label: "Diploma" },
  { value: "DECLARACAO", label: "Declaração" },
  { value: "HISTORICO", label: "Histórico Escolar" }
];

export const mockGenero: IDominioItem[] = [
  { value: "M", label: "Masculino" },
  { value: "F", label: "Feminino" }
];

export const mockSimNao: IDominioItem[] = [
  { value: "S", label: "Sim" },
  { value: "N", label: "Não" }
];

export const mockGrauAcademico: IDominioItem[] = [
  { value: "BASICO", label: "Ensino Básico" },
  { value: "SECUNDARIO", label: "Ensino Secundário" },
  { value: "LICENCIATURA", label: "Licenciatura" },
  { value: "MESTRADO", label: "Mestrado" },
  { value: "DOUTORAMENTO", label: "Doutoramento" },
  { value: "TECNICO", label: "Curso Técnico" }
];

export const mockDocumentosAnexo: IDocumentoAnexo[] = [
  { descricao: "Documento de Identificação", obrigatorio: true, valor: 1 },
  { descricao: "Certificado de Habilitações", obrigatorio: true, valor: 2 },
  { descricao: "Curriculum Vitae", obrigatorio: true, valor: 3 },
  { descricao: "Foto tipo passe", obrigatorio: false, valor: 4 },
  { descricao: "Comprovativo de Morada", obrigatorio: false, valor: 5 }
];

// ============================================
// MOCK NACIONALIDADES DATA
// ============================================
export const mockNacionalidades = [
  { DESCRICAO: "Cabo-verdiana", VALOR: "CV" },
  { DESCRICAO: "Portuguesa", VALOR: "PT" },
  { DESCRICAO: "Brasileira", VALOR: "BR" },
  { DESCRICAO: "Angolana", VALOR: "AO" },
  { DESCRICAO: "Moçambicana", VALOR: "MZ" },
  { DESCRICAO: "Guineense", VALOR: "GW" },
  { DESCRICAO: "São-tomense", VALOR: "ST" },
  { DESCRICAO: "Timorense", VALOR: "TL" }
];

// ============================================
// MOCK ENTIDADES FORMADORAS
// ============================================
export const mockEntidadeFormadoras: Entidade[] = [
  {
    id: "1",
    nome: "Instituto Superior de Engenharia e Ciências do Mar",
    nif: "123456789",
    telefone: "+238 261 00 00",
    email: "info@isecmar.cv",
    orgId: 1,
    ilhaId: "1",
    concelhoId: "1",
    ilha: "São Vicente",
    concelho: "São Vicente",
    urlLogoEntidade: null,
    websiteEntidade: "https://isecmar.cv",
    status: "ATIVO",
    dm_natureza: "PUBLICA"
  },
  {
    id: "2",
    nome: "Universidade de Cabo Verde",
    nif: "987654321",
    telefone: "+238 260 00 00",
    email: "info@unicv.cv",
    orgId: 2,
    ilhaId: "2",
    concelhoId: "2",
    ilha: "Santiago",
    concelho: "Praia",
    urlLogoEntidade: null,
    websiteEntidade: "https://unicv.cv",
    status: "ATIVO",
    dm_natureza: "PUBLICA"
  },
  {
    id: "3",
    nome: "Centro de Formação Profissional da Praia",
    nif: "456789123",
    telefone: "+238 262 00 00",
    email: "cfp.praia@gov.cv",
    orgId: 3,
    ilhaId: "2",
    concelhoId: "2",
    ilha: "Santiago",
    concelho: "Praia",
    urlLogoEntidade: null,
    websiteEntidade: "https://cfp-praia.cv",
    status: "ATIVO",
    dm_natureza: "PUBLICA"
  },
  {
    id: "4",
    nome: "Instituto Pedagógico de Cabo Verde",
    nif: "789123456",
    telefone: "+238 263 00 00",
    email: "ip@gov.cv",
    orgId: 4,
    ilhaId: "2",
    concelhoId: "2",
    ilha: "Santiago",
    concelho: "Praia",
    urlLogoEntidade: null,
    websiteEntidade: "https://ip.cv",
    status: "ATIVO",
    dm_natureza: "PUBLICA"
  }
];

// ============================================
// MOCK GEOGRAFIA DATA
// ============================================
export interface IGetLocazacaos {
  id: string;
  nome: string;
}

export const mockIlhas: IGetLocazacaos[] = [
  { id: "1", nome: "Santiago" },
  { id: "2", nome: "São Vicente" },
  { id: "3", nome: "Santo Antão" },
  { id: "4", nome: "Fogo" },
  { id: "5", nome: "Sal" },
  { id: "6", nome: "Boa Vista" },
  { id: "7", nome: "Maio" },
  { id: "8", nome: "São Nicolau" },
  { id: "9", nome: "Brava" }
];

export const mockConcelhos: Record<string, IGetLocazacaos[]> = {
  "1": [ // Santiago
    { id: "1", nome: "Praia" },
    { id: "2", nome: "Santa Catarina" },
    { id: "3", nome: "Tarrafal" },
    { id: "4", nome: "São Domingos" },
    { id: "5", nome: "Santa Cruz" },
    { id: "6", nome: "São Miguel" },
    { id: "7", nome: "São Lourenço dos Órgãos" },
    { id: "8", nome: "São Salvador do Mundo" },
    { id: "9", nome: "Ribeira Grande de Santiago" }
  ],
  "2": [ // São Vicente
    { id: "10", nome: "São Vicente" }
  ],
  "3": [ // Santo Antão
    { id: "11", nome: "Paul" },
    { id: "12", nome: "Porto Novo" },
    { id: "13", nome: "Ribeira Grande" }
  ],
  "4": [ // Fogo
    { id: "14", nome: "São Filipe" },
    { id: "15", nome: "Mosteiros" },
    { id: "16", nome: "Santa Catarina do Fogo" }
  ],
  "5": [ // Sal
    { id: "17", nome: "Sal" }
  ],
  "6": [ // Boa Vista
    { id: "18", nome: "Boa Vista" }
  ],
  "7": [ // Maio
    { id: "19", nome: "Maio" }
  ],
  "8": [ // São Nicolau
    { id: "20", nome: "Ribeira Brava" },
    { id: "21", nome: "Tarrafal de São Nicolau" }
  ],
  "9": [ // Brava
    { id: "22", nome: "Brava" }
  ]
};

export const mockFreguesias: Record<string, IGetLocazacaos[]> = {
  "1": [ // Praia
    { id: "1", nome: "Nossa Senhora da Graça" },
    { id: "2", nome: "Santíssimo Nome de Jesus" },
    { id: "3", nome: "São João Baptista" }
  ],
  "10": [ // São Vicente
    { id: "4", nome: "Nossa Senhora da Luz" }
  ]
};

export const mockZonas: Record<string, IGetLocazacaos[]> = {
  "1": [
    { id: "1", nome: "Achada Santo António" },
    { id: "2", nome: "Palmarejo" },
    { id: "3", nome: "Terra Branca" },
    { id: "4", nome: "Plateau" },
    { id: "5", nome: "Prainha" }
  ],
  "4": [
    { id: "6", nome: "Mindelo Centro" },
    { id: "7", nome: "Monte Sossego" },
    { id: "8", nome: "Cruz João Évora" }
  ]
};

// ============================================
// MOCK PREFERENCIAS / FORMACOES DATA
// ============================================
export const mockFamilias: Familia[] = [
  { familiaId: "1", denominacaoFamilia: "Informática e Tecnologias", codigoFamilia: "IT" },
  { familiaId: "2", denominacaoFamilia: "Hotelaria e Turismo", codigoFamilia: "HT" },
  { familiaId: "3", denominacaoFamilia: "Saúde", codigoFamilia: "SA" },
  { familiaId: "4", denominacaoFamilia: "Construção Civil", codigoFamilia: "CC" },
  { familiaId: "5", denominacaoFamilia: "Administração e Gestão", codigoFamilia: "AG" },
  { familiaId: "6", denominacaoFamilia: "Agricultura e Pescas", codigoFamilia: "AP" }
];

export const mockQualificacoes: Qualificacao[] = [
  { id: 1, denominacao: "Técnico de Informática" },
  { id: 2, denominacao: "Técnico de Redes e Sistemas" },
  { id: 3, denominacao: "Programador de Aplicações" },
  { id: 4, denominacao: "Técnico de Hotelaria" },
  { id: 5, denominacao: "Auxiliar de Saúde" },
  { id: 6, denominacao: "Técnico de Construção Civil" }
];

export const mockModulos: Modulo[] = [
  { id: 1, label: "Fundamentos de Programação", origem: "NACIONAL" },
  { id: 2, label: "Base de Dados", origem: "NACIONAL" },
  { id: 3, label: "Redes de Computadores", origem: "NACIONAL" },
  { id: 4, label: "Desenvolvimento Web", origem: "NACIONAL" },
  { id: 5, label: "Segurança Informática", origem: "NACIONAL" },
  { id: 6, label: "Gestão de Projetos", origem: "COMPLEMENTAR" }
];

export const mockUnidades: Unidade[] = [
  { id: 1, label: "Introdução à Programação", origem: "NACIONAL" },
  { id: 2, label: "Algoritmos e Estruturas de Dados", origem: "NACIONAL" },
  { id: 3, label: "Linguagem SQL", origem: "NACIONAL" },
  { id: 4, label: "HTML e CSS", origem: "NACIONAL" },
  { id: 5, label: "JavaScript Básico", origem: "COMPLEMENTAR" }
];

export const mockFormacaoResponse: FormacaoResponse = {
  familias: mockFamilias,
  qualificacoes: mockQualificacoes,
  modulos: mockModulos,
  unidades: mockUnidades,
  selecionadas: {
    entidadeId: 1,
    codigoFamilia: "IT",
    qualificacaoId: 1,
    moduloId: 1,
    moduloOrigem: "NACIONAL"
  }
};

// ============================================
// MOCK PROCESSOS / EQUIVALENCIA DATA
// ============================================
export const mockProcessos: IProcesso[] = [
  {
    id: 1,
    numero: "PROC-2024-001",
    app_dad: "sgf",
    pessoa_id: 1001,
    entidade_nif: null,
    tipo: "MANIFESTACAO",
    titulo: "Manifestação de Interesse - Informática",
    descricao: "Manifestação de interesse para formação em Técnico de Informática",
    entidade: "Centro de Formação Profissional da Praia",
    percentagem: 75,
    data_inicio: "2024-01-15",
    data_fim: "",
    data_fim_previsto: "2024-06-15",
    etapa_atual: "Em Análise",
    estado: "ANDAMENTO",
    estado_desc: "Em Andamento",
    detalhes: {
      "Área": "Informática e Tecnologias",
      "Qualificação": "Técnico de Informática",
      "Entidade": "Centro de Formação Profissional da Praia"
    },
    eventos: [
      {
        titulo: "Submissão do Pedido",
        descricao: "Pedido submetido com sucesso",
        data: "2024-01-15",
        items: {
          estado: "Concluído",
          "Link Pag Online": ""
        }
      },
      {
        titulo: "Análise Documental",
        descricao: "Documentação em análise",
        data: "2024-01-20",
        items: {
          estado: "Em Andamento",
          "Link Pag Online": ""
        }
      }
    ],
    anexos: [
      {
        titulo: "Documento de Identificação",
        datetime: "2024-01-15",
        url: "#",
        input: true
      },
      {
        titulo: "Certificado de Habilitações",
        datetime: "2024-01-15",
        url: "#",
        input: true
      }
    ],
    comunicacoes: [
      {
        titulo: "Confirmação de Receção",
        datetime: "2024-01-15",
        descricao: "O seu pedido foi recebido e está em análise."
      }
    ]
  },
  {
    id: 2,
    numero: "PROC-2024-002",
    app_dad: "equiv",
    pessoa_id: 1001,
    entidade_nif: null,
    tipo: "EQUIVALENCIA",
    titulo: "Pedido de Equivalência - Licenciatura",
    descricao: "Pedido de equivalência de diploma de Licenciatura em Engenharia Informática",
    entidade: "Ministério da Educação",
    percentagem: 50,
    data_inicio: "2024-02-01",
    data_fim: "",
    data_fim_previsto: "2024-08-01",
    etapa_atual: "Aguardando Documentos",
    estado: "PENDENTE",
    estado_desc: "Pendente",
    detalhes: {
      "Grau": "Licenciatura",
      "Curso": "Engenharia Informática",
      "Instituição": "Universidade de Lisboa"
    },
    eventos: [
      {
        titulo: "Submissão do Pedido",
        descricao: "Pedido de equivalência submetido",
        data: "2024-02-01",
        items: {
          estado: "Concluído",
          "Link Pag Online": ""
        }
      }
    ],
    anexos: [],
    comunicacoes: []
  },
  {
    id: 3,
    numero: "PROC-2023-045",
    app_dad: "sgf",
    pessoa_id: 1001,
    entidade_nif: null,
    tipo: "FORMACAO",
    titulo: "Formação em Desenvolvimento Web",
    descricao: "Formação concluída em Desenvolvimento Web Full Stack",
    entidade: "Instituto Superior de Engenharia e Ciências do Mar",
    percentagem: 100,
    data_inicio: "2023-06-01",
    data_fim: "2023-12-15",
    data_fim_previsto: "2023-12-15",
    etapa_atual: "Concluído",
    estado: "CONCLUIDO",
    estado_desc: "Concluído",
    detalhes: {
      "Área": "Informática e Tecnologias",
      "Carga Horária": "400 horas",
      "Classificação": "Muito Bom"
    },
    eventos: [
      {
        titulo: "Início da Formação",
        descricao: "Formação iniciada",
        data: "2023-06-01",
        items: {
          estado: "Concluído",
          "Link Pag Online": ""
        }
      },
      {
        titulo: "Conclusão da Formação",
        descricao: "Formação concluída com sucesso",
        data: "2023-12-15",
        items: {
          estado: "Concluído",
          "Link Pag Online": ""
        }
      }
    ],
    anexos: [
      {
        titulo: "Certificado de Conclusão",
        datetime: "2023-12-20",
        url: "#",
        input: false
      }
    ],
    comunicacoes: [
      {
        titulo: "Certificado Emitido",
        datetime: "2023-12-20",
        descricao: "O seu certificado de conclusão foi emitido."
      }
    ]
  }
];

// ============================================
// MOCK AUSENCIAS DATA
// ============================================
export const mockAusencias: IAusenciaList = {
  content: [
    {
      ausenciaId: 1,
      data: "2024-03-10",
      tipoSessao: "Teórica",
      numeroSessao: "S001",
      modulo: "Fundamentos de Programação",
      unidadeFormacao: "Introdução à Programação",
      justificacaoAusencia: {
        motivo: null,
        estado: "PENDENTE",
        observacoes: "",
        linkAnexo: null
      }
    },
    {
      ausenciaId: 2,
      data: "2024-03-15",
      tipoSessao: "Prática",
      numeroSessao: "S002",
      modulo: "Base de Dados",
      unidadeFormacao: "Linguagem SQL",
      justificacaoAusencia: {
        motivo: "DOENCA",
        estado: "JUSTIFICADA",
        observacoes: "Apresentou atestado médico",
        linkAnexo: "#"
      }
    }
  ],
  total: 2,
  page: 1,
  pageSize: 10
};

export const mockMotivosFalta: MotivoFalta[] = [
  { codigo: "DOENCA", descricao: "Doença" },
  { codigo: "FAMILIAR", descricao: "Motivo Familiar" },
  { codigo: "TRABALHO", descricao: "Compromisso de Trabalho" },
  { codigo: "TRANSPORTE", descricao: "Problema de Transporte" },
  { codigo: "OUTRO", descricao: "Outro Motivo" }
];

// ============================================
// MOCK NOTIFICATIONS DATA
// ============================================
export interface IAlertaEmail {
  id: number;
  mensagem: string;
  assunto: string;
  email: string;
  estado: string;
  dataRegisto: string;
  dataEnvio: string;
  appCode: string | null;
  flagLeitura: "SIM" | "NAO";
  statusNotificacao?: "ATIVA" | "ARQUIVADA";
  tipo: string;
  de: string;
  idAplicacao: number | null;
  emailsEnviados: string;
  tipoProcesso: string;
}

export interface IAlertasResponse {
  arquivadas: IAlertaEmail[];
  ativas: IAlertaEmail[];
}

export const mockNotificacoes: IAlertasResponse = {
  ativas: [
    {
      id: 1,
      mensagem: "O seu pedido de manifestação de interesse foi recebido e está em análise.",
      assunto: "Manifestação de Interesse - Confirmação",
      email: "maria.santos@email.cv",
      estado: "ENVIADO",
      dataRegisto: "2024-03-15T10:30:00",
      dataEnvio: "2024-03-15T10:30:00",
      appCode: "SGF",
      flagLeitura: "NAO",
      statusNotificacao: "ATIVA",
      tipo: "INFO",
      de: "Sistema SGF",
      idAplicacao: 1,
      emailsEnviados: "maria.santos@email.cv",
      tipoProcesso: "MANIFESTACAO"
    },
    {
      id: 2,
      mensagem: "Foi solicitado um documento adicional para o seu processo de equivalência.",
      assunto: "Documentação Pendente",
      email: "maria.santos@email.cv",
      estado: "ENVIADO",
      dataRegisto: "2024-03-14T14:00:00",
      dataEnvio: "2024-03-14T14:00:00",
      appCode: "EQUIV",
      flagLeitura: "NAO",
      statusNotificacao: "ATIVA",
      tipo: "ALERTA",
      de: "Sistema de Equivalências",
      idAplicacao: 2,
      emailsEnviados: "maria.santos@email.cv",
      tipoProcesso: "EQUIVALENCIA"
    }
  ],
  arquivadas: [
    {
      id: 3,
      mensagem: "Bem-vindo ao Sistema de Gestão de Formação. A sua conta foi ativada com sucesso.",
      assunto: "Conta Ativada",
      email: "maria.santos@email.cv",
      estado: "ENVIADO",
      dataRegisto: "2024-01-10T09:00:00",
      dataEnvio: "2024-01-10T09:00:00",
      appCode: "SGF",
      flagLeitura: "SIM",
      statusNotificacao: "ARQUIVADA",
      tipo: "INFO",
      de: "Sistema SGF",
      idAplicacao: 1,
      emailsEnviados: "maria.santos@email.cv",
      tipoProcesso: "GERAL"
    }
  ]
};

// ============================================
// FLAG PARA USAR DADOS MOCK
// ============================================
export const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true" || 
                              process.env.NODE_ENV === "development";
