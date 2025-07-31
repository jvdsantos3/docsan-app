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
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useDocumentType } from '@/http/use-document-type'
import { CircleSmall } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useProfile } from '@/http/use-profile'
import { Badge } from '@/components/ui/badge'

type DocumentTypeDetailsDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const fieldDataType: Record<string, string> = {
  text: 'Texto',
  number: 'Número',
  date: 'Data',
}

export const DocumentTypeDetailsDialog = ({
  open,
  onOpenChange,
}: DocumentTypeDetailsDialogProps) => {
  const { data: profile } = useProfile()
  const [searchParams] = useSearchParams()
  const documentTypeId = searchParams.get('documentTypeId') || ''
  const companyId = profile?.user.owner?.companyId || ''

  const { data: documentType, isLoading } = useDocumentType(
    documentTypeId,
    companyId,
  )

  if (isLoading) {
    return <div>Carregando...</div>
  }

  if (!documentType) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Detalhes do tipo de documento</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <p className="font-bold text-sm">Detalhes</p>
            <div className="grid grid-cols-2 gap-3 mt-2">
              <div className="flex flex-col gap-1">
                <Label>Nome</Label>
                <p className="text-sm font-medium">{documentType.name}</p>
              </div>
              <div className="flex flex-col gap-1">
                <Label>Status</Label>
                <div className="flex items-center">
                  <CircleSmall
                    className={
                      documentType.isActive
                        ? 'text-green-600'
                        : 'text-[#d82020]'
                    }
                  />
                  <p className="text-sm font-medium">
                    {documentType.isActive ? 'Ativo' : 'Inativo'}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <Label>Data de criação</Label>
                <p className="text-sm font-medium text-gray-800">
                  {format(
                    documentType.createdAt.toString() as string,
                    'PPP HH:mm:ss',
                    {
                      locale: ptBR,
                    },
                  )}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <Label>Última atualização</Label>
                <p className="text-sm font-medium text-gray-800">
                  {format(
                    documentType.updatedAt.toString() as string,
                    'PPP HH:mm:ss',
                    {
                      locale: ptBR,
                    },
                  )}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <p className="font-bold text-sm">Campos configurados</p>
            <div>
              {documentType.metadata.length ? (
                <ul className="mt-2 space-y-2">
                  {documentType.metadata.map((field, index) => (
                    <li key={index} className="text-sm">
                      <div className="border border-gray-100 rounded-md p-2">
                        {field.name} ({fieldDataType[field.type.toLowerCase()]})
                        - {field.required ? 'Obrigatório' : 'Opcional'}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">
                  Nenhum campo configurado
                </p>
              )}
            </div>
          </div>

          <Separator />

          <div>
            <p className="font-bold text-sm">Histórico de Alterações</p>
            {documentType?.actionLogs?.length > 0 ? (
              <ul className="mt-2 space-y-3">
                {documentType.actionLogs.map((value, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 rounded-md bg-gray-50 p-2 text-sm"
                  >
                    <Badge
                      className={`
                        ${
                          value.action === 'document-type.created'
                            ? 'bg-green-900'
                            : 'bg-blue-900'
                        } 
                        h-6 w-6 flex items-center justify-center text-xs font-bold`}
                    >
                      {value.action === 'document-type.created' ? 'C' : 'A'}
                    </Badge>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">
                          {format(
                            new Date(
                              value.action === 'document-type.created'
                                ? value.createdAt
                                : value.updatedAt,
                            ),
                            'PPP',
                            { locale: ptBR },
                          )}
                        </span>
                      </div>
                      <p className="mt-1 text-gray-700">
                        {value.action === 'document-type.created'
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
        <DialogFooter className="sm:justify-start">
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
