'use client';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { IDocumentoAnexo, IDominioItem } from "@/services/equivalencia/dominios/type";
import { INacionalidade } from "@/services/equivalencia/dominios";
import {EquivalenciaDadosGerais} from "@/components/templates/equivalencia/pedido/components/EquivalenciaDadosGerais";
import {EquivalenciaExperiencia} from "@/components/templates/equivalencia/pedido/components/EquivalenciaExperiencia";
import {EquivalenciaDocumentos} from "@/components/templates/equivalencia/pedido/components/EquivalenciaDocumentos";
import {EquivalenciaActions} from "@/components/templates/equivalencia/pedido/EquivalenciaActions";
import {
    EquivalenciaCreateContext,
    EquivalenciaProvider
} from "@/components/templates/equivalencia/pedido/context/EquivalenciaContext";
import {CardInfo} from "@/components/organisms/CardInfo/CardInfo";
import {useContext} from "react";
import {IProcessoSend} from "@/services/equivalencia/getEquivalencia/interface/interface-data_pdd_enviado";

export function EquivalenciaTemplate({
     insOptions,
     habilitacoes,
     documentos,
     nacionalidade,
     documentoIdentificacao,
     pedido_feito,
     params
 }: {
    insOptions: IDocumentoAnexo[],
    documentos: IDocumentoAnexo[],
    habilitacoes: IDominioItem[],
    nacionalidade: INacionalidade[],
    documentoIdentificacao: IDominioItem[],
    pedido_feito: IProcessoSend,
    params: { [p: string]: string | string[] | undefined } | undefined
}) {
    const context = useContext(EquivalenciaCreateContext)
    const { user } = context || {}

    const motivoRaw = params?.motivo;

    const showAll = !motivoRaw;

    const motivoString = Array.isArray(motivoRaw) ? motivoRaw.join(",") : motivoRaw;
    const motivos = motivoString?.split(",").map(Number) ?? [];
    const has = (value: number) => motivos.includes(value);

    // regras para desabilitar os componentes
    const disableDadosGerais = !showAll && !has(1);
    const disableExperiencia = !showAll && !has(2);
    const disableDocumentos = !showAll && !(has(3) || has(4));

    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='flex justify-between items-center'
            >
               <div>
                   {showAll ? (
                       <p className="text-3xl font-bold mb-2">
                           Novo Pedido de Equivalência
                       </p>
                   ):(
                       <p className="text-3xl font-bold mb-2">
                           Editar Pedido de Equivalência
                       </p>
                   )}

                   {showAll && (
                       <p className="text-muted-foreground text-lg">
                           Solicita o reconhecimento das tuas qualificações e competências
                       </p>
                   )}
               </div>

                {pedido_feito?.pedidos?.[0] &&
                    !pedido_feito.pedidos[0].podeAlterarSolic && (
                        <div className="flex items-center gap-3 rounded-lg border border-yellow-300 bg-yellow-50 px-3 py-2 text-yellow-800 shadow-sm">
                            <span className="text-lg">⚠️</span>
                            <p className="text-sm leading-relaxed">
                                {pedido_feito.pedidos[0].messagemEstado}
                            </p>
                        </div>
                )}
            </motion.div>

            <EquivalenciaProvider
                user={user}
                insOptions={insOptions ?? []}
                documentos={documentos ?? []}
                nacionalidade={nacionalidade}
                documentoIdentificacao={documentoIdentificacao}
                habilitacoes={habilitacoes}
                params={params}
                pedido_feito={pedido_feito}
            >
                <EquivalenciaDadosGerais disabled={disableDadosGerais} />
                <EquivalenciaExperiencia disabled={disableExperiencia} />
                {documentos?.length > 0 && (
                    <EquivalenciaDocumentos disabled={disableDocumentos} />
                )}

                <EquivalenciaActions/>

            </EquivalenciaProvider>

            <CardInfo
                icon={AlertCircle}
                title={'Informações Importantes'}
                items={[
                    'Todos os documentos devem estar traduzidos para português (se aplicável)',
                    'O processo de análise pode demorar entre 30 a 60 dias úteis',
                    'Documentos em formato digital devem ter boa qualidade e legibilidade',
                    'Após submissão, receberás um número de processo para acompanhamento'
                ]}
            />
        </div>
    );
}