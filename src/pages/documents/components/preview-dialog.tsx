import { Badge } from '@/components/ui/badge'
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
import { ScrollArea } from '@/components/ui/scroll-area'
import { env } from '@/config/env'
import { useAuth } from '@/hooks/use-auth'
import { useDocument } from '@/http/use-document'
import { api } from '@/lib/axios'
import { Viewer } from '@react-pdf-viewer/core'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

type DocumentPreviewDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const DocumentPreviewDialog = ({
  open,
  onOpenChange,
}: DocumentPreviewDialogProps) => {
  const { user, authToken } = useAuth()
  const [searchParams] = useSearchParams()
  const [fileUrl, setFileUrl] = useState('')
  const documentId = searchParams.get('documentId') ?? ''
  const companyId = user?.profile?.companyId ?? ''
  const { data: document, isLoading } = useDocument(documentId, companyId)

  useEffect(() => {
    async function fetchFileUrl() {
      const res = await api.get(
        `/company/${companyId}/documents/${documentId}/export`,
        { responseType: 'blob' },
      )
      const url = window.URL.createObjectURL(new Blob([res.data]))
      setFileUrl(url.replace('blob:', ''))
    }

    if (document) {
      fetchFileUrl()
    }
  }, [document, companyId, documentId])

  if (!document) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white sm:max-w-2xl">
        <DialogHeader>
          <div className="flex justify-between items-start pr-6">
            <div>
              <DialogTitle>Pré-visualização</DialogTitle>
              <DialogDescription></DialogDescription>
            </div>

            {document.status === 'won' ? (
              <Badge variant="destructive" className="font-bold text-white">
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
        </DialogHeader>

        <div className="space-y-4">
          <p className="font-medium text-lg text-blue-1000">{document.name}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="font-medium text-gray-600">Tipo</p>
              <p>{document.documentType.name}</p>
            </div>
            <div>
              <p className="font-medium text-gray-600">Recebido em</p>
              <p>
                {new Intl.DateTimeFormat('pt-BR', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                }).format(new Date(document.createdAt))}
              </p>
            </div>
            <div>
              <p className="font-medium text-gray-600">Vencimento</p>
              <p>
                {document.duedate &&
                  new Intl.DateTimeFormat('pt-BR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  }).format(new Date(document.duedate))}
              </p>
            </div>
          </div>

          {fileUrl && (
            <ScrollArea className="h-96">
              <Viewer
                fileUrl={`${env.VITE_API_BASE_URL}/company/${companyId}/documents/${documentId}/export`}
                httpHeaders={{
                  Authorization: `Bearer ${authToken}`,
                }}
                // withCredentials={true}
              />
            </ScrollArea>
          )}
        </div>

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
