"use client"

import {TabsList, TabsTrigger} from "@/components/atoms/tabs"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/atoms/select"
import {Building2, FileText, MapPin, Paperclip, School, Settings, User} from "lucide-react"
import {useEffect, useState} from "react"

interface ModalTabsListProps {
    value: string
    onChange: (value: string) => void
}

const tabs = [
    {value: "DADOS_PESSOAIS", label: "Dados Pessoais", icon: User},
    {value: "DADOS_ACADEMICO", label: "Dados Académico", icon: School},
    {value: "CONTACTOS", label: "Contactos", icon: MapPin},
    {value: "CCF", label: "CCF", icon: FileText},
    {value: "ENTIDADE", label: "Entidade", icon: Building2},
    {value: "PREFERENCIAS", label: "Preferências", icon: Settings},
    {value: "ANEXOS", label: "Anexos", icon: Paperclip},
];

export function ModalTabsList({value, onChange}: ModalTabsListProps) {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768)
        check()
        window.addEventListener("resize", check)
        return () => window.removeEventListener("resize", check)
    }, [])

    // Mobile: Select dropdown
    if (isMobile) {
        return (
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecionar secção"/>
                </SelectTrigger>
                <SelectContent>
                    {tabs.map((tab) => {
                        const Icon = tab.icon
                        return (
                            <SelectItem key={tab.value} value={tab.value}>
                                <div className="flex items-center gap-2">
                                    <Icon className="h-4 w-4"/>
                                    <span>{tab.label}</span>
                                </div>
                            </SelectItem>
                        )
                    })}
                </SelectContent>
            </Select>
        )
    }

    // Tablet & Desktop: Tabs
    return (
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 gap-1 h-auto p-1 dark:bg-[#081325]">
            {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                    <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className="flex items-center justify-center gap-1.5 px-2 py-2.5 text-xs lg:text-sm whitespace-nowrap data-[state=active]:bg-background dark:data-[state=active]:bg-[#1d293d]  data-[state=active]:shadow-sm"
                    >
                        <Icon className="h-3.5 w-3.5 lg:h-4 lg:w-4 shrink-0"/>
                        <span className="hidden sm:inline truncate">{tab.label}</span>
                    </TabsTrigger>
                )
            })}
        </TabsList>
    )
}
