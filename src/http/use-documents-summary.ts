import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import type { GetDocumentsSummaryResponse } from './types/get-documents-summary-response'

export const useDocumentsSummary = (companyId: string) => {
  return useQuery({
    queryKey: ['get-documents-summary'],
    queryFn: async () => {
      const response = await api.get<GetDocumentsSummaryResponse>(
        `/company/${companyId}/documents/summary`,
      )
      return response.data
    },
    enabled: !!companyId,
  })
}
