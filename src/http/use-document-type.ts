import { api } from '@/lib/axios'
import type { DocumentType } from '@/types/document-type'
import type { GetDocumentTypeResponse } from '@/types/http/get-document-type-response'
import { useQuery } from '@tanstack/react-query'

export function useDocumentType(
  documentTypeId: DocumentType['id'],
  companyId: DocumentType['companyId'],
) {
  return useQuery({
    queryKey: ['get-document-type', documentTypeId],
    queryFn: async () => {
      const response = await api.get<GetDocumentTypeResponse>(
        `/company/${companyId}/document-types/${documentTypeId}`,
      )
      return response.data
    },
    enabled: !!documentTypeId && !!companyId,
  })
}
