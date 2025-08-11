import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { RegistryTypesTable } from './registry-types-table'
import { CreateRegistryTypeDialog } from '@/components/dialogs/create-registry-type-dialog'
import { useState } from 'react'

export const RegistryTypes = () => {
  const [createRegistryTypeDialog, setCreateRegistryTypeDialog] = useState(false)

  return (
    <div className="space-y-6 py-6">
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl">Tipos de registro profissional</h1>
          <p className="font-medium text-lg mt-4">
            Crie e gerencie os tipos de registros profissionais.
          </p>
        </div>

        <Button
          className="font-bold w-full md:w-auto"
          onClick={() => setCreateRegistryTypeDialog(true)}
        >
          <Plus />
          Adicionar tipo de registro
        </Button>
      </div>
      <div className="space-y-8">
        <div className="bg-white rounded-lg border border-gray-100">
          <RegistryTypesTable />
        </div>
      </div>
      <CreateRegistryTypeDialog
        open={createRegistryTypeDialog}
        onOpenChange={setCreateRegistryTypeDialog}
      />
    </div>
  )
}
