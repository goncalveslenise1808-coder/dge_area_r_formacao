import {formatarData} from "@/lib/utils";
import React from "react";
import {Download, ExternalLink, Upload} from "lucide-react";
import {etapaStatusConfig} from "@/components/templates/equivalencia/acompanhamento";
import {Button} from "@/components/atoms/button";

interface HistoricoItem {
    titulo?: string;
    descricao?: string;
    eventos?: any[];
    data?: string;
    datetime?: string;
    input?: boolean;
    url?: string;

    [key: string]: any;
}

interface Props {
    item: HistoricoItem;
    idx: number;
    tipo: keyof typeof etapaStatusConfig;
}

export function RenderHistoricoItem({item, idx, tipo}: Props) {

    const etapaConfig = etapaStatusConfig[tipo];
    if (!etapaConfig) return null;

    const dataFormatada = formatarData(item.data) || formatarData(item.datetime);

    const isAnexo = tipo === "anexos";

    const anexoConfig = isAnexo ? item.input ? {
        color: "text-blue-600",
        bgColor: "bg-blue-100",
        label: "Documento de Entrada",
        icon: Download,
    } : {
        color: "text-green-600",
        bgColor: "bg-blue-100",
        label: "Documento de Saída",
        icon: Upload,
    } : {
        color: etapaConfig.color,
        bgColor: etapaConfig.bgColor,
        label: null,
        icon: etapaConfig.icon,
    };

    const IconComponent = anexoConfig.icon;

    const isUrl = (value: string) => typeof value === "string" && value.startsWith("http");

    return (
        <>
            {item.titulo && (
                <div key={`${tipo}-${idx}`}
                     className={`flex items-start gap-4 p-4 rounded-xl border dark:bg-[#1d293d] dark:border-white/15  ${anexoConfig.bgColor}`}>

                    <div className="flex-1">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-1">
                            <div className='flex items-center gap-2'>
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center border ${anexoConfig.bgColor}`}>
                                    <IconComponent className={`w-5 h-5 ${anexoConfig.color}`}/>
                                </div>
                                <div>
                                    <h5 className="font-semibold">{item.titulo || ""}</h5>
                                    {/* Label do anexo */}
                                    {anexoConfig.label && (
                                        <p className="text-xs text-muted-foreground italic mb-1">
                                            {anexoConfig.label}
                                        </p>
                                    )}

                                    {/* Descrição */}
                                    {item.descricao && (
                                        <p className="text-sm text-muted-foreground mb-2">
                                            {item.descricao}
                                        </p>
                                    )}
                                </div>

                            </div>

                            {dataFormatada && (
                                <div className="flex gap-2 items-center">
                                    {item.url && (
                                        <a
                                            href={item.url.startsWith("http") ? item.url : `https://${item.url}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="border-2"
                                            >
                                                Visualizar
                                            </Button>
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>

                        {item.items && (
                            <div className="flex flex-wrap gap-x-4 gap-y-2">
                                {Object.entries(item.items).map(([key, value]: any) => (
                                    <div key={key} className="flex text-sm items-start gap-1 min-w-0">
                                       <span className="font-medium whitespace-nowrap">
                                            {key}:
                                        </span>

                                        <div className="flex-1 min-w-0 overflow-hidden">
                                            {isUrl(value) ? (
                                                <a
                                                    href={value}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 underline flex items-center gap-1 hover:text-blue-700 transition-colors"
                                                >
                                                    Abrir
                                                    <ExternalLink size={14} className="flex-shrink-0"/>
                                                </a>
                                            ) : (
                                                <span className="text-gray-600 truncate block" title={value}>
                                                  {value}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
