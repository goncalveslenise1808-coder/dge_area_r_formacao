import {ScrollArea} from "@/components/atoms/scroll-area";
import {IAlertaEmail} from "@/services/notification/type";
import {formatarData} from "@/lib/utils";

export function ListNotification({
                                     alertasFiltrados,
                                     selectedAlerta,
                                     handleSelectAlerta
                                 }: {
    alertasFiltrados: IAlertaEmail[]
    selectedAlerta: IAlertaEmail | null,
    handleSelectAlerta: (alerta: IAlertaEmail) => Promise<void>;
}) {
    return (
        <ScrollArea className="border-r flex-1 px-6 py-4">
            <div className="flex flex-col gap-4">
                {alertasFiltrados.map((alerta) => (
                    <div key={alerta.id} className='flex gap-2 justify-center items-center'>
                        <h1
                            onClick={() => handleSelectAlerta(alerta)}
                            className={`w-2/3 cursor-pointer border-b-2 pb-1 ${selectedAlerta?.id === alerta.id ? "border-b-blue-500" : ""} 
                           ${alerta.flagLeitura === "NAO" ? "font-bold text-black/80 dark:text-white" : "font-light"}
                        `}
                        >
                            {alerta.assunto}
                        </h1>
                        <p className={`text-[10px] ${alerta.flagLeitura === "NAO" ? "font-bold text-black/80 dark:text-white" : "font-light"}`}> {formatarData(alerta.dataEnvio)}</p>
                    </div>
                ))}

                {alertasFiltrados.length === 0 && (
                    <p className="text-sm text-gray-400">Nenhuma notificação encontrada</p>
                )}
            </div>
        </ScrollArea>
    )
}