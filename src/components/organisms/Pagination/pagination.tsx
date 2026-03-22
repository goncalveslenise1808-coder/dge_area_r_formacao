"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { Button } from "@/components/atoms/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/atoms/select"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { useCallback } from "react"

export interface PaginationProps {
    currentPage: number
    totalPages: number
    totalItems: number
    itemsPerPage: number
    itemsPerPageOptions?: number[]
    showItemsPerPage?: boolean
    showPageInfo?: boolean
    className?: string
}

export function Pagination({
   currentPage,
   totalPages,
   totalItems,
   itemsPerPage,
   itemsPerPageOptions = [5, 10, 20, 50],
   showItemsPerPage = true,
   showPageInfo = true,
   className = "",
}: PaginationProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const createQueryString = useCallback(
        (params: Record<string, string>) => {
            const newParams = new URLSearchParams(searchParams.toString())
            for (const [key, value] of Object.entries(params)) {
                if (value) {
                    newParams.set(key, value)
                } else {
                    newParams.delete(key)
                }
            }
            return newParams.toString()
        },
        [searchParams]
    )

    const handlePageChange = (page: number) => {
        router.push(`${pathname}?${createQueryString({ page: String(page) })}`)
    }

    const handleItemsPerPageChange = (value: string) => {
        router.push(`${pathname}?${createQueryString({ perPage: value, page: "1" })}`)
    }

    const startItem = (currentPage - 1) * itemsPerPage + 1
    const endItem = Math.min(currentPage * itemsPerPage, totalItems)

    const canGoPrevious = currentPage > 1
    const canGoNext = currentPage < totalPages

    const getVisiblePages = () => {
        const pages: (number | "ellipsis")[] = []
        const maxVisible = 5

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            pages.push(1)

            if (currentPage > 3) {
                pages.push("ellipsis")
            }

            const start = Math.max(2, currentPage - 1)
            const end = Math.min(totalPages - 1, currentPage + 1)

            for (let i = start; i <= end; i++) {
                pages.push(i)
            }

            if (currentPage < totalPages - 2) {
                pages.push("ellipsis")
            }

            pages.push(totalPages)
        }

        return pages
    }

    if (totalPages <= 1 && !showItemsPerPage) {
        return null
    }

    return (
        <div className={`flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ${className}`}>
            {showPageInfo && totalItems > 0 && (
                <p className="text-sm text-muted-foreground">
                    Mostrando <span className="font-medium">{startItem}</span> a{" "}
                    <span className="font-medium">{endItem}</span> de{" "}
                    <span className="font-medium">{totalItems}</span> resultados
                </p>
            )}

            <div className="flex items-center gap-4">
                {showItemsPerPage && (
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Por página:</span>
                        <Select
                            value={String(itemsPerPage)}
                            onValueChange={handleItemsPerPageChange}
                        >
                            <SelectTrigger className="w-[70px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {itemsPerPageOptions.map((option) => (
                                    <SelectItem key={option} value={String(option)}>
                                        {option}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}

                {totalPages > 1 && (
                    <div className="flex items-center gap-1">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => handlePageChange(1)}
                            disabled={!canGoPrevious}
                            aria-label="Primeira página"
                        >
                            <ChevronsLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={!canGoPrevious}
                            aria-label="Página anterior"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>

                        <div className="flex items-center gap-1">
                            {getVisiblePages().map((page, index) =>
                                    page === "ellipsis" ? (
                                        <span key={`ellipsis-${index}`} className="px-2 text-muted-foreground">
                    ...
                  </span>
                                    ) : (
                                        <Button
                                            key={page}
                                            variant={currentPage === page ? "default" : "outline"}
                                            size="icon"
                                            className={`h-8 w-8 ${currentPage !== page ? "bg-transparent" : ""}`}
                                            onClick={() => handlePageChange(page)}
                                            aria-label={`Página ${page}`}
                                            aria-current={currentPage === page ? "page" : undefined}
                                        >
                                            {page}
                                        </Button>
                                    )
                            )}
                        </div>

                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={!canGoNext}
                            aria-label="Próxima página"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => handlePageChange(totalPages)}
                            disabled={!canGoNext}
                            aria-label="Última página"
                        >
                            <ChevronsRight className="h-4 w-4" />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}