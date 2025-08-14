import { api } from '@/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { ChangeBanProfessionalRequest } from '@/types/http/ban-professional-request'
import type { Professional } from '@/types/professional'

export function useChangeBanProfessional() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: Professional['id']
      data: ChangeBanProfessionalRequest
    }) => {
      await api.patch(`/professionals/${id}/change-ban`, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-professional'] })
      queryClient.invalidateQueries({ queryKey: ['get-professionals'] })
      queryClient.invalidateQueries({ queryKey: ['get-professionals-summary'] })
    },
  })
}
