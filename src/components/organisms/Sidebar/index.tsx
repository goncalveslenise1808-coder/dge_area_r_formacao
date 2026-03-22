"use client";
import {useEffect, useMemo, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import {Sidebar, SidebarContent, useSidebar,} from "@/components/atoms/sidebar";

import {SidebarFooter} from "./SidebarFooter";
import {SidebarProfileSelector} from "./SidebarProfileSelector";
import {SidebarNavigation} from "./SidebarNavigation";
import {SidebarHeader} from "./SidebarHeader";

import {navigationByProfile} from "@/services/menus";
import {buildProfilesFromResponse} from "@/services/profiles/getProfilesByUserAndAppCode/utils";
import {IProfileResponse, Profile,} from "@/services/profiles/getProfilesByUserAndAppCode/types";

interface AppSidebarProps {
    profiles: IProfileResponse;
    initialProfileKey?: string;
}

function asNavKey<T extends object>(obj: T, key: string): keyof T | undefined {
    const k = key.toLowerCase() as keyof T;
    return k in obj ? k : undefined;
}

export function AppSidebar({
                               profiles: profilesApi,
                               initialProfileKey,
                           }: AppSidebarProps) {
    const router = useRouter();
    const pathname = usePathname();
    const {state} = useSidebar();

    const realProfiles = useMemo(
        () => buildProfilesFromResponse(profilesApi),
        [profilesApi]
    );

    const initial = useMemo<Profile>(() => {
        const found =
            realProfiles.find(
                (p) => p.id === initialProfileKey || p.key === initialProfileKey
            ) ?? realProfiles[0];

        return (
            found ?? {
                key: "default_0",
                type: "DEFAULT",
                id: "default_0",
                name: "Default",
                avatar: null,
                description: null,
                pessoaId: null,
                profileId: null,
                entityId: null,
            }
        );
    }, [realProfiles, initialProfileKey]);

    const [currentProfile, setCurrentProfile] = useState<Profile>(initial);

    useEffect(() => {
        if (!initialProfileKey) return;
        const match =
            realProfiles.find(
                (p) => p.id === initialProfileKey || p.key === initialProfileKey
            ) ?? null;

        if (match && match.id !== currentProfile.id) {
            setCurrentProfile(match);
        }
    }, [initialProfileKey, realProfiles]);

    const [openItems, setOpenItems] = useState<string[]>([
        "Ofertas Formativas",
        "Minha Formação",
    ]);

    const isCollapsed = state === "collapsed";
    const navKey = asNavKey(navigationByProfile, currentProfile.type);
    const navigation = navKey ? navigationByProfile[navKey] : [];

    const toggleItem = (title: string) => {
        if (isCollapsed) return;
        setOpenItems((prev) =>
            prev.includes(title) ? prev.filter((i) => i !== title) : [...prev, title]
        );
    };

    /*const handleProfileChange = (profile: Profile) => {
      setCurrentProfile(profile);
      setOpenItems([]);

      const segments = pathname.split("/").filter(Boolean);

      if (segments[0] !== "formacao") {
        segments.unshift("formacao");
      }

      if (segments.length > 1) {
        segments[1] = profile.id;
      } else {
        segments.push(profile.id);
      }

      const next = "/" + segments.join("/");
      router.replace(next, { scroll: false });
    };*/

    const handleProfileChange = (profile: Profile) => {
        setCurrentProfile(profile);
        setOpenItems([]);

        const next = `/formacao/${profile.id}`;
        router.replace(next, {scroll: false});
    };

    return (
        <Sidebar
            className="sidebar-modern border-0 backdrop-blur-xl bg-white"
            side="left"
        >
            <SidebarContent className="bg-white dark:bg-[#020618]">
                <SidebarHeader isCollapsed={isCollapsed}/>

                {!isCollapsed && realProfiles.length > 0 && (
                    <SidebarProfileSelector
                        currentProfile={currentProfile}
                        onProfileChange={handleProfileChange}
                        profiles={realProfiles}
                    />
                )}

                <SidebarNavigation
                    menu={navigation}
                    isCollapsed={isCollapsed}
                    openItems={openItems}
                    toggleItem={toggleItem}
                    pathname={pathname}
                    initialProfileKey={initialProfileKey}
                />

                <SidebarFooter isCollapsed={isCollapsed}/>
            </SidebarContent>
        </Sidebar>
    );
}
