"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  IPaginatedResult,
  ISearch,
  IOfertaFormativa,
} from "@/services/ofertas/type";

export function useOfertasInfinite(
  filters: ISearch,
  loadMore: (next: ISearch) => Promise<IPaginatedResult<IOfertaFormativa>>,
  initial: IPaginatedResult<IOfertaFormativa>
) {
  return useInfiniteQuery<IPaginatedResult<IOfertaFormativa>, Error>({
    queryKey: ["ofertas", filters],
    initialPageParam: initial.page ?? 0,
    queryFn: ({ pageParam }) =>
      loadMore({
        ...filters,
        page: Number(pageParam),
        size: initial.size || 10,
      }),
    getNextPageParam: (lastPage) => {
      const next = lastPage.page + 1;
      return next < lastPage.totalPages ? next : undefined;
    },
    initialData: {
      pages: [initial],
      pageParams: [initial.page ?? 0],
    },
  });
}
