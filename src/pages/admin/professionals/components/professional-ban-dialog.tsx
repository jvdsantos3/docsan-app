import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { ProfessionalBanForm } from '@/components/forms/professional-ban-form'
import type { BanProfessionalRequest } from '@/types/http/ban-professional-request '
import { useBanProfessional } from '@/http/use-ban-professional '

type ProfessionalBanDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const ProfessionalBanDialog = ({
  open,
  onOpenChange,
}: ProfessionalBanDialogProps) => {
  const [searchParams] = useSearchParams()
  const professionalId = searchParams.get('professionalId') || ''
  const { mutateAsync: banProfessional, error: updateError } =
    useBanProfessional()

  const professionalBanned = searchParams.get('professionalStatus') === 'BANNED';

  async function handleBanProfessionals(data: BanProfessionalRequest) {
    if (!professionalId) return

    await banProfessional({
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
          <DialogTitle>{professionalBanned ? 'Tem certeza que deseja desbanir este profissional?' : ''}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div>
          <ProfessionalBanForm
            onSubmit={handleBanProfessionals}
            onCancel={() => onOpenChange(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
