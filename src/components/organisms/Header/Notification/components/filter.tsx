import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/atoms/select";
import {Input} from "@/components/atoms/input";

export function Filter({
   filtroLeitura,
   filtroAssunto,
   updateQueryParams
}:{
    filtroLeitura: string
    filtroAssunto: string
    updateQueryParams: (params: Record<string, string>) => void;
}){
    return(
        <div className="flex flex-col gap-2 mb-4 px-6">
            <Select
                value={filtroLeitura}
                onValueChange={(val) => updateQueryParams({ leitura: val })}
            >
                <SelectTrigger className="h-10 border-2">
                    <SelectValue placeholder="Filtrar leitura..." />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="todas">Todas</SelectItem>
                    <SelectItem value="NAO">Não Lidas</SelectItem>
                    <SelectItem value="SIM">Lidas</SelectItem>
                </SelectContent>
            </Select>

            <Input
                placeholder="Pesquisar assunto..."
                value={filtroAssunto}
                onChange={(e) => updateQueryParams({ assunto: e.target.value })}
            />
        </div>
    )
}