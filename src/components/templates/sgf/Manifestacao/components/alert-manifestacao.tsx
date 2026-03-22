import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/atoms/alert-dialog"
import {Dispatch} from "react";
import {Manifestacao} from "@/components/templates/sgf/Manifestacao";

interface AlertManifestacaoType{
    cancelOpen: boolean,
    setCancelOpen: Dispatch<React.SetStateAction<boolean>>,
    handleConfirmCancel: () => void,
    manifestacaoToCancel: Manifestacao | null
}
export function AlertManifestacao({
    cancelOpen,
    setCancelOpen,
    handleConfirmCancel,
    manifestacaoToCancel
}: AlertManifestacaoType){
    return(
        <AlertDialog open={cancelOpen} onOpenChange={setCancelOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Cancelar Manifestação</AlertDialogTitle>
                    <AlertDialogDescription>
                        Tem certeza que deseja cancelar a manifestação de interesse em &quot;{manifestacaoToCancel?.formacao}
                        &quot;? Esta ação não pode ser desfeita.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="underline cursor-pointer">Não, manter</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleConfirmCancel}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90 cursor-pointer"
                    >
                        Sim, cancelar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}