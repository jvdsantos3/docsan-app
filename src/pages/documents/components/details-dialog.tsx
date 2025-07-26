import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useAuth } from '@/hooks/use-auth'
import { useDocument } from '@/http/use-document'
import { useSearchParams } from 'react-router-dom'
import { DetailsSkeleton } from './details-skeleton'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Badge } from '@/components/ui/badge'

type DocumentDetailsDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const DocumentDetailsDialog = ({
  open,
  onOpenChange,
}: DocumentDetailsDialogProps) => {
  const { user } = useAuth()
  const [searchParams] = useSearchParams()
  const documentId = searchParams.get('documentId') ?? ''
  const companyId = user?.profile?.companyId ?? ''
  const { data: document, isLoading } = useDocument(documentId, companyId)

  if (!document) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white flex flex-col sm:max-h-[min(640px,80vh)] sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Detalhes do documento</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <DetailsSkeleton />
        ) : (
          <div className="overflow-auto">
            <div className="space-y-4">
              <div>
                <p className="font-bold text-sm">Detalhes</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  <div className="flex flex-col gap-2">
                    <Label>Nome</Label>
                    <p className="text-sm font-medium">{document.name}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Tipo</Label>
                    <p className="text-sm font-medium">
                      {document.documentType.name}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Data de criação</Label>
                    <p className="text-sm font-medium">
                      {document.createdAt &&
                        format(document.createdAt, 'PPP HH:mm:ss', {
                          locale: ptBR,
                        })}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Data de vencimento</Label>
                    <p className="text-sm font-medium">
                      {document.duedate &&
                        format(document.duedate, 'PPP', {
                          locale: ptBR,
                        })}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Status</Label>
                    {document.status === 'won' ? (
                      <Badge
                        variant="destructive"
                        className="font-bold text-white"
                      >
                        <span>Vencido</span>
                      </Badge>
                    ) : document.status === 'near' ? (
                      <Badge className="bg-[#F58F00] font-lato font-bold text-white">
                        <span>Próximo</span>
                      </Badge>
                    ) : (
                      <Badge className="bg-green-700 font-lato font-bold text-white">
                        <span>Em dia</span>
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <p className="font-bold text-sm">Metadados</p>
                {document?.indexation?.values.length > 0 ? (
                  <ul className="mt-2 space-y-2">
                    {document?.indexation?.values.map((value, index) => (
                      <li key={index} className="text-sm">
                        <div className="grid grid-cols-2">
                          <div>{value.name}</div>
                          <div>{value.value}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">Nenhum metadado.</p>
                )}
              </div>
            </div>
          </div>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Fechar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
