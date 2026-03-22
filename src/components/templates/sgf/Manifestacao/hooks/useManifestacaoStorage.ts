import {useEffect, useRef} from "react";

const STORAGE_KEY = "manifestacao-form-data-v2";

export function useManifestacaoStorage(methods: any) {
    const hasRestored = useRef(false);
    const isRestoring = useRef(true);

    // RESTORE (1x apenas)
    useEffect(() => {
        if (hasRestored.current) return;

        const saved = localStorage.getItem(STORAGE_KEY);

        if (saved) {
            const parsed = JSON.parse(saved);
            const currentValues = methods.getValues();

            const isSameEntidade =
                String(parsed.entidadeId) === String(currentValues.entidadeId);

            const normalized = {
                ...parsed,
                entidadeContacto: String(parsed.entidadeContacto ?? ""),
                foto: null,

                // anexos (somente metadados)
                anexos: (parsed.anexos || []).map((a: any) => ({
                    tipo: a?.tipo,
                    name: a?.name,
                    size: a?.size,
                    type: a?.type,
                    file: null
                })),

                // validação por entidade
                preferencias: isSameEntidade ? parsed.preferencias : []
            };

            methods.reset({
                ...currentValues,
                ...normalized
            });
        }

        hasRestored.current = true;
        isRestoring.current = false;
    }, [methods]);

    // WATCH (salvar no storage)
    useEffect(() => {
        const subscription = methods.watch((value: any) => {
            if (isRestoring.current) return;

            const dataToSave = {...value};

            // não salvar ficheiros reais
            delete dataToSave.foto;

            if (dataToSave.anexos) {
                dataToSave.anexos = dataToSave.anexos.map((a: any) => ({
                    tipo: a?.tipo,
                    name: a?.file?.name || a?.name,
                    size: a?.file?.size || a?.size,
                    type: a?.file?.type || a?.type
                }));
            }

            localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
        });

        return () => subscription.unsubscribe();
    }, [methods]);

    // REAÇÃO à mudança de entidade
    useEffect(() => {
        const subscription = methods.watch((value: any, {name}: any) => {
            if (name !== "entidadeId") return;

            const saved = localStorage.getItem(STORAGE_KEY);
            if (!saved) return;

            const parsed = JSON.parse(saved);

            const isSameEntidade =
                String(parsed.entidadeId) === String(value.entidadeId);

            if (!isSameEntidade) {
                // limpa preferências inconsistentes
                methods.setValue("preferencias", []);
            }
        });

        return () => subscription.unsubscribe();
    }, [methods]);
}