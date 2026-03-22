import {
  ICandidaturaResponse,
  ICandidatura,
  ICursoCandidatura,
  IDocs,
} from "./type";

const isObj = (v: unknown): v is Record<string, unknown> =>
  v !== null && typeof v === "object";
const isArray = (v: unknown): v is unknown[] => Array.isArray(v);

function mapCurso(raw: unknown): ICursoCandidatura {
  const r = isObj(raw) ? raw : {};
  return {
    cursoCandatoId: r.cursoCandatoId as number,
    qualifOfertaId: r.qualifOfertaId as number,
    ordemPreferencia: r.ordemPreferencia as number,
    denominacaoQualif: r.denominacaoQualif as string,
    nomeEntidade: r.nomeEntidade as string,
    statusCandidatoCurso: r.statusCandidatoCurso as string,
    concelho: r.concelho as string,
    dataFim: r.dataFim as string,
    dataInicioCurso: r.dataInicioCurso as string,
    nivel: r.nivel as string,
    cargaHoraria: r.cargaHoraria as string,
    entidadeId: r.entidadeId as number,
    urlLogoEntidade: r.urlLogoEntidade as string,
  };
}

function mapDoc(raw: unknown): IDocs {
  const r = isObj(raw) ? raw : {};
  return {
    path: (r.path as string) ?? "",
    name: (r.name as string) ?? "",
  };
}

function mapCandidatura(raw: unknown): ICandidatura {
  const r = isObj(raw) ? raw : {};
  const cursos = isArray(r.cursos) ? (r.cursos as unknown[]) : [];
  const docs = isArray(r.docs) ? (r.docs as unknown[]) : [];

  return {
    id: r.id as number,
    nome: r.nome as string,
    statusCandidatura: r.statusCandidatura as string,
    statusCandidaturaCode: r.statusCandidaturaCode as string,
    codigoCandidatura: r.codigoCandidatura as string,
    pontuacao: (r.pontuacao as number) ?? null,
    dateCreate: r.dateCreate as string,
    dataFimCandidatura: r.dataFimCandidatura as string,
    cursos: cursos.map(mapCurso),
    docs: docs.map(mapDoc),
  };
}

export function mapperCandidaturaResponse(raw: unknown): ICandidaturaResponse {
  const r = isObj(raw) ? raw : {};

  const activas =
    (isArray(r.activas) ? r.activas : null) ??
    (isArray((r as any).candidaturas_activas)
      ? (r as any).candidaturas_activas
      : []);

  const arquivadas =
    (isArray(r.arquivadas) ? r.arquivadas : null) ??
    (isArray((r as any).candidaturas_arquivadas)
      ? (r as any).candidaturas_arquivadas
      : []);

  return {
    candidaturas_activas: (activas as unknown[]).map(mapCandidatura),
    candidaturas_arquivadas: (arquivadas as unknown[]).map(mapCandidatura),
  };
}
