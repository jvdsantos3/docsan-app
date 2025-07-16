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
  const [searchParams] = useSearchParams()
  const documentTypeId = searchParams.get('documentTypeId')
  const { data: documentType, isLoading } = useDocumentType(documentTypeId)

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
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Fechar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
