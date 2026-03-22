"use client";

import {useEffect, useMemo, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {
    Award,
    BarChart3,
    Bell,
    BookOpen,
    Building2,
    CheckCircle,
    ChevronRight,
    ClipboardList,
    CreditCard,
    DollarSign,
    FileCheck,
    FileText,
    GraduationCap,
    History,
    Home,
    MessageSquareWarning,
    Settings,
    Users,
    UserX,
} from "lucide-react";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {SidebarMenuButton, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem,} from "@/components/atoms/sidebar";
import {Collapsible, CollapsibleContent, CollapsibleTrigger,} from "@/components/atoms/collapsible";

const iconMap = {
  Home: Home,
  History: History,
  BookOpen: BookOpen,
  Bell: Bell,
  Building2: Building2,
  ClipboardList: ClipboardList,
  GraduationCap: GraduationCap,
  UserX: UserX,
  BarChart3: BarChart3,
  Award: Award,
  FileCheck: FileCheck,
  Users: Users,
  CheckCircle: CheckCircle,
  Settings: Settings,
  FileText: FileText,
  CreditCard: CreditCard,
  DollarSign: DollarSign,
  MessageSquareWarning: MessageSquareWarning,
};

function normalizePath(p: string) {
  if (!p) return "/";
  const base = p.split(/[?#]/)[0];
  return base !== "/" ? base.replace(/\/+$/, "") : base;
}

function isActiveByPrefix(normPath: string, targetPath: string) {
  const target = normalizePath(targetPath);
  if (normPath === target) return true;
  return normPath.startsWith(target + "/");
}

export function SidebarMenuItemComponent({
  item,
  isCollapsed,
  openItems,
  toggleItem,
  pathname,
  initialProfileKey: perfilRole,
}: {
  item: any;
  isCollapsed: boolean;
  openItems: string[];
  toggleItem: (title: string) => void;
  pathname: string;
  initialProfileKey?: string;
}) {
  const IconComponent = iconMap[item.icon as keyof typeof iconMap] || iconMap.Home;

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const normPath = useMemo(() => normalizePath(pathname), [pathname]);
  const buildPath = (href: string) =>
    normalizePath(`/formacao/${perfilRole ?? ""}${href ?? ""}`);

  if (item.items) {
    const groupActiveRaw =
      !isCollapsed &&
      item.items?.some((subItem: any) =>
        isActiveByPrefix(normPath, buildPath(subItem.href))
      );

    const groupHasActive = mounted && groupActiveRaw;

    return (
      <Collapsible
        open={
          groupHasActive || (!isCollapsed && openItems.includes(item.title))
        }
        onOpenChange={() => {
          if (!isCollapsed) toggleItem(item.title);
        }}
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            size="lg"
            className={cn(
              "sidebar-item w-full h-12 px-3 text-base font-medium border-0 group",
              isCollapsed ? "justify-center" : "justify-between",
              "hover:bg-white/8 hover:scale-[1.02] transition-all duration-200"
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200",
                  "bg-white/5 group-hover:bg-white/10"
                )}
              >
                <IconComponent className="w-4 h-4" />
              </div>
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.title}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            {!isCollapsed && (
              <ChevronRight
                className={cn(
                  "w-4 h-4 transition-transform duration-200",
                  (groupHasActive || openItems.includes(item.title)) &&
                    "rotate-90"
                )}
              />
            )}
          </SidebarMenuButton>
        </CollapsibleTrigger>

        <AnimatePresence>
          {!isCollapsed && (
            <CollapsibleContent>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
              >
                <SidebarMenuSub className="mt-2 space-y-1">
                  {item.items.map((subItem: any) => {
                    const targetPath = buildPath(subItem.href);
                    const activeRaw = isActiveByPrefix(normPath, targetPath);
                    const active = mounted && activeRaw;

                    return (
                      <SidebarMenuSubItem key={targetPath}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={active}
                          className={cn(
                            "min-h-10 px-3 text-sm border-0 rounded-lg transition-all duration-200 relative w-full",
                            "hover:bg-white/8 hover:translate-x-1",
                            active &&
                              "bg-linear-to-r from-blue-500/20 to-blue-600/20 text-primary border-l-2 border-blue-500"
                          )}
                        >
                          <Link href={targetPath} className="relative w-full">
                            <p className="relative w-full text-wrap wrap-break-word">
                              {subItem.title}
                            </p>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    );
                  })}
                </SidebarMenuSub>
              </motion.div>
            </CollapsibleContent>
          )}
        </AnimatePresence>
      </Collapsible>
    );
  }

  const targetPath = buildPath(item.href);
  const isRootLike = !item?.href || item.href === "/";
  const activeRaw = isRootLike
    ? normPath === targetPath
    : isActiveByPrefix(normPath, targetPath);

  const active = mounted && activeRaw;

  return (
    <SidebarMenuButton
      asChild
      size="lg"
      isActive={active}
      className={cn(
        "sidebar-item w-full h-12 px-3 text-base font-medium border-0 group transition-all duration-200",
        "hover:bg-white/8 hover:scale-[1.02]",
        active &&
          "bg-linear-to-r from-blue-500/20 to-blue-600/20 text-primary",
        isCollapsed && "justify-center"
      )}
    >
      <Link href={targetPath}>
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200",
              active
                ? "bg-blue-500/20 text-primary"
                : "bg-white/5 group-hover:bg-white/10"
            )}
          >
            <IconComponent className="w-4 h-4" />
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
                className="relative"
              >
                {item.title}
                {active && (
                  <motion.div
                    layoutId="activeMain"
                    className="absolute -left-11 top-1/2 w-1 h-8 bg-blue-500 rounded-full transform -translate-y-1/2"
                  />
                )}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </Link>
    </SidebarMenuButton>
  );
}
