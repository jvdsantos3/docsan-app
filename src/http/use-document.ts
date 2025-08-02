import { api } from '@/lib/axios'
import type { Document } from '@/types/document'
import { useQuery } from '@tanstack/react-query'
import type { GetDocumentResponse } from '@/types/http/get-document-response'

export function useDocument(
  documentId: Document['id'],
  companyId: Document['companyId'],
) {
  return useQuery({
    queryKey: ['get-document', documentId],
    queryFn: async () => {
      const response = await api.get<GetDocumentResponse>(
        `/company/${companyId}/documents/${documentId}`,
      )
      return response.data
    },
    enabled: !!documentId && !!companyId,
  })
}
