// import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
// import type { GetProfessionalsSummaryResponse } from '@/types/http/get-professionals-summary-response'

export const useProfessionalsSummary = () => {
  return useQuery({
    queryKey: ['get-professionals-summary'],
    queryFn: async () => {
      // const response = await api.get<GetDocumentsSummaryResponse>(
      //   `/company/${companyId}/documents/summary`,
      // )
      // return response.data
      const response = {
        summary: {
          pending: 1,
          approved: 20,
          reproved: 35,
          total: 56,
        }
      }
      return response
    },
    // enabled: !!companyId,
  })
}
