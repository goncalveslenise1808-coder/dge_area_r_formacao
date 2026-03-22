"use client";
import { FC } from "react";
import { Pagination, PaginationContent, PaginationItem } from "@/components/atoms/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    totalCountOfRegisters: number;
    registerPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

interface PaginationArrowProps {
    direction: "left" | "right";
    isDisabled: boolean;
    onClick: () => void;
}

const PaginationArrow: FC<PaginationArrowProps> = ({
   direction,
   isDisabled,
   onClick,
}) => {
    const isLeft = direction === "left";

    return (
        <button
            onClick={onClick}
            className={`h-6 w-8 p-0 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed ${
                isDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            aria-disabled={isDisabled}
            disabled={isDisabled}
        >
            {isLeft ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
        </button>
    );
};

export function PaginationComponent({
    totalCountOfRegisters,
    registerPerPage,
    currentPage,
    onPageChange,
}: Readonly<PaginationProps>) {
    const pageCount = Math.ceil(totalCountOfRegisters / registerPerPage);

    const handlePageChange = (page: number) => {
        if (page !== currentPage) {
            onPageChange(page);
        }
    };

    return (
        <Pagination className="py-10">
            <PaginationContent>
                <PaginationArrow
                    direction="left"
                    isDisabled={currentPage <= 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                />

                {Array.from({ length: pageCount }, (_, index) => {
                    const pageNumber = index + 1;
                    return (
                        <PaginationItem
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            className="cursor-pointer"
                        >
                            <div
                                className={`h-[30px] w-[30px] flex items-center justify-center rounded-full text-[#616E85]
                  ${pageNumber === currentPage ? "bg-blue-500 text-white" : ""}`}
                            >
                                {pageNumber}
                            </div>
                        </PaginationItem>
                    );
                })}

                <PaginationArrow
                    direction="right"
                    isDisabled={currentPage >= pageCount}
                    onClick={() => handlePageChange(currentPage + 1)}
                />
            </PaginationContent>
        </Pagination>
    );
}
