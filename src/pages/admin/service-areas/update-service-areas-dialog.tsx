import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useServiceArea } from '@/http/use-service-area'
import { useProfile } from '@/http/use-profile'
import { useUpdateServiceArea } from '@/http/use-update-service-area'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import type { UpdateServiceAreaRequest } from '@/types/http/update-service-area-request'
import { ServiceAreaForm } from '@/components/forms/service-area-form'

type UpdateServiceAreaDialog = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const UpdateServiceAreaDialog = ({
  open,
  onOpenChange,
}: UpdateServiceAreaDialog) => {
  const { data: profile } = useProfile()
  const [searchParams] = useSearchParams()
  const serviceAreaId = searchParams.get('serviceAreaId') || ''
  const companyId = profile?.user.owner?.companyId || ''
  const { data: serviceArea, isLoading } = useServiceArea(
    serviceAreaId,
    companyId,
  )
  const { mutateAsync: updateServiceArea, error: updateError } =
    useUpdateServiceArea()

  async function handleUpdateServiceArea(data: UpdateServiceAreaRequest) {
    if (!serviceAreaId || !companyId) return

    await updateServiceArea({
      id: serviceAreaId,
      companyId,
      data: {
        name: data.name
      },
    })
    toast.success('Área de serviço atualizada com sucesso!', {
      dismissible: true,
      duration: 5000,
      richColors: true,
    })
    onOpenChange(false)
  }

  if (isLoading) {
    return <div>Carregando...</div>
  }

  if (!serviceArea) {
    return null
  }

  if (updateError) {
    toast.error('Erro ao atualizar área de serviço. Tente novamente.', {
      dismissible: true,
      duration: 5000,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Editar área de serviço</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div>
          <ServiceAreaForm
            onSubmit={handleUpdateServiceArea}
            onCancel={() => onOpenChange(false)}
            serviceArea={serviceArea}
            isEdit
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
