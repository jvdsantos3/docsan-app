import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useCreateServiceArea } from '@/http/use-create-service-area'
import type { CreateServiceAreaRequest } from '@/types/http/create-service-area-request'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/use-auth'
import { useProfile } from '@/http/use-profile'
import { ServiceAreaForm } from '../forms/service-area-form'

type CreateServiceAreaDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const CreateServiceAreaDialog = ({
  open,
  onOpenChange,
}: CreateServiceAreaDialogProps) => {
  const { user } = useAuth()
  const { data: profile } = useProfile({ enabled: !!user })
  const { mutateAsync: createServiceArea, error: createError } =
    useCreateServiceArea()

  const handleCreateServiceArea = async (data: CreateServiceAreaRequest) => {
    const companyId = profile?.user?.owner?.companyId

    if (!companyId) {
      return
    }

    await createServiceArea({
      companyId,
      data: {
        name: data.name,
      },
    })
    toast.success('Área de atuação criada com sucesso!', {
      dismissible: true,
      duration: 5000,
      richColors: true,
    })
    onOpenChange(false)
  }

  if (createError) {
    toast.error('Erro ao criar área de atuação. Tente novamente.', {
      dismissible: true,
      duration: 5000,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="bg-white sm:max-w-2xl"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Adicionar nova área de atuação</DialogTitle>
          <DialogDescription>Crie uma nova área de atuação.</DialogDescription>
        </DialogHeader>

        <div>
          <ServiceAreaForm
            onCancel={() => onOpenChange(false)}
            onSubmit={handleCreateServiceArea}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
