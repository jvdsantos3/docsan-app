import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { useApproveProfessional } from '@/http/use-approve-professional'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { AlertDialogDescription } from '@radix-ui/react-alert-dialog'

type ProfessionalApproveDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const ProfessionalApproveDialog = ({
  open,
  onOpenChange,
}: ProfessionalApproveDialogProps) => {
  const [searchParams] = useSearchParams()
  const professionalId = searchParams.get('professionalId') ?? ''
  const { mutateAsync: approveProfessional } = useApproveProfessional()

  const handleApproveProfessional = async () => {
    await approveProfessional(professionalId)
    toast.success('Profissional aprovado com sucesso!', {
      dismissible: true,
      duration: 5000,
      richColors: true,
    })
    onOpenChange(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-white sm:max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Deseja realmente aprovar este profissional?
          </AlertDialogTitle>
          <AlertDialogDescription>
            O profissional será notificado por email da aprovação
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            className={cn(buttonVariants({ variant: 'default' }))}
            onClick={handleApproveProfessional}
          >
            Aprovar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
