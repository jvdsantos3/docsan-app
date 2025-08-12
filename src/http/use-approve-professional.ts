import { api } from '@/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { Professional } from '@/types/professional'

export function useApproveProfessional() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (professionalId: Professional['id']) => {
      await api.patch(`/professionals/${professionalId}/approve`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-professional'] })
      queryClient.invalidateQueries({ queryKey: ['get-professionals'] })
    },
  })
}
