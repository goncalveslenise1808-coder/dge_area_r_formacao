import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/atoms/dialog"
import { Button } from "@/components/atoms/button"
import {
    FileText,
    Clock,
    Calendar,
    MapPin,
    User,

} from "lucide-react"

import type React from "react";
import {Manifestacao} from "@/components/templates/sgf/Manifestacao";
interface DetailManifestacaoProps{
    detailsOpen: boolean
    setDetailsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    getStatusBadge: (status: string) => React.ReactNode,
    selectedManifestacao: Manifestacao | null
}
export function DetailManifestacao({
    detailsOpen,
    setDetailsOpen,
    getStatusBadge,
    selectedManifestacao
}: DetailManifestacaoProps){
    return(
        <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Detalhes da Manifestação</DialogTitle>
                    <DialogDescription>Informações completas sobre a manifestação de interesse.</DialogDescription>
                </DialogHeader>
                {selectedManifestacao && (
                    <div className="space-y-4 py-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Status</span>
                            {getStatusBadge(selectedManifestacao.status)}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {selectedManifestacao.nif && (
                                <div className="flex items-start gap-3">
                                    <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium">NIF</p>
                                        <p className="text-sm text-muted-foreground">{selectedManifestacao.nif}</p>
                                    </div>
                                </div>
                            )}
                            {selectedManifestacao.contacto && (
                                <div className="flex items-start gap-3">
                                    <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium">Contacto</p>
                                        <p className="text-sm text-muted-foreground">{selectedManifestacao.contacto}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="space-y-3">
                            {selectedManifestacao.morada && (
                                <div className="flex items-start gap-3">
                                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium">Morada</p>
                                        <p className="text-sm text-muted-foreground">{selectedManifestacao.morada}</p>
                                    </div>
                                </div>
                            )}
                            {selectedManifestacao.entidade && (
                                <div className="flex items-start gap-3">
                                    <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium">Entidade</p>
                                        <p className="text-sm text-muted-foreground">{selectedManifestacao.entidade}</p>
                                    </div>
                                </div>
                            )}
                            <div className="flex items-start gap-3">
                                <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium">Qualificação/Curso</p>
                                    <p className="text-sm text-muted-foreground">{selectedManifestacao.formacao}</p>
                                </div>
                            </div>
                            {selectedManifestacao.modulo && (
                                <div className="flex items-start gap-3">
                                    <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium">Módulo Formativo</p>
                                        <p className="text-sm text-muted-foreground">{selectedManifestacao.modulo}</p>
                                    </div>
                                </div>
                            )}
                            <div className="flex items-start gap-3">
                                <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium">Data de Submissão</p>
                                    <p className="text-sm text-muted-foreground">{selectedManifestacao.data}</p>
                                </div>
                            </div>
                            {selectedManifestacao.disponibilidade && (
                                <div className="flex items-start gap-3">
                                    <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium">Disponibilidade</p>
                                        <p className="text-sm text-muted-foreground">{selectedManifestacao.disponibilidade}</p>
                                    </div>
                                </div>
                            )}
                            {selectedManifestacao.observacoes && (
                                <div className="flex items-start gap-3">
                                    <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium">Observações</p>
                                        <p className="text-sm text-muted-foreground">{selectedManifestacao.observacoes}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                <DialogFooter>
                    <Button variant="outline" onClick={() => setDetailsOpen(false)}>
                        Fechar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}