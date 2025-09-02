import { api } from '@/lib/axios'
import type { Service } from '@/types/service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useToggleStatusService = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: Service['id']) => {
      await api.patch(`/services/${id}/toggle-active`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-service'] })
      queryClient.invalidateQueries({ queryKey: ['get-services'] })
    },
  })
}
