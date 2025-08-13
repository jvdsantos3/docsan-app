import { api } from '@/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { ReproveProfessionalRequest } from '@/types/http/reprove-professional-request '
import type { Professional } from '@/types/professional'

export function useReproveProfessional() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: Professional['id']
      data: ReproveProfessionalRequest
    }) => {
      await api.patch(`/professionals/${id}/reject`, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-professional'] })
      queryClient.invalidateQueries({ queryKey: ['get-professionals'] })
      queryClient.invalidateQueries({ queryKey: ['get-professionals-summary'] })
    },
  })
}
