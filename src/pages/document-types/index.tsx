import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { DocumentTypesTable } from './document-types-table'
import { CreateDocumentTypeDialog } from '@/components/dialogs/create-document-type-dialog'
import { useState } from 'react'

export const DocumentTypes = () => {
  const [createDocTypeDialog, setCreateDocTypeDialog] = useState(false)

  return (
    <div className="space-y-6 py-6">
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl">Meus tipos documentos</h1>
          <p className="font-medium text-lg mt-4">
            Crie e gerencie seus tipos de documentos com facilidade.
          </p>
        </div>

        <Button
          className="font-bold"
          onClick={() => setCreateDocTypeDialog(true)}
        >
          <Plus />
          Adicionar tipo de documento
        </Button>
      </div>

      <div className="space-y-8">
        <div className="bg-white rounded-lg border border-gray-100">
          <DocumentTypesTable />
        </div>
      </div>

      <CreateDocumentTypeDialog
        open={createDocTypeDialog}
        onOpenChange={setCreateDocTypeDialog}
      />
    </div>
  )
}
