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
import { useDocument } from '@/http/use-document'
import { useSearchParams } from 'react-router-dom'
import { DetailsSkeleton } from './details-skeleton'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Badge } from '@/components/ui/badge'
import { useProfile } from '@/http/use-profile'

type DocumentDetailsDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const DocumentDetailsDialog = ({
  open,
  onOpenChange,
}: DocumentDetailsDialogProps) => {
  const { data: profile } = useProfile()
  const [searchParams] = useSearchParams()
  const documentId = searchParams.get('documentId') ?? ''
  const companyId = profile?.user.owner?.companyId ?? ''
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
                    {document.status === 'Overdue' ? (
                      <Badge
                        variant="destructive"
                        className="font-bold text-white"
                      >
                        <span>Vencido</span>
                      </Badge>
                    ) : document.status === 'Due_soon' ? (
                      <Badge className="bg-[#F58F00] font-lato font-bold text-white">
                        <span>Próximo</span>
                      </Badge>
                    ) : (
                      <Badge className="bg-green-700 font-lato font-bold text-white">
                        <span>Em dia</span>
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Data para notificação</Label>
                    <p className="text-sm font-medium">
                      {document.documentNotification ? (
                        format(
                          document.documentNotification.scheduledAt,
                          'PPP',
                          {
                            locale: ptBR,
                          },
                        )
                      ) : (
                        <span className="text-muted-foreground italic">
                          Nenhuma notificação agendada
                        </span>
                      )}
                    </p>
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
                          <div>
                            {document.documentType.metadata[index].type ===
                            'date'
                              ? format(new Date(value.value), 'PPP', {
                                  locale: ptBR,
                                })
                              : String(value.value)}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">Nenhum metadado.</p>
                )}
              </div>

              <Separator />

              <div>
                <p className="font-bold text-sm">Histórico de Alterações</p>
                {document?.actionLog?.length > 0 ? (
                  <ul className="mt-2 space-y-3">
                    {document.actionLog.map((value, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-3 rounded-md bg-gray-50 p-2 text-sm"
                      >
                        <Badge
                          className={`
                            ${
                              value.action === 'document.created'
                                ? 'bg-green-900'
                                : 'bg-blue-900'
                            } 
                            h-6 w-6 flex items-center justify-center text-xs font-bold`}
                        >
                          {value.action === 'document.created' ? 'C' : 'A'}
                        </Badge>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600">
                              {format(
                                new Date(
                                  value.action === 'document.created'
                                    ? value.createdAt
                                    : value.updatedAt,
                                ),
                                'PPP',
                                { locale: ptBR },
                              )}
                            </span>
                          </div>
                          <p className="mt-1 text-gray-700">
                            {value.action === 'document.created'
                              ? 'Criado'
                              : 'Atualizado'}{' '}
                            por{' '}
                            <span className="font-medium">
                              {value.user.role === 'OWNER'
                                ? value.user.owner?.name
                                : value.user.professional?.name}
                            </span>
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-sm text-gray-500">
                    Nenhum registro de alterações encontrado.
                  </p>
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
