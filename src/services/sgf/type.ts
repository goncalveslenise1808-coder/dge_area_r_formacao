export interface IGetLocazacaos {
  id: string;
  nome: string;
}

export interface IGetLocazacaosResponse {
  data: IGetLocazacaos[];
  total?: number;
}

export interface IManifestacaoInteresse {
  id?: number;
  pessoaId: number;
  entidadeId: string;
  familiaId: string;
  qualificacaoId: number;
  moduloId?: number;
  moduloOrigem?: string;
  ilhaId?: string;
  concelhoId?: string;
  freguesiaId?: string;
  zonaId?: string;
  disponibilidade?: string[];
  observacoes?: string;
  status?: string;
  dataCreate?: string;
}

export interface IManifestacaoResponse {
  success: boolean;
  message: string;
  data?: IManifestacaoInteresse;
}
