import { api } from '@/lib/axios'
import type { Cnae } from '@/types/cnae'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useToggleStatusCnae = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id }: { id: Cnae['id'] }) => {
      await api.patch(`/cnaes/${id}/active`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-cnae'] })
      queryClient.invalidateQueries({ queryKey: ['get-cnaes'] })
    },
  })
}
