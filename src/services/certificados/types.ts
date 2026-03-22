export interface GetCertificadosParams {
  pessoaId: number;
}

export interface CertificadoApi {
  nome_formacao: string;
  nome_entidade: string;
  nivel: number;
  nota_final: number;
  data_conclusao: string;
  data_inicio: string;
  carga_horaria: number;
  detalhes: {
    carga_horaria: string;
    cordenador: string;
  };
  detalhes_avaliacao: {
    nivel: string;
    Titulo: string;
  };
  nome_modulo: string;
  link_certificado: string;
  contraprova: string;
  pessoa_id: number;
  app: string;
  coordenador: string;
}
