import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { CnaeForm } from './cnae-form'
import { useCreateCnae } from '@/http/use-create-cnae'
import type { CreateCnaeRequest } from '@/types/http/create-cnae-request'

type RegisterCnaeDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const RegisterCnaeDialog = ({
  open,
  onOpenChange,
}: RegisterCnaeDialogProps) => {
  const { mutateAsync: createCnae } = useCreateCnae()

  const handleCreateCnae = async (data: CreateCnaeRequest) => {
    await createCnae(data)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Adicionar novo CNAE</DialogTitle>
          <DialogDescription>
            Cadastre um novo Classificação Nacional de Atividades Econômicas
            (CNAE).
          </DialogDescription>
        </DialogHeader>

        <div>
          <CnaeForm
            onSubmit={handleCreateCnae}
            onCancel={() => onOpenChange(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
