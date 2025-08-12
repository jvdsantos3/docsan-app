import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import type { GetProfessionalResponse } from '@/types/http/get-professional-response'
import type { Professional } from '@/types/professional'

export function useProfessional(professionalId: Professional['id']) {
  return useQuery({
    queryKey: ['get-professional', professionalId],
    queryFn: async () => {
      const response = await api.get<GetProfessionalResponse>(
        `/professionals/${professionalId}`,
      )
      return response.data
    },
    enabled: !!professionalId,
  })
}
