import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { BranchesActivityTable } from './branches-activity-table'
import { CreateBranchActivityDialog } from '@/components/dialogs/create-branch-activity-dialog'
import { useState } from 'react'

export const BranchesActivity = () => {
  const [createServAreaDialog, setCreateServAreaDialog] = useState(false)

  return (
    <div className="space-y-6 py-6">
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl">Ramos de atuação</h1>
          <p className="font-medium text-lg mt-4">
            Crie e gerencie os ramos de atuação.
          </p>
        </div>

        <Button
          className="font-bold"
          onClick={() => setCreateServAreaDialog(true)}
        >
          <Plus />
          Adicionar ramo de atuação
        </Button>
      </div>

      <div className="space-y-8">
        <div className="bg-white rounded-lg border border-gray-100">
          <BranchesActivityTable />
        </div>
      </div>

      <CreateBranchActivityDialog
        open={createServAreaDialog}
        onOpenChange={setCreateServAreaDialog}
      />
    </div>
  )
}
