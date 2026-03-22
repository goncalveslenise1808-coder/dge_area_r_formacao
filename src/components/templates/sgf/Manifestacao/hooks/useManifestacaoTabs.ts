/*
import {useState} from "react";
import {toast} from "sonner";
import {ManifestacaoFormData, tabFieldsMap} from "@/components/templates/sgf/Manifestacao/hooks/Schema/useSchema";

/!**
 * Interface que define os parâmetros recebidos pelo hook
 * methods -> objeto do react-hook-form (useForm)
 * activeTabDefault -> aba inicial opcional
 *!/
interface UseManifestacaoTabsParams {
    methods: any;
    activeTabDefault?: string;
}

/!**
 * Hook responsável por controlar toda a navegação entre as tabs
 * do formulário de manifestação, incluindo:
 * - estado da aba atual
 * - validação antes de avançar
 * - navegação entre tabs
 *!/
export function useManifestacaoTabs({methods, activeTabDefault}: UseManifestacaoTabsParams) {

    /!**
     * Lista de todas as tabs do formulário.
     *  A ordem define a sequência de navegação.
     *!/

    const tabs = [
        "DADOS_PESSOAIS",
        "DADOS_ACADEMICO",
        "CONTACTOS",
        "CCF",
        "ENTIDADE",
        "PREFERENCIAS",
        "ANEXOS"
    ];

    /!** Estado que guarda qual aba está ativa no momento.
     * Se activeTabDefault for passado, usa ele.
     * Caso contrário usa a primeira tab da lista.
     *!/
    const [activeTab, setActiveTab] = useState(activeTabDefault || tabs[0]);

    /!**
     * Descobre o índice da tab atual dentro do array tabs
     *!/
    const currentTabIndex = tabs.indexOf(activeTab);

    /!**
     * Verifica se a tab atual é a primeira
     *!/
    const isFirstTab = currentTabIndex === 0;

    /!**
     * Verifica se a tab atual é a última
     *!/
    const isLastTab = currentTabIndex === tabs.length - 1;

    /!**
     * Valida apenas os campos pertencentes à tab atual.
     * tabFieldsMap contém o mapeamento:
     * tab -> campos que devem ser validados.
     *
     * methods.trigger(fields) executa validação do react-hook-form
     *!/
    const validateCurrentTab = async (): Promise<boolean> => {
        const fields = tabFieldsMap[activeTab];
        if (!fields?.length) return true;

        const result = await methods.trigger(fields);
        return result;
    };

    /!**
     * Mensagens de erro específicas para cada tab
     * quando a validação falha
     *!/
    const tabErrorMessages: Record<string, string> = {
        "dados-pessoais": "Por favor, preencha todos os campos obrigatórios em Dados Pessoais.",
        "dados-academico": "Complete a Habilitação Acadêmica antes de avançar.",
        "contactos": "Os campos Email, Telemóvel e Endereço são obrigatórios.",
        "outros": "Indique se possui CCF e preencha o número quando aplicável.",
        "entidade": "Selecione uma Entidade Formadora válida.",
        "preferencias": "Adicione pelo menos uma preferência de formação.",
        "anexos": "Anexe os documentos necessários.",
    };

    /!**
     * Função executada quando a validação falha
     *
     * - mostra um toast com mensagem de erro
     * - foca automaticamente no primeiro campo com erro
     *!/
    const handleValidationFailure = () => {

        const message =
            tabErrorMessages[activeTab] || "Corrija os erros na aba atual antes de continuar.";

        toast.error(message, {
            description: "Os campos obrigatórios estão destacados em vermelho.",
            duration: 5000
        });

        /!**
         * pega o primeiro campo com erro no formulário
         *!/
        const firstError = Object.keys(methods.formState.errors)[0];

        /!**
         * coloca foco automático nesse campo
         *!/
        if (firstError)
            methods.setFocus(firstError as keyof ManifestacaoFormData);
    };

    /!**
     * Avança para a próxima tab
     *
     * Fluxo:
     * 1. valida tab atual
     * 2. se inválido -> mostra erro
     * 3. se válido -> vai para próxima tab
     *!/
    const next = async () => {
        const isValid = await validateCurrentTab();

        if (!isValid) {
            handleValidationFailure();
            return;
        }

        if (!isLastTab)
            setActiveTab(tabs[currentTabIndex + 1]);
    };

    /!**
     * Volta para a tab anterior
     * Não faz validação
     *!/
    const previous = () => {
        if (!isFirstTab)
            setActiveTab(tabs[currentTabIndex - 1]);
    };

    /!**
     * Permite navegar clicando diretamente em uma tab
     *
     * Regras:
     * - se clicar na tab atual -> não faz nada
     * - se estiver avançando -> valida tab atual
     * - se estiver voltando -> permite sem validação
     *!/
    const goToTab = async (newTab: string) => {

        if (newTab === activeTab) return;

        const newIndex = tabs.indexOf(newTab);

        const isAdvancing = newIndex > currentTabIndex;

        if (isAdvancing) {
            const isValid = await validateCurrentTab();

            if (!isValid) {
                handleValidationFailure();
                return;
            }
        }

        setActiveTab(newTab);
    };

    /!**
     * Valores e funções expostos para quem usar o hook
     *!/
    return {
        tabs,
        activeTab,
        currentTabIndex,
        isFirstTab,
        isLastTab,
        next,
        previous,
        goToTab,
        validateCurrentTab,
        handleValidationFailure,
    };
}*/
import {useMemo, useState} from "react";
import {toast} from "sonner";
import {ManifestacaoFormData, tabFieldsMap} from "@/components/templates/sgf/Manifestacao/hooks/Schema/useSchema";

/**
 * Interface que define os parâmetros recebidos pelo hook
 * methods -> objeto do react-hook-form (useForm)
 * activeTabDefault -> aba inicial opcional
 */
interface UseManifestacaoTabsParams {
    methods: any;
    activeTabDefault?: string;
    motivoRetificacao?: string | string[];
}


export function useManifestacaoTabs({
                                        methods,
                                        activeTabDefault,
                                        motivoRetificacao
                                    }: UseManifestacaoTabsParams) {

    /**
     * TODAS as tabs possíveis
     */
    const allTabs = [
        "DADOS_PESSOAIS",
        "DADOS_ACADEMICO",
        "CONTACTOS",
        "CCF",
        "ENTIDADE",
        "PREFERENCIAS",
        "ANEXOS"
    ];

    /**
     * Parse do motivo vindo da URL
     * Ex: "DADOS_PESSOAIS,CCF"
     */
    const parsedMotivos = useMemo(() => {
        if (!motivoRetificacao) return null;

        if (Array.isArray(motivoRetificacao)) {
            return motivoRetificacao.flatMap(m => m.split(","));
        }

        return motivoRetificacao.split(",");
    }, [motivoRetificacao]);

    /**
     * 🔥 Tabs ativas baseadas no motivo
     */
    const tabs = useMemo(() => {
        if (!parsedMotivos) return allTabs;

        const filtradas = allTabs.filter(tab =>
            parsedMotivos.includes(tab)
        );

        // fallback de segurança
        return filtradas.length ? filtradas : allTabs;
    }, [parsedMotivos]);

    /**
     * Aba inicial
     */
    const [activeTab, setActiveTab] = useState(
        activeTabDefault || tabs[0]
    );

    const currentTabIndex = tabs.indexOf(activeTab);
    const isFirstTab = currentTabIndex === 0;
    const isLastTab = currentTabIndex === tabs.length - 1;

    /**
     * Validação
     */
    const validateCurrentTab = async (): Promise<boolean> => {
        const fields = tabFieldsMap[activeTab];
        if (!fields?.length) return true;

        return await methods.trigger(fields);
    };

    const tabErrorMessages: Record<string, string> = {
        DADOS_PESSOAIS: "Preencha os dados pessoais.",
        DADOS_ACADEMICO: "Complete os dados académicos.",
        CONTACTOS: "Preencha os contactos.",
        CCF: "Preencha o CCF.",
        ENTIDADE: "Selecione uma entidade.",
        PREFERENCIAS: "Adicione preferências.",
        ANEXOS: "Anexe os documentos.",
    };

    const handleValidationFailure = () => {
        const message =
            tabErrorMessages[activeTab] || "Corrija os erros.";

        toast.error(message, {
            description: "Campos obrigatórios em falta.",
            duration: 5000
        });

        const firstError = Object.keys(methods.formState.errors)[0];

        if (firstError)
            methods.setFocus(firstError as keyof ManifestacaoFormData);
    };

    /**
     * NEXT
     */
    const next = async () => {
        const isValid = await validateCurrentTab();

        if (!isValid) {
            handleValidationFailure();
            return;
        }

        if (!isLastTab)
            setActiveTab(tabs[currentTabIndex + 1]);
    };

    /**
     * PREVIOUS
     */
    const previous = () => {
        if (!isFirstTab)
            setActiveTab(tabs[currentTabIndex - 1]);
    };

    /**
     * GO TO TAB
     */
    const goToTab = async (newTab: string) => {

        if (!tabs.includes(newTab)) return; // 🔥 bloqueia tabs fora do motivo

        if (newTab === activeTab) return;

        const newIndex = tabs.indexOf(newTab);
        const isAdvancing = newIndex > currentTabIndex;

        if (isAdvancing) {
            const isValid = await validateCurrentTab();

            if (!isValid) {
                handleValidationFailure();
                return;
            }
        }

        setActiveTab(newTab);
    };

    return {
        tabs,
        activeTab,
        currentTabIndex,
        isFirstTab,
        isLastTab,
        next,
        previous,
        goToTab,
        validateCurrentTab,
        handleValidationFailure,
    };
}