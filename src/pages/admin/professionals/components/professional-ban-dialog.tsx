import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { ProfessionalChangeBanForm } from '@/components/forms/professional-change-ban-form'
import type { ChangeBanProfessionalRequest } from '@/types/http/ban-professional-request'
import { useChangeBanProfessional } from '@/http/use-ban-professional'

type ProfessionalChangeBanDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const ProfessionalChangeBanDialog = ({
  open,
  onOpenChange,
}: ProfessionalChangeBanDialogProps) => {
  const [searchParams] = useSearchParams()
  const professionalId = searchParams.get('professionalId') || ''
  const { mutateAsync: changeBanProfessional, error: updateError } =
    useChangeBanProfessional()

  const professionalIsBanned =
    searchParams.get('professionalStatus') === 'BANNED'

  async function handleChangeBanProfessionals(
    data: ChangeBanProfessionalRequest,
  ) {
    if (!professionalId) return

    await changeBanProfessional({
      id: professionalId,
      data: {
        reason: data.reason,
      },
    })
    toast.success(
      `Profissional ${professionalIsBanned ? 'desbanido' : 'banido'} com sucesso!`,
      {
        dismissible: true,
        duration: 5000,
        richColors: true,
      },
    )
    onOpenChange(false)
  }

  if (updateError) {
    toast.error(
      `Erro ao ${professionalIsBanned ? 'desbanir' : 'banir'} profissional. Tente novamente.`,
      {
        dismissible: true,
        duration: 5000,
      },
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>{`Tem certeza que deseja ${professionalIsBanned ? 'desbanir' : 'banir'} este profissional?`}</DialogTitle>
        </DialogHeader>

        <div>
          <ProfessionalChangeBanForm
            onSubmit={handleChangeBanProfessionals}
            onCancel={() => onOpenChange(false)}
            professionalIsBanned={professionalIsBanned}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
