import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { CnaeForm } from './cnae-form'
import { useQueryState } from 'nuqs'
import { useCnae } from '@/http/use-cnae'
import { CnaeFormSkeleton } from './cnae-form-skeleton'
import { useUpdateCnae } from '@/http/use-update-cnae'
import type { UpdateCnaeRequest } from '@/types/http/update-cnae-request'
import { toast } from 'sonner'

type UpdateCnaeDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const UpdateCnaeDialog = ({
  open = false,
  onOpenChange,
}: UpdateCnaeDialogProps) => {
  const [cnaeId] = useQueryState('cnaeId', { defaultValue: '' })
  const { data: cnae, isLoading } = useCnae(cnaeId)
  const { mutateAsync: updateCnaeFn, error: updateError } = useUpdateCnae()

  const handleUpdateCnae = async (data: UpdateCnaeRequest) => {
    await updateCnaeFn({ id: cnaeId, data })
    toast.success('CNAE atualizado com sucesso!', {
      dismissible: true,
      duration: 5000,
      richColors: true,
    })
    onOpenChange(false)
  }

  if (updateError) {
    toast.error('Erro ao atualizar CNAE. Tente novamente.', {
      dismissible: true,
      duration: 5000,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Editar CNAE</DialogTitle>
          <DialogDescription>
            Edite a Classificação Nacional de Atividades Econômicas (CNAE).
          </DialogDescription>
        </DialogHeader>

        <div>
          {isLoading ? (
            <CnaeFormSkeleton />
          ) : (
            <CnaeForm
              cnae={cnae}
              isEdit
              onSubmit={handleUpdateCnae}
              onCancel={() => onOpenChange(false)}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
