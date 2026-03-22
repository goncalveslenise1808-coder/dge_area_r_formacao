import {ReactNode} from "react";
import {SidebarInset, SidebarProvider} from "@/components/atoms/sidebar";
import {AppSidebar} from "@/components/organisms/Sidebar";
import {AppHeader} from "@/components/organisms/Header";
import {getCachedMyAccount} from "../../cache/cached-my-account";
import {getProfilesByUserAndAppCode} from "@/services/profiles/getProfilesByUserAndAppCode";
import { USE_MOCK_DATA, mockMyAccount } from "@/services/mock/data";

type ProfileLayoutProps = {
    children: ReactNode;
    params: Promise<{ profile: string }>;
};

export default async function ProfileLayout({
                                                children,
                                                params,
                                            }: ProfileLayoutProps) {
    const {profile} = await params;
    const account: any = await getCachedMyAccount() ?? (USE_MOCK_DATA ? mockMyAccount : null);

    if (!account) {
        return null;
    }

    // Obter email e id do utilizador
    const userEmail = account?.user?.email ?? account?.email;
    const userId = account?.user?.user_id ?? account?.id;

    let profilesApi;
    try {
        profilesApi = await getProfilesByUserAndAppCode({
            user_email: userEmail,
            user_id: userId,
        });
    } catch {
        profilesApi = null;
    }

    return (
        <SidebarProvider>
            <div className="min-h-screen  flex w-full ">
                <AppSidebar initialProfileKey={profile} profiles={profilesApi!}/>

                <SidebarInset className="flex-1 flex flex-col min-w-0 w-full">
                    <AppHeader {...account}  />

                    <main className="flex-1 flex flex-col min-h-0 w-full">
                        {children}
                    </main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}
