import { api } from '@/lib/axios'
import type { GetServiceResponse } from '@/types/http/get-service-response'
import type { Service } from '@/types/service'
import { useQuery } from '@tanstack/react-query'

export const useService = (id: Service['id']) => {
  return useQuery({
    queryKey: ['get-service', id],
    queryFn: async () => {
      const response = await api.get<GetServiceResponse>(`/services/${id}`)
      return response.data.service
    },
    enabled: !!id,
  })
}
