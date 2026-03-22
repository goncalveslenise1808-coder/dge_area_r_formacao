"use client";

import { AvaliacaoResumoApi, GetAvaliacoesResumoParams, Page } from "@/services/formacao/avaliacao/getAvaliacaoResumo/type";
import { useInfiniteQuery } from "@tanstack/react-query";
;

export function useAvaliacoesInfinite(
  filters: Omit<GetAvaliacoesResumoParams, "page" | "size">,
  loadMore: (next: GetAvaliacoesResumoParams) => Promise<Page<AvaliacaoResumoApi>>,
  initial: Page<AvaliacaoResumoApi>
) {
  return useInfiniteQuery<Page<AvaliacaoResumoApi>, Error>({
    queryKey: ["avaliacoes", filters],
    initialPageParam: initial.page ?? 0,
    queryFn: ({ pageParam }) =>
      loadMore({
        ...filters,
        page: Number(pageParam),
        size: initial.size || 10,
      }),
    getNextPageParam: (lastPage) => {
      const next = lastPage.page + 1;
      return lastPage.last ? undefined : next;
    },
    initialData: {
      pages: [initial],
      pageParams: [initial.page ?? 0],
    },
  });
}
