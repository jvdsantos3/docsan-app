import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import { format } from 'date-fns'
import { getLeadStatusBadge } from '../get-status-badge'
import type { Lead } from '../columns'

type LeadDetailsDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  leadId: string
  leads: Lead[]
}

export const LeadDetailsDialog = ({
  open,
  onOpenChange,
  leadId,
  leads,
}: LeadDetailsDialogProps) => {
  const lead = leads.find((l) => l.id === leadId)

  if (!lead) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white flex flex-col max-h-[85vh] sm:max-w-[40vw]">
        <DialogHeader className="flex flex-row justify-between items-center">
          <DialogTitle className="text-blue-1000 font-bold font-lato">
            Lead Details
          </DialogTitle>
          <div className="mr-10 p-1">
            {getLeadStatusBadge(lead.status)}
          </div>
        </DialogHeader>

        <div className="overflow-auto">
          <div className="space-y-4">
            <div>
              <p className="text-blue-1000 text-sm">Personal Information</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 font-lato">
                <div className="flex flex-col gap-2">
                  <Label className="text-gray-600">Full Name</Label>
                  <p className="text-sm font-medium">
                    {lead.name}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-gray-600">Email</Label>
                  <p className="text-sm font-medium break-words">
                    {lead.email}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-gray-600">Phone</Label>
                  <p className="text-sm font-medium">
                    {lead.phone}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-gray-600">Registration Date</Label>
                  <p className="text-sm font-medium">
                    {format(new Date(lead.createdAt), 'MM/dd/yyyy')}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <p className="text-sm text-blue-1000">
                Service Information
              </p>

              <div className="grid grid-cols-1 gap-4 mt-2 font-lato">
                <div className="flex flex-col gap-2">
                  <Label className="text-gray-600">Requested Service</Label>
                  <p className="text-sm font-medium">
                    {lead.service}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-gray-600">Current Status</Label>
                  <div className="flex items-center">
                    {getLeadStatusBadge(lead.status)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}