import { DocumentTypeForm } from '@/components/forms/document-type-form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { UpdateDocumentTypeRequest } from '@/http/types/update-document-type-request'
import { useDocumentType } from '@/http/use-document-type'
import { useUpdateDocumentType } from '@/http/use-update-document-type'
import { useSearchParams } from 'react-router-dom'

type UpdateDocumentTypeDialog = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const UpdateDocumentTypeDialog = ({
  open,
  onOpenChange,
}: UpdateDocumentTypeDialog) => {
  const [searchParams] = useSearchParams()
  const documentTypeId = searchParams.get('documentTypeId')
  const { data: documentType, isLoading } = useDocumentType(documentTypeId)
  const { mutateAsync: updateDocumentType } = useUpdateDocumentType()

  async function handleUpdateDocumentType(data: UpdateDocumentTypeRequest) {
    if (!documentTypeId) return

    await updateDocumentType({
      id: documentTypeId,
      data: {
        name: data.name,
        fields: data.fields,
      },
    })
    onOpenChange(false)
  }

  if (isLoading) {
    return <div>Carregando...</div>
  }

  if (!documentType) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Editar tipo de documento</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div>
          <DocumentTypeForm
            onSubmit={handleUpdateDocumentType}
            onCancel={() => onOpenChange(false)}
            documentType={documentType}
            isEdit
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
