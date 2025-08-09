import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
// import { useCreateBranchActivity } from '@/http/use-create-branch-activity'
// import type { CreateBranchActivityRequest } from '@/types/http/create-branch-activity-request'
// import { toast } from 'sonner'
// import { useAuth } from '@/hooks/use-auth'
// import { useProfile } from '@/http/use-profile'
// import { BranchActivityForm } from '../forms/branch-activity-form'

type CreateBranchActivityDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const CreateBranchActivityDialog = ({
  open,
  onOpenChange,
}: CreateBranchActivityDialogProps) => {
  // const { user } = useAuth()
  // const { data: profile } = useProfile({ enabled: !!user })
  // const { mutateAsync: createBranchActivity, error: createError } =
  //   useCreateBranchActivity()

  // const handleCreateBranchActivity = async (
  //   data: CreateBranchActivityRequest,
  // ) => {
  //   const companyId = profile?.user?.owner?.companyId

  //   if (!companyId) {
  //     return
  //   }

  //   await createBranchActivity({
  //     companyId,
  //     data: {
  //       name: data.name,
  //     },
  //   })
  //   toast.success('Área de atuação criada com sucesso!', {
  //     dismissible: true,
  //     duration: 5000,
  //     richColors: true,
  //   })
  //   onOpenChange(false)
  // }

  // if (createError) {
  //   toast.error('Erro ao criar área de atuação. Tente novamente.', {
  //     dismissible: true,
  //     duration: 5000,
  //   })
  // }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="bg-white sm:max-w-2xl"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Adicionar nova área de atuação</DialogTitle>
          <DialogDescription>Crie uma nova área de atuação.</DialogDescription>
        </DialogHeader>

        <div>
          {/* <BranchActivityForm
            onCancel={() => onOpenChange(false)}
            onSubmit={handleCreateBranchActivity}
          /> */}
        </div>
      </DialogContent>
    </Dialog>
  )
}
