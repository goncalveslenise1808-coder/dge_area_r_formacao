"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getSessoes } from "@/services/formacao/getSessoes";
import type {
  Page,
  SessaoApi,
} from "@/services/formacao/getSessoes/types";

type Filters = {
  personId: number;
  registrationCode: string;
  unitId?: number;
  size?: number;
};

export function useSessoesInfinite(
  filters: Filters,
  initial?: Page<SessaoApi>
) {
  const size = filters.size ?? initial?.size ?? 10;

  return useInfiniteQuery<Page<SessaoApi>, Error>({
    queryKey: [
      "sessoes",
      filters.personId,
      filters.registrationCode,
      filters.unitId,
      size,
    ],
    initialPageParam: initial?.number ?? 0,
    queryFn: async ({ pageParam }) => {
      const page = Number(pageParam) || 0;

      const res: Page<SessaoApi> | null = await getSessoes({
        personId: filters.personId,
        registrationCode: filters.registrationCode,
        unitId: filters.unitId,
        page,
        size,
      });
      return res!;
    },
    getNextPageParam: (lastPage) => {
      const next = Number(lastPage?.number) +  1;
      return next < Number(lastPage?.pageable?.pageSize) ? next : undefined;
    },
    ...(initial
      ? { initialData: { pages: [initial], pageParams: [initial.pageable.offset ?? 0] } }
      : {}),
    staleTime: 60_000,
    gcTime: 600_000,
  });
}
