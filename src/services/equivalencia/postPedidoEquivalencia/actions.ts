'use server';
import {
    postPedidoEquivalencia,
    updatetPedidoEquivalencia
} from '@/services/equivalencia/postPedidoEquivalencia';
import {IPedido} from "@/services/equivalencia/getEquivalencia/interface/interface-data_pdd_enviado";

const campoNomes: Record<string, string> = {
    'requerente.nome': 'Nome',
    'requerente.docNumero': 'Número do Documento',
    'requerente.email': 'Email',
    'requerente.nif': 'NIF',
    'requerente.dataEmissaoDoc': 'Data Emissão Doc',
    'requerente.dataValidadeDoc': 'Data Validade Doc',
    'requerente.dataNascimento': 'Data Nascimento',
    'requerente.nacionalidade': 'Nacionalidade',
    'requerente.sexo': 'Sexo',
    'requerente.contato': 'Contato',
    'requerente.habilitacao': 'Habilitação',
    'requerente.docIdentificacao': 'Tipo Documento',
    'pedidos[0].formacaoProf': 'Formação Profissional',
    'pedidos[0].carga': 'Carga Horária',
    'pedidos[0].anoInicio': 'Ano Início',
    'pedidos[0].anoFim': 'Ano Conclusão',
    'pedidos[0].instEnsino.nome': 'Instituição de Ensino',
    'pedidos[0].instEnsino.id': 'Instituição de Ensino',
    'pedidos[0].instEnsino.pais': 'País da Instituição',
    'pedidos[0].documentos[0].idTpDoc': 'Tipo Documento Anexo',
    'pedidos[0].documentos[0].nome': 'Nome Documento Anexo',
    'pedidos[0].documentos[0].file': 'Arquivo Documento'
};

function validarPayload(payload: any) {
    const ignorar = ['pedidos[0].numDeclaracao'];
    const obrigatorios = Object.keys(campoNomes).filter(k => !ignorar.includes(k));

    const anoAtual = new Date().getFullYear();

    for (const key of obrigatorios) {
        // Validação especial para Instituição
        if (key === 'pedidos[0].instEnsino.nome' || key === 'pedidos[0].instEnsino.id') {
            const id = payload['pedidos[0].instEnsino.id'];
            const nome = payload['pedidos[0].instEnsino.nome'];
            if (!id && !nome) throw new Error('Campo Instituição de Ensino não preenchido');
            continue;
        }

        // Validação específica para Ano de Conclusão
        if (key === 'pedidos[0].anoFim') {
            const anoFim = Number(payload[key]);
            if (!anoFim) throw new Error(`Lamentamos, mas não é possível solicitar a equivalência enquanto o curso não estiver concluído. `);
            if (anoFim > anoAtual) throw new Error(`Ano de Conclusão não pode ser maior que ${anoAtual}`);
            continue;
        }

        // Validação padrão para outros campos obrigatórios
        if (!payload[key]) {
            throw new Error(`Campo ${campoNomes[key]} não preenchido`);
        }
    }
}


export async function enviarPedidoAction(
    payload: any,
    numeroProcesso?: string,
    processo?: IPedido
) {
    try {
        const isUpdate = Boolean(numeroProcesso);

        if (isUpdate) {
            if (processo?.podeAlterarSolic === true) {
                try {
                    validarPayload(payload);
                    const response = await updatetPedidoEquivalencia(
                        payload,
                        numeroProcesso!.toString()
                    );

                    return {
                        ok: response.ok ?? false,
                        data: response.data ?? response,
                        message: response.message,
                        operation: "PUT"
                    };
                } catch (err: any) {
                    return { ok: false, message: err.message };
                }
            }

            return {
                ok: false,
                message: processo?.messagemEstado ?? 'Este processo não pode ser alterado'
            };
        }

        validarPayload(payload);

        const response = await postPedidoEquivalencia(payload);

        return {
            ok: response.ok ?? false,
            data: response.data ?? response,
            message: response.message,
            operation: "POST"
        };

    } catch (err: any) {
        return { ok: false, message: err.message };
    }
}
