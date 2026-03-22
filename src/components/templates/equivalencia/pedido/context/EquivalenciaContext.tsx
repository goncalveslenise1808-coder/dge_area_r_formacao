'use client';
import {createContext, useEffect, useMemo, useState, useTransition} from "react";
import {IDocumentoAnexo, IDominioItem} from "@/services/equivalencia/dominios/type";
import {INacionalidade} from "@/services/equivalencia/dominios";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {enviarPedidoAction} from "@/services/equivalencia/postPedidoEquivalencia/actions";
import {IProcesso} from "@/services/equivalencia/getEquivalencia/interface/type";
import {IProcessoSend} from "@/services/equivalencia/getEquivalencia/interface/interface-data_pdd_enviado";
import {getPedidoEnviadoForProcesso} from "@/services/equivalencia/getEquivalencia";

interface EquivalenciaProps {
    user?: any;
    insOptions?: IDocumentoAnexo[];
    documentos?: IDocumentoAnexo[];
    habilitacoes?: IDominioItem[];
    nacionalidade?: INacionalidade[];
    documentoIdentificacao?: IDominioItem[];
    children: React.ReactNode;
    data?: IProcesso[],
    pedido_feito?: IProcessoSend,
    params?: { [p: string]: string | string[] | undefined } | undefined,
    reclamacao?: IProcessoSend | undefined
}

type EquivalenciaContextProps = Omit<EquivalenciaProps, "children"> & {
    formData: Record<string, string | File>;
    setFormData: React.Dispatch<React.SetStateAction<Record<string, string | File>>>;
    indicesPedidos: number[];
    isLoading: boolean;
    handleSubmitPedido: (n_processo?: string) => void;
    handleChange: (e: { target: { name: string; value: any } }) => void;
    selectedPedido: any,
    setSelectedPedido?: (pedido: any) => void,
};

export const EquivalenciaCreateContext = createContext<EquivalenciaContextProps | null>(null);

export function EquivalenciaProvider(props: EquivalenciaProps) {

    const {
        user,
        insOptions,
        documentos,
        habilitacoes,
        nacionalidade,
        documentoIdentificacao,
        children,
        data,
        params,
        pedido_feito
    } = props

    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const initialFormData: Record<string, any> = {
        pessoaId: user?.pessoa_info?.id,

        "requerente.nome": "",
        "requerente.docNumero": "",
        "requerente.email": "",
        "requerente.nif": "",
        "requerente.dataEmissaoDoc": "",
        "requerente.dataValidadeDoc": "",
        "requerente.dataNascimento": "",
        "requerente.nacionalidade": "",
        "requerente.sexo": "",
        "requerente.contato": "",
        "requerente.habilitacao": "",
        "requerente.docIdentificacao": "",

        "pedidos[0].formacaoProf": "",
        "pedidos[0].carga": "",
        "pedidos[0].numDeclaracao": "",
        "pedidos[0].anoInicio": "",
        "pedidos[0].anoFim": "",
        "pedidos[0].instEnsino.nome": "",
        "pedidos[0].instEnsino.id": "",
        "pedidos[0].instEnsino.pais": "",
        "pedidos[0].documentos[0].idTpDoc": "",
        "pedidos[0].documentos[0].nome": "",
        "pedidos[0].documentos[0].file": "",
    };
    const [formData, setFormData] = useState<Record<string, string | File>>(initialFormData);
    const [selectedPedido, setSelectedPedido] = useState(data?.[0]);
    const [reclamacao, setReclamacao] = useState<IProcessoSend>();

    useEffect(() => {
        async function fetchPedido() {
            const pdd = await getPedidoEnviadoForProcesso({numero: selectedPedido?.numero || ""}).catch(() => ({} as any))
            setReclamacao(pdd)
        }

        fetchPedido();
    }, [selectedPedido?.numero]);

    useEffect(() => {
        if (!user?.pessoa_info) return;

        const initialData = {
            'requerente.docIdentificacao': user.pessoa_info.tipo_documento || '',
            'requerente.docNumero': user.pessoa_info.num_documento || '',
            'requerente.nif': user.pessoa_info.nif || '',
            'requerente.dataEmissaoDoc': user.pessoa_info.dt_emissao || '',
            'requerente.dataValidadeDoc': user.pessoa_info.dt_validade || '',
            'requerente.nome': user.pessoa_info.nome || '',
            'requerente.dataNascimento': user.pessoa_info.data_nasc || '',
            'requerente.nacionalidade': user.pessoa_info.nacionalidade_id || '',
            'requerente.sexo': user.pessoa_info.sexo || '',
            'requerente.email': user.pessoa_info.email || pedido_feito?.email || '',
            'requerente.habilitacao': formData?.['requerente.habilitacao'] || pedido_feito?.habilitacao?.toString() || '',
            'requerente.contato': user.pessoa_info.telefone || '',
        };

        setFormData(prev => ({...prev, ...initialData}));
    }, [user]);

    useEffect(() => {
        if (!pedido_feito || !pedido_feito.pedidos || !setFormData) return;

        const loadedData: Record<string, any> = {};

        pedido_feito.pedidos.forEach((pedido, pedidoIndex) => {
            pedido.documentos?.forEach((doc, docIndex) => {
                loadedData[`pedidos[${pedidoIndex}].documentos[${docIndex}].idTpDoc`] = String(doc.idTpDoc);
                loadedData[`pedidos[${pedidoIndex}].documentos[${docIndex}].nome`] = doc.fileName;
                loadedData[`pedidos[${pedidoIndex}].documentos[${docIndex}].preview`] = doc.previewUrl;
                loadedData[`pedidos[${pedidoIndex}].documentos[${docIndex}].fileName`] = doc.fileName;

                loadedData[`pedidos[${pedidoIndex}].documentos[${docIndex}].file`] = "__EXISTING_FILE__";
            });
        });

        setFormData(prev => ({...prev, ...loadedData}));
    }, [pedido_feito]);

    const handleChange = (event: { target: { name: string; value: any } }) => {
        const {name, value} = event.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const indicesPedidos = useMemo(() => {
        return Array.from(new Set(
            Object.keys(formData)
                .map(key => key.match(/pedidos\[(\d+)\]/)?.[1])
                .filter(Boolean)
                .map(Number)
        )).sort((a, b) => a - b);
    }, [formData]);

    const handleSubmitPedido = (n_processo?: string) => {

        for (const pedidoIndex of indicesPedidos) {
            for (const doc of documentos || []) {
                if (doc.obrigatorio) {
                    const index = documentos?.findIndex(d => d.valor === doc.valor);
                    if (!formData[`pedidos[${pedidoIndex}].documentos[${index}].file`]) {
                        console.log("⚠️ Documento obrigatório não anexado", doc);
                        toast.error(`Falta anexar o documento obrigatório: ${doc.descricao}`);
                        return;
                    }
                }
            }
        }

        startTransition(async () => {
            try {
                //pedido_feito tera saida e mensagem para substituir processo...
                const res = await enviarPedidoAction({...formData}, n_processo, pedido_feito?.pedidos[0]);

                if (!res.ok) {
                    toast.error(res.message);
                    return;
                }

                if (res.operation === "POST") {
                    if (res.ok) {
                        toast.success("Pedido submetido com sucesso.", {
                            duration: 2000,
                        });
                        router.refresh();
                    }
                } else if (res.operation === "PUT") {
                    if (res.ok) {
                        toast.success("Pedido atualizado com sucesso.", {
                            duration: 2000,
                        });
                        router.refresh();
                    }
                }

                setFormData(initialFormData);
                router.refresh?.();

            } catch (err: any) {
                toast.error(err.message || "Erro desconhecido.");
            }
        });
    };

    const value: EquivalenciaContextProps = {
        user,
        params,
        insOptions,
        documentos,
        habilitacoes,
        pedido_feito,
        nacionalidade,
        documentoIdentificacao,
        formData,
        setFormData,
        indicesPedidos,
        isLoading: isPending,
        handleSubmitPedido,
        handleChange,
        data,
        reclamacao,
        selectedPedido,
        setSelectedPedido,
    };

    return (
        <EquivalenciaCreateContext.Provider
            value={value}
        >
            {children}
        </EquivalenciaCreateContext.Provider>
    );
}
