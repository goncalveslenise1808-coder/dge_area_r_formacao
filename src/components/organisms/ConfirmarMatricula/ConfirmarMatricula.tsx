import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/atoms/alert-dialog";
import { postConfirMatricula } from "@/services/matricula/postMatricula";
import { getDataMatricula } from "@/services/matricula/getMatricula";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface IProps {
  open: boolean | undefined;
  onClose: () => void;
  pessoaId: number | undefined;
}

export function ConfirmarMatricula({ open, onClose, pessoaId }: IProps) {
  const [enrollmentFee, setEnrollmentFee] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      getDataMatricula({ pessoaId })
        .then((data) => {
          setEnrollmentFee(data.enrollmentFee);
        })
        .catch(() => {
          setEnrollmentFee(null);
        });
    }
  }, [open, pessoaId]);

  const isIsento = enrollmentFee?.toLowerCase().includes("isento");

  async function handleConfirmar() {
    setLoading(true);
    try {
      const data = await postConfirMatricula({ pessoaId });

      if (data.success) {
        if (data.amount && data.amount > 0) {
          toast.success(
            `Pagamento necessário: ${data.amount} CVE Referência: ${data.Reference}`
          );
        } else {
          toast.success("Matrícula confirmada com isenção de taxa.");
        }
      } else {
        const dados = await getDataMatricula({ pessoaId });

        if (dados.status === "ISENTO") {
          toast.info("Já estás matriculado. Isento de taxa.");
        } else {
          // Integrar Com SISP
          toast.warning(
            `DUC já gerado. Taxa: ${dados.enrollmentFee} Referência: ${dados.duc}`
          );
        }
      }
    } catch {
      toast.error("Erro ao confirmar matrícula.");
    } finally {
      setLoading(false);
      onClose();
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar Matrícula</AlertDialogTitle>
          <AlertDialogDescription>
            {enrollmentFee === null ? (
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            ) : isIsento ? (
              "Ao confirmar a sua matrícula será matriculado em uma turma. Por favor, confirma."
            ) : (
              `Para confirmar a sua matrícula deve fazer pagamento da taxa de '${enrollmentFee}'. Prosseguir?`
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={onClose}
            className="cursor-pointer bg-red-500 hover:bg-none"
          >
            Cancelar
          </AlertDialogAction>
          <AlertDialogAction
            onClick={handleConfirmar}
            disabled={loading}
            className="cursor-pointer"
          >
            {loading ? "A processar..." : "Confirmar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
