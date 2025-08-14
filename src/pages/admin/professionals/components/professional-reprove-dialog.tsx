import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { ProfessionalReproveForm } from '@/components/forms/professional-reprove-form'
import type { ReproveProfessionalRequest } from '@/types/http/reprove-professional-request'
import { useReproveProfessional } from '@/http/use-reprove-professional'

type ProfessionalReproveDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const ProfessionalReproveDialog = ({
  open,
  onOpenChange,
}: ProfessionalReproveDialogProps) => {
  const [searchParams] = useSearchParams()
  const professionalId = searchParams.get('professionalId') || ''
  const { mutateAsync: reproveProfessionals, error: updateError } =
    useReproveProfessional()

  async function handleReproveProfessionals(data: ReproveProfessionalRequest) {
    if (!professionalId) return

    await reproveProfessionals({
      id: professionalId,
      data: {
        reason: data.reason,
      },
    })
    toast.success('Profissional reprovado com sucesso!', {
      dismissible: true,
      duration: 5000,
      richColors: true,
    })
    onOpenChange(false)
  }

  if (updateError) {
    toast.error('Erro ao reprovar profissional. Tente novamente.', {
      dismissible: true,
      duration: 5000,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>
            Tem certeza que deseja reprovar o profissional?
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div>
          <ProfessionalReproveForm
            onSubmit={handleReproveProfessionals}
            onCancel={() => onOpenChange(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
