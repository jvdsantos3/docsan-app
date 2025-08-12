import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import type { GetProfessionalsSummaryResponse } from '@/types/http/get-professionals-summary-response'

export const useProfessionalsSummary = () => {
  return useQuery({
    queryKey: ['get-professionals-summary'],
    queryFn: async () => {
      const response = await api.get<GetProfessionalsSummaryResponse>(
        `/professionals/summary`,
      )
      return response.data
    },
  })
}
