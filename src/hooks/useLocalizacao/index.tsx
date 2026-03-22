import {
  getLocalizacao,
  ILocalizacaoParams,
  ILocationProps,
} from "@/services/get-localizacao";
import useSWR from "swr";

export function useLocalizacao(params: ILocalizacaoParams) {
  const cacheKey = `/localizacao?tipo=${params?.tipo}&id_pai=${params?.pais}`;
  const { data, error, isLoading } = useSWR<ILocationProps[]>(cacheKey, () =>
    getLocalizacao(params)
  );

  return {
    data,
    isLoading,
    error,
  };
}
