import { Button } from "@/components/atoms/button"
import { Save } from "lucide-react"
import {CardAreaFormacao} from "@/components/templates/sgf/Preferencias/components/CardAreaFormacao";
import {CardNotificacoes} from "@/components/templates/sgf/Preferencias/components/CardNotificacoes";
import {
    WeeklyAvailabilityCard
} from "@/components/templates/sgf/Preferencias/components/WeeklyAvailabilityCard";

export function PreferenciasTemplate() {

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Preferências do Formador</h1>
          <p className="text-muted-foreground">Configure suas preferências de formação e disponibilidade</p>
        </div>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Guardar Alterações
        </Button>
      </div>

        {/* Components Áreas de Formação e Notificações */}
      <div className="grid gap-6 md:grid-cols-2">
        <CardAreaFormacao/>
        <CardNotificacoes/>
      </div>

        {/* Component Disponibilidade Semanal */}
      <WeeklyAvailabilityCard/>
    </div>
  )
}
