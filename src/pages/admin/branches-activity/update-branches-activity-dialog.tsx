import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useBranchActivity } from '@/http/use-branch-activity'
import { useUpdateBranchActivity } from '@/http/use-update-branch-activity'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import type { UpdateBranchActivityRequest } from '@/types/http/update-branch-activity-request'
import { BranchActivityForm } from '@/components/forms/branch-activity-form'

type UpdateBranchActivityDialog = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const UpdateBranchActivityDialog = ({
  open,
  onOpenChange,
}: UpdateBranchActivityDialog) => {
  const [searchParams] = useSearchParams()
  const branchActivitId = searchParams.get('branchActivitId') || ''
  const { data: branchActivity, isLoading } = useBranchActivity(branchActivitId)
  const { mutateAsync: updateBranchActivity, error: updateError } =
    useUpdateBranchActivity()

  async function handleUpdateBranchActivity(data: UpdateBranchActivityRequest) {
    if (!branchActivitId) return

    await updateBranchActivity({
      id: branchActivitId,
      data: {
        name: data.name,
      },
    })
    toast.success('Ramo de atuação atualizado com sucesso!', {
      dismissible: true,
      duration: 5000,
      richColors: true,
    })
    onOpenChange(false)
  }

  if (isLoading) {
    return <div>Carregando...</div>
  }

  if (!branchActivity) {
    return null
  }

  if (updateError) {
    toast.error('Erro ao atualizar área de atuação. Tente novamente.', {
      dismissible: true,
      duration: 5000,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Editar área de atuação</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div>
          <BranchActivityForm
            onSubmit={handleUpdateBranchActivity}
            onCancel={() => onOpenChange(false)}
            branchActivity={branchActivity}
            isEdit
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
