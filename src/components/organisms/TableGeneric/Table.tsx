'use client';

import * as React from "react";
import {ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable,} from "@tanstack/react-table";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/atoms/card";
import {LucideIcon, MoreVertical} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/atoms/dropdown-menu";

// --- Hook responsivo ---
const MOBILE_BREAKPOINT = 1024;

export function useIsMobile() {
    const [isMobile, setIsMobile] = React.useState<boolean>(false);

    React.useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    return isMobile;
}

// --- Actions Menu ---
function RowActions({row}: { row: any }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="p-2 rounded hover:bg-gray-100">
                    <MoreVertical className="w-4 h-4"/>
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuItem>Ver</DropdownMenuItem>
                <DropdownMenuItem>Editar</DropdownMenuItem>
                <DropdownMenuItem className="text-red-500">Remover</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

// --- Componente principal ---
type TableProps<T> = {
    columns: ColumnDef<T>[];
    data: T[] | undefined;
    title?: string;
    subtitle?: string;
    icon?: LucideIcon;
    description?: string;
};

export function TableGeneric<T>({
                                    columns,
                                    data,
                                    title,
                                    subtitle,
                                    description,
                                    icon: Icon,
                                }: TableProps<T>) {
    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const table = useReactTable({
        columns,
        data: data || [],
        state: {pagination},
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    const totalRows = data?.length || 0;
    const isMobile = useIsMobile();

    if (!data || data.length === 0) return null;

    return (
        <Card className='dark:bg-[#1d293d]'>
            {/* HEADER */}
            {title && (
                <CardHeader>
                    <div className="flex items-center gap-3">
                        {Icon && (
                            <div
                                className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                                <Icon className="h-5 w-5"/>
                            </div>
                        )}
                        <CardTitle className="text-sm font-semibold uppercase tracking-wider">
                            {title}
                        </CardTitle>
                    </div>
                    {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
                </CardHeader>
            )}

            <CardContent className="px-0">
                {/* SELETOR DE QUANTIDADE */}
                {totalRows > 0 && (
                    <div className="flex items-center justify-between mb-4 px-2 py-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            Mostrar
                            <select
                                value={pagination.pageSize}
                                onChange={(e) => table.setPageSize(Number(e.target.value))}
                                className="border rounded px-2 py-1"
                            >
                                {[10, 20, 30, 50].map((size) => (
                                    <option key={size} value={size}>
                                        {size}
                                    </option>
                                ))}
                            </select>
                            arquivos
                        </div>
                        <div className="text-sm text-muted-foreground px-2">
                            Total: {totalRows} {subtitle}
                        </div>
                    </div>
                )}

                {/* MOBILE VIEW */}
                {isMobile ? (
                    <div className="space-y-3 px-2">
                        {table.getRowModel().rows.map((row, idx) => (
                            <Card key={idx} className="p-3">
                                {/* HEADER DO CARD */}
                                <div className="flex justify-between items-start mb-2">
                                    <div className="text-sm font-medium">
                                        {flexRender(
                                            row.getVisibleCells()[0].column.columnDef.cell,
                                            row.getVisibleCells()[0].getContext()
                                        )}
                                    </div>

                                    {/* AÇÕES */}
                                    <RowActions row={row}/>
                                </div>

                                {/* RESTO DOS CAMPOS */}
                                <div className="space-y-1 text-xs text-muted-foreground">
                                    {row.getVisibleCells().slice(1).map((cell, idx) => (
                                        <div key={idx} className="flex justify-between">
                                      <span className="font-medium">
                                        {cell.column.columnDef.header as string}
                                      </span>
                                            <span>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                      </span>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : (
                    /* DESKTOP TABLE */
                    <table className="w-full border-collapse">
                        <thead>
                        {table.getHeaderGroups().map((headerGroup, index) => (
                            <tr key={index}>
                                {headerGroup.headers.map((header, idx) => (
                                    <th
                                        key={idx}
                                        className="space-x-2 px-2 py-5 text-left text-sm font-medium text-muted-foreground bg-gray-100/50 dark:bg-[#0d192b]"
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                        </thead>
                        <tbody>
                        {table.getRowModel().rows.map((row, idx) => (
                            <tr key={idx} className="border-b font-light">
                                {row.getVisibleCells().map((cell, idx) => (
                                    <td key={idx} className="py-2 px-2 text-muted-foreground">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}

                {/* PAGINAÇÃO DESKTOP */}
                {!isMobile && totalRows > pagination.pageSize && (
                    <div className="flex items-center justify-end gap-4 mt-4">
                        <button
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className="border px-3 py-1 rounded disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <p className="text-sm text-muted-foreground">
                            Página {pagination.pageIndex + 1} de {table.getPageCount()}
                        </p>
                        <button
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            className="border px-3 py-1 rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}