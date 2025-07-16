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

type CreateDocumentTypeDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const CreateDocumentTypeDialog = ({
  open,
  onOpenChange,
}: CreateDocumentTypeDialogProps) => {
  const { mutateAsync: createDocumentType } = useCreateDocumentType()

  const handleCreateDocumentType = async (data: CreateDocumentTypeRequest) => {
    await createDocumentType({
      name: data.name,
      fields: data.fields,
    })
    onOpenChange(false)
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
