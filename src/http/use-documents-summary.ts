import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import type { GetDocumentsSummary } from './types/get-documents-summary'

export const useDocumentsSummary = (companyId: string) => {
  return useQuery({
    queryKey: ['get-documents-summary'],
    queryFn: async () => {
      const response = await api.get<GetDocumentsSummary>(
        `/company/${companyId}/documents/summary`,
      )
      return response.data
    },
    enabled: !!companyId,
  })
}
