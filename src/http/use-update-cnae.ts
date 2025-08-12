import { api } from '@/lib/axios'
import type { Cnae } from '@/types/cnae'
import type { UpdateCnaeRequest } from '@/types/http/update-cnae-request'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateCnae = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: Cnae['id']
      data: UpdateCnaeRequest
    }) => {
      await api.put(`/cnaes/${id}`, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-cnae'] })
      queryClient.invalidateQueries({ queryKey: ['get-cnaes'] })
    },
  })
}
