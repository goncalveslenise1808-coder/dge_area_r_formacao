'use client';

import React, {useEffect, useMemo, useState} from 'react';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {Filter as FilterIcon, Search as SearchIcon, X} from 'lucide-react';
import {Input} from '@/components/atoms/input';
import {Button} from '@/components/atoms/button';
import {Badge} from '@/components/atoms/badge';
import {DynamicFilterModal, FilterConfig, FilterValue} from './FilterModal';

type Dict = Record<string, FilterValue>;

type Props<T> = {
    placeholder?: string;
    filtersConfig: FilterConfig<T>[];
    data?: T[];
    value?: Dict;
    onChange?: (next: Dict) => void;
    withSearch?: boolean;
    searchValue?: string;
    onSearchChange?: (s: string) => void;
    basePath?: string;
};

function encodeToQS(filters: Dict, search?: string) {
    const p = new URLSearchParams();
    for (const [k, v] of Object.entries(filters)) {
        if (Array.isArray(v) && v.length) p.set(k, v.join(','));
        else if (typeof v === 'string' && v) p.set(k, v);
    }
    if (search) p.set('search', search);
    return p.toString();
}

function decodeFromQS(qs: URLSearchParams): Dict {
    const out: Dict = {};
    qs.forEach((v, k) => {
        if (k === 'search') return;
        if (v.includes(',')) out[k] = v.split(',').filter(Boolean);
        else out[k] = v;
    });
    return out;
}

export function DynamicFilterBar<T>({
                                        placeholder = 'Procurar...',
                                        filtersConfig,
                                        data = [],
                                        value,
                                        onChange,
                                        withSearch = true,
                                        searchValue,
                                        onSearchChange,
                                        basePath,
                                    }: Props<T>) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const initialFromUrl = useMemo(() => decodeFromQS(searchParams), [searchParams]);
    const [filters, setFilters] = useState<Dict>(value ?? initialFromUrl);
    const [open, setOpen] = useState(false);
    const [temp, setTemp] = useState<Dict>(filters);
    const [localSearch, setLocalSearch] = useState<string>(searchValue ?? (searchParams.get('search') || ''));

    useEffect(() => {
        setTemp(filters);
    }, [open]);

    useEffect(() => {
        if (value) setFilters(value);
    }, [value]);

    const activeEntries = useMemo(
        () =>
            Object.entries(filters).filter(([_, v]) =>
                Array.isArray(v) ? v.length > 0 : Boolean(v)
            ),
        [filters]
    );

    const pushUrl = (next: Dict, search?: string) => {
        const qs = encodeToQS(next, search);
        router.replace(`${basePath || pathname}${qs ? `?${qs}` : ''}`);
    };

    const apply = () => {
        setFilters(temp);
        onChange?.(temp);
        pushUrl(temp, withSearch ? localSearch : undefined);
        setOpen(false);
    };

    const clearAll = () => {
        const cleared: Dict = {};
        for (const conf of filtersConfig) {
            const key = conf.urlKey || conf.name;
            if (conf.type === 'multi' || conf.type === 'tags') cleared[key] = [];
            else cleared[key] = '';
        }
        setFilters(cleared);
        setTemp(cleared);
        onChange?.(cleared);
        setLocalSearch('');
        pushUrl(cleared, withSearch ? '' : undefined);
    };

    const removeOne = (key: string) => {
        const conf = filtersConfig.find(f => (f.urlKey || f.name) === key);
        const next = {...filters, [key]: conf && (conf.type === 'multi' || conf.type === 'tags') ? [] : ''};
        setFilters(next);
        onChange?.(next);
        pushUrl(next, withSearch ? localSearch : undefined);
    };

    const displayLabel = (key: string, raw: FilterValue): string => {
        const conf = filtersConfig.find(f => (f.urlKey || f.name) === key);
        if (!conf) return `${key}: ${String(raw)}`;
        const opts =
            conf.options === 'derive'
                ? []
                : (conf.options || []);
        const map: Record<string, string> = {};
        (opts as any[]).forEach((o: any) => (map[o.value] = o.label));

        if (Array.isArray(raw)) {
            return `${conf.label}: ${raw.map(v => map[v] ?? v).join(', ')}`;
        }
        return `${conf.label}: ${map[raw as string] ?? raw ?? ''}`;
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
                {withSearch && (
                    <div className="relative flex-1">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"/>
                        <Input
                            value={localSearch}
                            onChange={e => {
                                const v = e.target.value;
                                setLocalSearch(v);
                                onSearchChange?.(v);
                                pushUrl(filters, v);
                            }}
                            placeholder={placeholder}
                            className="pl-12 h-12 text-base border-0 bg-gray-200/70 dark:bg-white/5"
                        />
                    </div>
                )}

                <Button
                    variant="outline"
                    onClick={() => setOpen(true)}
                    className="h-12 px-6 border-0 bg-gradient-primary text-white"
                >
                    <FilterIcon className="w-5 h-5 mr-2"/>
                    Filtrar
                    {activeEntries.length > 0 && (
                        <Badge
                            className="ml-2 bg-green-500/20  dark:text-green-300 border border-green-500/30 text-white">
                            {activeEntries.length}
                        </Badge>
                    )}
                </Button>

                <DynamicFilterModal<T>
                    title="Resultados"
                    open={open}
                    onOpenChange={setOpen}
                    filtersConfig={filtersConfig}
                    tempValue={temp}
                    onTempChange={setTemp}
                    onApply={apply}
                    onClear={clearAll}
                    data={data}
                />
            </div>

            {activeEntries.length > 0 && (
                <div className="flex flex-wrap gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="flex items-center mr-2">
                        <FilterIcon className="w-4 h-4 text-green-600 mr-1"/>
                        <span className="text-sm font-medium text-green-700 dark:text-green-300">Filtros ativos:</span>
                    </div>

                    {activeEntries.map(([k, v]) => (
                        <Badge
                            key={k}
                            className="bg-green-500/20 text-green-700 dark:text-green-300 border border-green-500/30 px-3 py-1 h-8"
                        >
                            {displayLabel(k, v)}
                            <button onClick={() => removeOne(k)} className="ml-2 hover:opacity-80">
                                <X className="w-3 h-3"/>
                            </button>
                        </Badge>
                    ))}

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAll}
                        className="text-green-700 dark:text-green-300 hover:bg-green-500/10 h-8 px-3 text-xs"
                    >
                        Limpar todos
                    </Button>
                </div>
            )}
        </div>
    );
}
