'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/atoms/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/atoms/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/atoms/select';
import { IOfertaFormativa } from "@/services/ofertas/type";

export interface FilterOption {
    id: string;
    label: string;
    icon?: React.ReactNode;
    options: {
        value: string;
        label: string;
    }[];
}

interface FilterModalProps {
    isOpen: boolean;
    onClose: () => void;
    filterOptions: FilterOption[];
    activeFilters: Record<string, string>;
    onApplyFilters: (filters: Record<string, string>) => void;
    onClearFilters: () => void;
    data: IOfertaFormativa[];
}

export function FilterModal({
    isOpen,
    onClose,
    filterOptions,
    activeFilters,
    onApplyFilters,
    onClearFilters,
    data
}: FilterModalProps) {

    const router = useRouter();
    const [tempFilters, setTempFilters] = useState<Record<string, string>>(activeFilters);

    useEffect(() => {
        setTempFilters({ ...activeFilters });
    }, [activeFilters, isOpen]);

    const handleFilterChange = (filterId: string, value: string) => {
        setTempFilters(prev => ({
            ...prev,
            [filterId]: value === 'all' ? '' : value
        }));
    };

    const handleRemoveFilter = (filterId: string) => {
        const newFilters = { ...tempFilters };
        delete newFilters[filterId];
        setTempFilters(newFilters);
    };

    const handleApply = () => {
        const cleanFilters = Object.fromEntries(
            Object.entries(tempFilters).filter(([_, value]) => value !== '')
        );

        const queryString = new URLSearchParams(cleanFilters).toString();
        router.push(`?${queryString}`);

        onApplyFilters(cleanFilters);
        onClose();
    };

    const handleClear = () => {
        setTempFilters({});
        onClearFilters();
        router.push('?');
    };

    const activeFilterCount = Object.values(tempFilters).filter(v => v !== '').length;

    const extraFields = [
        { id: 'modalidade', label: 'Modalidade' },
        { id: 'nif_entidade', label: 'NIF Entidade' },
        { id: 'nivel', label: 'Nível' },
        { id: 'familia', label: 'Família' },
        { id: 'denominacao_entidade', label: 'Entidade' },
        { id: 'codigo_qualificacao', label: 'Código Qualificação' }
    ];

    const extraOptions = useMemo(() => {
        return extraFields.map(field => {
            const values = Array.from(
                new Set(
                    data
                        .map((item: any) => item[field.id])
                        .filter(Boolean)
                )
            );
            return {
                id: field.id,
                label: field.label,
                options: values.map(v => ({
                    value: String(v),
                    label: String(v)
                }))
            };
        });
    }, [data]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md border border-gray-100 dark:border-white/10 shadow-md dark:shadow-lg bg-card/95 backdrop-blur-xs">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Filter className="w-5 h-5" />
                        Filtrar
                    </DialogTitle>
                    <DialogDescription>
                        Refine sua pesquisa com os filtros abaixo
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-6 py-4 max-h-[60vh] overflow-y-auto">
                    {filterOptions.map((filter) => (
                        <div key={filter.id} className="space-y-2">
                            <h4 className="font-medium text-sm">{filter.label}</h4>
                            <Select
                                value={tempFilters[filter.id] || 'all'}
                                onValueChange={(value) => handleFilterChange(filter.id, value)}
                            >
                                <SelectTrigger className="h-10 border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5">
                                    <SelectValue placeholder={`Selecione ${filter.label}`} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todos</SelectItem>
                                    {filter.options.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    ))}

                    {extraOptions.map((filter) => (
                        <div key={filter.id} className="space-y-2 grid grid-cols-2">
                            <h4 className="font-medium text-sm">{filter.label}</h4>
                            <Select
                                value={tempFilters[filter.id] || 'all'}
                                onValueChange={(value) => handleFilterChange(filter.id, value)}
                            >
                                <SelectTrigger className="h-10 border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5">
                                    <SelectValue placeholder={`Selecione ${filter.label}`} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todos</SelectItem>
                                    {filter.options.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-between py-2">
                    {activeFilterCount > 0 ? (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {Object.entries(tempFilters).map(([key, value]) => (
                                <span
                                    key={key}
                                    onClick={() => handleRemoveFilter(key)}
                                    className="bg-green-500 rounded-2xl px-2 py-1 text-white cursor-pointer hover:bg-green-600 flex items-center gap-1 text-sm"
                                >
                                {`${key}: ${value}`}
                                    <X className="w-3 h-3" />
                            </span>
                            ))}
                        </div>
                    ): (
                        <span className="text-muted-foreground text-sm">{activeFilterCount} filtros ativos</span>
                    )}

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleClear}
                        className="text-sm h-8 px-2 hover:bg-destructive/10 text-destructive"
                    >
                        Limpar todos
                    </Button>
                </div>

                <DialogFooter className="flex flex-col sm:flex-row gap-2">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="flex-1 border border-gray-200 dark:border-white/10"
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleApply}
                        className="flex-1 btn-gradient-blue text-white"
                    >
                        Aplicar Filtros {activeFilterCount > 0 && `(${activeFilterCount})`}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
