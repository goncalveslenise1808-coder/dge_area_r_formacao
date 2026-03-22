import "./globals.css";
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import {Toaster} from "@/components/atoms/sonner";
import {UserProvider} from "@/contexts/UserContext";
import AutoLogin from "@/components/atoms/auto-login";
import {getCachedMyAccount} from "./cache/cached-my-account";
import {ReactQueryProvider} from "@/provider/ReactQueryProvider";
import ProgressBarProviders from "@/provider/ProgressWrapper";
import {ThemeProvider} from "next-themes";
import { USE_MOCK_DATA } from "@/services/mock/data";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Krê+ | Portal de Formação",
    description: "Plataforma de gestão de formação profissional",
};

export default async function RootLayout({
                                             children,
                                         }: {
    children: React.ReactNode;
}) {
    const data: any = await getCachedMyAccount();

    // Em modo mock, sempre renderizar a aplicação (não redirecionar para login)
    if (!data && !USE_MOCK_DATA) {
        return (
            <html lang="pt" suppressHydrationWarning>
            <body className={`${inter.className}`}>
            <AutoLogin callbackPath="/"/>
            </body>
            </html>
        );
    }

    return (
        <html lang="pt" suppressHydrationWarning>
        <body className={inter.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <UserProvider>
                {" "}
                <ReactQueryProvider>
                    <ProgressBarProviders>{children}</ProgressBarProviders>
                </ReactQueryProvider>
            </UserProvider>

            <Toaster richColors/>
        </ThemeProvider>
        </body>
        </html>
    );
}
