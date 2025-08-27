import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useCreateRegistryType } from '@/http/use-create-registry-type'
import type { RegistryTypeFormSchema } from '../forms/registry-type-form/schema'
import { toast } from 'sonner'
import { RegistryTypeForm } from '../forms/registry-type-form'

type CreateRegistryTypeDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  branchActivityId: string
}

export const CreateRegistryTypeDialog = ({
  open,
  onOpenChange,
  branchActivityId,
}: CreateRegistryTypeDialogProps) => {
  const { mutateAsync: createRegistryType, error: createError } =
    useCreateRegistryType()

  const handleCreateRegistryType = async (data: RegistryTypeFormSchema) => {
    await createRegistryType({
      data: {
        name: data.name,
        fullName: data.fullName,
        branchActivityId,
      },
    })
    toast.success('Tipo de registro criado com sucesso!', {
      dismissible: true,
      duration: 5000,
      richColors: true,
    })
    onOpenChange(false)
  }

  if (createError) {
    toast.error('Erro ao criar tipo de registro. Tente novamente.', {
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
          <DialogTitle>Adicionar novo tipo de registro</DialogTitle>
          <DialogDescription>
            Crie um novo tipo de registro profissional.
          </DialogDescription>
        </DialogHeader>

        <div>
          <RegistryTypeForm
            onCancel={() => onOpenChange(false)}
            onSubmit={handleCreateRegistryType}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
