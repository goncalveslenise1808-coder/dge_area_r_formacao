import { useState, useEffect } from "react";

interface LocalizacaoParams {
  tipo: "PAIS" | "ILHA" | "CONCELHO" | "FREGUESIA" | "ZONA" | "NACIONALIDADE";
  id_pai?: string;
}

interface LocalizacaoOption {
  id: string | number;
  name?: string;
  description?: string;
}

export const useLocalizacao = ({
  tipo = "PAIS",
  id_pai = "238",
}: LocalizacaoParams) => {
  const [data, setData] = useState<LocalizacaoOption[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!tipo) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const urlParams = new URLSearchParams();
        urlParams.append("tipo", tipo);
        if (id_pai) {
          urlParams.append("id_pai", id_pai);
        }

        const response = await fetch(
          `/api/client-request/localizacao?${urlParams.toString()}`
        );
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        const result: LocalizacaoOption[] = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message || "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tipo, id_pai]);

  return { data, loading, error };
};
