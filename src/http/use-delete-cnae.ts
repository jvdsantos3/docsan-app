import { api } from '@/lib/axios'
import type { Cnae } from '@/types/cnae'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteCnae = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: Cnae['id']) => {
      await api.delete(`/cnaes/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-cnaes'] })
    },
  })
}
