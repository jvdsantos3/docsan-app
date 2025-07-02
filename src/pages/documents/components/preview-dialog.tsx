import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

type DocumentPreviewDialogProps = {
  documentId: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export const DocumentPreviewDialog = ({
  documentId,
  onOpenChange,
}: DocumentPreviewDialogProps) => {
  return (
    <Dialog open={!!documentId} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pré-visualização</DialogTitle>
        </DialogHeader>
        <div>{documentId}</div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
