import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { ServiceAreasTable } from './service-areas-table'
import { CreateServiceAreaDialog } from '@/components/dialogs/create-service-area-dialog'
import { useState } from 'react'

export const ServiceAreas = () => {
  const [createServAreaDialog, setCreateServAreaDialog] = useState(false)

  return (
    <div className="space-y-6 py-6">
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl">Áreas de serviço</h1>
          <p className="font-medium text-lg mt-4">
            Crie e gerencie as áreas de serviço.
          </p>
        </div>

        <Button
          className="font-bold"
          onClick={() => setCreateServAreaDialog(true)}
        >
          <Plus />
          Adicionar área de serviço
        </Button>
      </div>

      <div className="space-y-8">
        <div className="bg-white rounded-lg border border-gray-100">
          <ServiceAreasTable />
        </div>
      </div>

      <CreateServiceAreaDialog
        open={createServAreaDialog}
        onOpenChange={setCreateServAreaDialog}
      />
    </div>
  )
}
