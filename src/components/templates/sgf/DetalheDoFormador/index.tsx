"use client"

import {useState} from "react"
import {Button} from "@/components/atoms/button"
import {Edit} from "lucide-react"
import {ProfessionalInfoCard} from "@/components/templates/sgf/DetalheDoFormador/components/ProfessionalInfoCard";
import {InstructorProfileCard} from "@/components/templates/sgf/DetalheDoFormador/components/InstructorProfileCard";
import {EditProfileDialog} from "@/components/templates/sgf/DetalheDoFormador/components/EditProfileDialog";

interface DetalheDoFormadorProps {
    account: any
}

export function DetalhesFormadorTemplate(props: DetalheDoFormadorProps) {
    const {account} = props
    const [isEditOpen, setIsEditOpen] = useState(false)

    const handleOpenEdit = () => {
        setIsEditOpen(true)
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Detalhes do Formador</h1>
                    <p className="text-muted-foreground">Visualize e edite suas informações de perfil</p>
                </div>
                <Button onClick={handleOpenEdit}>
                    <Edit className="mr-2 h-4 w-4"/>
                    Editar Perfil
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <InstructorProfileCard account={account}/>
                <ProfessionalInfoCard/>
            </div>

            <EditProfileDialog isEditOpen={isEditOpen} setIsEditOpen={setIsEditOpen}/>
        </div>
    )
}
