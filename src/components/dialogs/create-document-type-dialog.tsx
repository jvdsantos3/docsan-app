import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { DocumentTypeForm } from '@/components/forms/document-type-form'
import { useCreateDocumentType } from '@/http/use-create-document-type'
import type { CreateDocumentTypeRequest } from '@/http/types/create-document-type-request'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/use-auth'
import { useProfile } from '@/http/use-profile'

type CreateDocumentTypeDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const CreateDocumentTypeDialog = ({
  open,
  onOpenChange,
}: CreateDocumentTypeDialogProps) => {
  const { user } = useAuth()
  const { data: profile } = useProfile({ enabled: !!user })
  const { mutateAsync: createDocumentType, error: createError } =
    useCreateDocumentType()

  const handleCreateDocumentType = async (data: CreateDocumentTypeRequest) => {
    const companyId = profile?.user?.owner?.companyId

    if (!companyId) {
      return
    }

    await createDocumentType({
      companyId,
      data: {
        name: data.name,
        validityPeriod: data.validityPeriod,
        fields: data.fields,
      },
    })
    onOpenChange(false)
    toast.success('Tipo de documento criado com sucesso!', {
      dismissible: true,
      duration: 5000,
      description: 'Você pode agora adicionar documentos com este tipo.',
      richColors: true,
    })
  }

  if (createError) {
    toast.error('Erro ao criar tipo de documento. Tente novamente.', {
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
          <DialogTitle>Adicionar novo tipo de documento</DialogTitle>
          <DialogDescription>
            Crie um novo tipo de documento para configurar campos de extração
            específicos.
          </DialogDescription>
        </DialogHeader>

        <div>
          <DocumentTypeForm
            onCancel={() => onOpenChange(false)}
            onSubmit={handleCreateDocumentType}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
