import { Button } from '@/components/ui/button'
import { Plus, CornerUpLeft } from 'lucide-react'
import { RegistryTypesByBranchTable } from './registry-types-by-branch-table'
import { CreateRegistryTypeDialog } from '@/components/dialogs/create-registry-type-dialog'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useBranchActivity } from '@/http/use-branch-activity'

export const RegistryTypesByBranch = () => {
  const [createRegistryTypeDialog, setCreateRegistryTypeDialog] =
    useState(false)
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: branchActivity } = useBranchActivity(id!)

  return (
    <div className="space-y-6 py-6">
      <Button
        type="button"
        variant="link"
        className="text-blue-source"
        onClick={() => navigate('/admin/branches-activity')}
      >
        <CornerUpLeft /> Voltar
      </Button>

      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl">
            Tipos de registro - {branchActivity?.name}
          </h1>
          <p className="font-medium text-lg mt-4">
            Gerencie os tipos de registros profissionais para este ramo de
            atuação.
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
          <RegistryTypesByBranchTable branchActivityId={id!} />
        </div>
      </div>
      <CreateRegistryTypeDialog
        open={createRegistryTypeDialog}
        onOpenChange={setCreateRegistryTypeDialog}
        branchActivityId={id!}
      />
    </div>
  )
}
