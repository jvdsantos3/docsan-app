import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { getLeadStatusBadge } from '../get-status-badge'
import type { Lead } from '../columns'

type LeadStatusChangeDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  leadId: string
  leads: Lead[]
  newStatus: Lead['status']
}

const statusMessages = {
  NEW: {
    title: 'Marcar Lead como Novo',
    description: 'Tem certeza que deseja marcar este lead como novo? Esta ação indica que o lead ainda não foi contatado.',
  },
  CONTACTED: {
    title: 'Marcar Lead como Em Contato',
    description: 'Tem certeza que deseja marcar este lead como em contato? Esta ação indica que o contato inicial foi feito com o cliente em potencial.',
  },
  CONVERTED: {
    title: 'Marcar Lead como Convertido',
    description: 'Tem certeza que deseja marcar este lead como convertido? Esta ação indica que o lead se tornou um cliente pagante.',
  },
  LOST: {
    title: 'Marcar Lead como Perdido',
    description: 'Tem certeza que deseja marcar este lead como perdido? Esta ação indica que o lead não é mais um cliente em potencial.',
  },
}

export const LeadStatusChangeDialog = ({
  open,
  onOpenChange,
  leadId,
  leads,
  newStatus,
}: LeadStatusChangeDialogProps) => {
  const lead = leads.find((l) => l.id === leadId)

  if (!lead) {
    return null
  }

  const statusMessage = statusMessages[newStatus]

  const handleConfirm = () => {
    console.log(`Lead ${leadId} status changed to ${newStatus}`)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-blue-1000 font-bold font-lato">
            {statusMessage.title}
          </DialogTitle>
          <DialogDescription className="font-lato">
            {statusMessage.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-gray-600">Lead:</p>
            <p className="font-lato font-bold">{lead.name}</p>
          </div>
          
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-gray-600">Serviço:</p>
            <p className="font-lato">{lead.service}</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium text-gray-600">Status Atual:</p>
              {getLeadStatusBadge(lead.status)}
            </div>
            <div className="text-gray-400">→</div>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium text-gray-600">Novo Status:</p>
              {getLeadStatusBadge(newStatus)}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="font-lato"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            className="font-lato"
          >
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}