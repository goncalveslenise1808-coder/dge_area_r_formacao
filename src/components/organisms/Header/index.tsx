"use client";

import {Bell, Search, User, LogOut, Home} from "lucide-react";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/atoms/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms/avatar";
import { Badge } from "@/components/atoms/badge";
import { SidebarTrigger } from "@/components/atoms/sidebar";
import Link from "next/link";
import { IUser } from "@/services/profiles/type";
import { getShortName } from "@/lib/utils";
import { useState } from "react";
import {IAlertasResponse} from "@/services/notification/type";
import { Notification } from "@/components/organisms/Header/Notification/notification";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { fetchAlertasByEmail } from "./Notification/actions";
import {ModeToggle} from "@/components/organisms/ModeToggle/ModeToggle";

interface AppHeaderProps extends IUser {}

export function AppHeader({ name, email, pessoa_info }: AppHeaderProps) {
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);

    const { data, isLoading, error, mutate } = useSWR(
        email ? ["alertas", email] : null,
        async () => {
            const r = await fetchAlertasByEmail(email ?? null);
            return (r.ok ? (r.data as IAlertasResponse) : null) as IAlertasResponse | null;
        },
        { revalidateOnFocus: false }
    );

    const alertas = data

    const count = isLoading || error || !alertas ? 0 : alertas.ativas.filter((item) => item.flagLeitura === "NAO").length;

    function handleLogout() {
    const callbackUrl = process.env.NEXT_PUBLIC_CENTRAL_BASE_URL || "";
    const logoutUrl = `${process.env.NEXT_PUBLIC_CENTRAL_BASE_URL}/api/auth/external/logout?redirectUrl=${encodeURIComponent(
      callbackUrl
    )}`;
    window.location.href = logoutUrl;
  }

  const foto = pessoa_info?.foto || "/placeholder-avatar.jpg";
  const shortName = getShortName(name);
  const initials = shortName
    ? shortName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  return (
    <header className="sticky top-0 h-16 z-50 w-full border-b border-gray-200 dark:border-white/10 bg-card/30 backdrop-blur-xs">
      <div className="flex h-full items-center px-6 gap-4">
        <SidebarTrigger className="w-8 h-8" />
        <h3 className="text-muted-foreground text-sm font-primary font-medium">Formação</h3>
        <div className="flex-1 flex items-center gap-4">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary dark:text-muted-foreground" />
            <Input
              placeholder="Pesquisar..."
              className="pl-10 h-10 border bg-gray-200/70 dark:bg-white/5 backdrop-blur-xs"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
            <Link
                href={'https://dge-central-base.vercel.app/'}
                className="relative border-0 dark:hover:bg-white/5 cursor-pointer"
            >
                <Home className="w-5 h-5" />
            </Link>
          <ModeToggle/>

          <Button
            onClick={() => setIsOpen(true)}
            variant="ghost"
            size="icon"
            className="relative border-0 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
          >
            <Bell className="w-5 h-5" />
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 text-xs p-0 flex items-center justify-center"
            >
              {count}
            </Badge>
          </Button>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex flex-col text-right mr-2">
              <span className="text-sm font-medium">{shortName}</span>
              <span className="text-xs text-muted-foreground">{email}</span>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-3 h-10 px-3 border-0 hover:bg-black/5 dark:hover:bg-white/5"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="icon-blue text-white font-semibold">
                      {initials}
                    </AvatarFallback>
                    <AvatarImage className="object-cover" src={foto} />
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 border border-gray-100 dark:border-0 shadow-md dark:shadow-lg bg-card/95 backdrop-blur-xs"
              >
                <DropdownMenuLabel>
                  <div className="text-left">
                    <p className="font-medium">{shortName}</p>
                    <p className="text-xs text-muted-foreground">{email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href={`/formacao/${params?.profile}/perfil`}>
                  <DropdownMenuItem className="hover:bg-black/5 dark:hover:bg-white/5">
                    <User className="w-4 h-4 mr-2" />
                    Perfil
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-destructive hover:bg-destructive/5 dark:hover:bg-destructive/10 cursor-pointer"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Terminar Sessão
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

        {isOpen && (
            <Notification
                open={isOpen}
                setOpen={setIsOpen}
                alertas={alertas}
                mutateAlertas={(updater) =>
                    mutate((prev) => {
                        const base: IAlertasResponse = prev ?? { arquivadas: [], ativas: [] };
                        return typeof updater === "function" ? updater(base) : updater;
                    }, { revalidate: false })
                }
            />
        )}
    </header>
  );
}
