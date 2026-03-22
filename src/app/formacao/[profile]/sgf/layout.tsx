import {ReactNode} from 'react';
import {EquivalenciaProvider} from "@/components/templates/equivalencia/pedido/context/EquivalenciaContext";
import {getCachedMyAccount} from "@/app/cache/cached-my-account";
import {getDataEquivalencia} from "@/services/equivalencia/getEquivalencia";
import NotFound from "@/components/NotFound/notFound";

export const dynamic = "force-dynamic";

interface ManifestacaoLayoutProps {
    children: ReactNode;
}

export default async function ManifestacaoLayout(props: ManifestacaoLayoutProps) {

    const {children} = props;

    const user = await getCachedMyAccount();

    const data = await getDataEquivalencia({
        app_dad: "sgf",
        pessoa_id: user?.pessoa_info?.id,
        tipo: "MANIFESTACAO_INTERESSE",
    });

    if (!data) return <NotFound/>;

    return (
        <EquivalenciaProvider
            user={user}
            data={data}
        >
            {children}
        </EquivalenciaProvider>
    );
}
