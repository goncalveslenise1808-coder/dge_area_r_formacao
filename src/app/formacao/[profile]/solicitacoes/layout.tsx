import {ReactNode} from 'react';
import {EquivalenciaProvider} from "@/components/templates/equivalencia/pedido/context/EquivalenciaContext";
import {getCachedMyAccount} from "@/app/cache/cached-my-account";
import {getDataEquivalencia} from "@/services/equivalencia/getEquivalencia";
import NotFound from "@/components/NotFound/notFound";

export const dynamic = "force-dynamic";

export default async function SolicitacoesLayout({
                                                     children,
                                                 }: {
    children: ReactNode;
}) {

    const user = await getCachedMyAccount();

    const data = await getDataEquivalencia({
        pessoa_id: user?.pessoa_info?.id,
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
