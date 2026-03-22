"use client";

import React from "react";
import {Calendar as CalendarIcon, X} from "lucide-react";
import {Button} from "@/components/atoms/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/atoms/select";
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/atoms/popover";
import {Calendar} from "@/components/atoms/calendar";
import {cn} from "@/lib/utils";

export type Option = { value: string; label: string };

export type FilterKind = "select" | "multi" | "tags" | "date";

export type FilterConfig<T> = {
    urlKey?: string;
    name: string;
    label: string;
    type: FilterKind;
    options?: Option[] | "derive";
    deriveFrom?: (item: T) => string | string[] | null | undefined;
    allowAll?: boolean;
};

export type FilterValue = string | string[] | undefined;

export type DynamicFilterModalProps<T> = {
    title?: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    filtersConfig: FilterConfig<T>[];
    tempValue: Record<string, FilterValue>;
    onTempChange: (next: Record<string, FilterValue>) => void;
    onApply: () => void;
    onClear: () => void;
    data?: T[];
};

function toOptionsUnique(values: (string | null | undefined)[]): Option[] {
    const uniq = Array.from(new Set(values.filter(Boolean) as string[]));
    return uniq.map((v) => ({value: v, label: v}));
}

export function DynamicFilterModal<T>({
                                          title,
                                          open,
                                          onOpenChange,
                                          filtersConfig,
                                          tempValue,
                                          onTempChange,
                                          onApply,
                                          onClear,
                                          data = [],
                                      }: DynamicFilterModalProps<T>) {
    if (!open) return null;

    const computedOptions: Record<string, Option[]> = {};
    for (const conf of filtersConfig) {
        if (conf.options === "derive" && conf.deriveFrom) {
            const values = data.flatMap((item) => {
                const got = conf.deriveFrom!(item);
                return Array.isArray(got) ? got : [got];
            });
            computedOptions[conf.name] = toOptionsUnique(
                values as (string | null | undefined)[]
            );
        } else if (Array.isArray(conf.options)) {
            computedOptions[conf.name] = conf.options;
        }
    }

    const setVal = (key: string, val: FilterValue) => {
        onTempChange({...tempValue, [key]: val});
    };

    const countActive = Object.values(tempValue).reduce((acc, v) => {
        if (Array.isArray(v)) return acc + (v.length ? 1 : 0);
        return acc + (v ? 1 : 0);
    }, 0);

    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div
                className="bg-card/95 dark:bg-card rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl">
                <div
                    className="sticky top-0 bg-card/95 border-b px-6 md:px-8 py-5 rounded-t-3xl flex items-center justify-between dark:bg-[#1d293d]">
                    <div className="text-lg font-semibold">Filtrar {title ?? ""}</div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onOpenChange(false)}
                    >
                        <X className="w-5 h-5"/>
                    </Button>
                </div>

                <div className="p-6 md:p-8 dark:bg-[#1d293d]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filtersConfig.map((conf) => {
                            const opts = computedOptions[conf.name] ?? [];
                            const val = tempValue[conf.name];

                            if (conf.type === "select") {
                                return (
                                    <div key={conf.name} className="space-y-2">
                                        <label className="text-sm font-medium">{conf.label}</label>
                                        <Select
                                            value={(val as string) || (conf.allowAll ? "all" : "")}
                                            onValueChange={(v) =>
                                                setVal(conf.name, conf.allowAll && v === "all" ? "" : v)
                                            }
                                        >
                                            <SelectTrigger
                                                className="h-12 rounded-2xl bg-gray-50 dark:bg-white/5 border">
                                                <SelectValue
                                                    placeholder={`Escolher ${conf.label.toLowerCase()}`}
                                                />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {conf.allowAll && (
                                                    <SelectItem value="all">Todos</SelectItem>
                                                )}
                                                {opts.map((o) => (
                                                    <SelectItem key={o.value} value={o.value}>
                                                        {o.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                );
                            }

                            if (conf.type === "tags" || conf.type === "multi") {
                                const current = Array.isArray(val) ? (val as string[]) : [];
                                const toggle = (v: string) => {
                                    const has = current.includes(v);
                                    setVal(
                                        conf.name,
                                        has ? current.filter((x) => x !== v) : [...current, v]
                                    );
                                };
                                return (
                                    <div key={conf.name} className="space-y-2">
                                        <label className="text-sm font-medium">{conf.label}</label>
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                                            {opts.map((o) => {
                                                const selected = current.includes(o.value);
                                                return (
                                                    <Button
                                                        key={o.value}
                                                        type="button"
                                                        variant={selected ? "default" : "outline"}
                                                        onClick={() => toggle(o.value)}
                                                        className="rounded-xl h-10"
                                                    >
                                                        {o.label}
                                                    </Button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            }

                            if (conf.type === "date") {
                                const d = (val as string) || "";
                                const parsed = d ? new Date(`${d}T00:00:00`) : undefined;
                                return (
                                    <div key={conf.name} className="space-y-2">
                                        <label className="text-sm font-medium">{conf.label}</label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    className={cn(
                                                        "w-full justify-between h-12 rounded-2xl bg-gray-50 dark:bg-white/5 border",
                                                        !d && "text-muted-foreground"
                                                    )}
                                                >
                                                    {d ? d : `Selecione ${conf.label.toLowerCase()}`}
                                                    <CalendarIcon className="w-4 h-4 opacity-60"/>
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="p-0 w-auto">
                                                <Calendar
                                                    mode="single"
                                                    selected={parsed}
                                                    onSelect={(val) =>
                                                        setVal(
                                                            conf.name,
                                                            val ? val.toISOString().split("T")[0] : ""
                                                        )
                                                    }
                                                    captionLayout="dropdown"
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                );
                            }

                            return null;
                        })}
                    </div>

                    <div className="mt-8 pt-6 border-t flex items-center justify-between gap-4">
                        <div className="text-sm text-muted-foreground">
                            {countActive} filtro{countActive === 1 ? "" : "s"} ativo
                            {countActive === 1 ? "" : "s"}
                        </div>
                        <div className="flex gap-3">
                            {countActive > 0 && (
                                <Button
                                    variant="ghost"
                                    onClick={onClear}
                                    className="text-destructive"
                                >
                                    Limpar todos
                                </Button>
                            )}
                            <Button variant="secondary" className='dark:bg-[#1d293d]'
                                    onClick={() => onOpenChange(false)}>
                                Cancelar
                            </Button>
                            <Button onClick={onApply}>Aplicar Filtros</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
