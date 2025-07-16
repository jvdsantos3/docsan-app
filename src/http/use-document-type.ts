import { api } from '@/lib/axios'
import type { DocumentType } from '@/types/document-type'
import type { GetDocumentTypeResponse } from './types/get-document-type-response'
import { useQuery } from '@tanstack/react-query'

export function useDocumentType(documentTypeId: DocumentType['id'] | null) {
  return useQuery({
    queryKey: ['get-document-type'],
    queryFn: async () => {
      const response = await api.get<GetDocumentTypeResponse>(
        `/document-types/${documentTypeId}`,
      )
      return response.data
    },
    enabled: !!documentTypeId,
  })
}
