import { api } from '@/lib/axios'
import type { ServiceArea } from '@/types/service-area'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useDeleteServiceArea() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (serviceAreaId: ServiceArea['id']) => {
      await api.delete(`/service-areas/${serviceAreaId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-service-area'] })
      queryClient.invalidateQueries({ queryKey: ['get-service-areas'] })
    },
  })
}
