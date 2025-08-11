import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useRegistryType } from '@/http/use-registry-type'
import { useUpdateRegistryType } from '@/http/use-update-registry-type'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import type { UpdateRegistryTypeRequest } from '@/types/http/update-registry-type-request'
import { RegistryTypeForm } from '@/components/forms/registry-type-form'

type UpdateRegistryTypeDialog = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const UpdateRegistryTypeDialog = ({
  open,
  onOpenChange,
}: UpdateRegistryTypeDialog) => {
  const [searchParams] = useSearchParams()
  const registryTypeId = searchParams.get('registryTypeId') || ''
  const { data: registryType, isLoading } = useRegistryType(registryTypeId)
  const { mutateAsync: updateRegistryType, error: updateError } =
    useUpdateRegistryType()

  async function handleUpdateRegistryType(data: UpdateRegistryTypeRequest) {
    if (!registryTypeId) return

    await updateRegistryType({
      id: registryTypeId,
      data: {
        name: data.name,
      },
    })
    toast.success('Tipo de registro atualizado com sucesso!', {
      dismissible: true,
      duration: 5000,
      richColors: true,
    })
    onOpenChange(false)
  }

  if (isLoading) {
    return <div>Carregando...</div>
  }

  if (!registryType) {
    return null
  }

  if (updateError) {
    toast.error('Erro ao atualizar tipo de registro profissional. Tente novamente.', {
      dismissible: true,
      duration: 5000,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Editar tipo de registro</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div>
          <RegistryTypeForm
            onSubmit={handleUpdateRegistryType}
            onCancel={() => onOpenChange(false)}
            registryType={registryType}
            isEdit
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
