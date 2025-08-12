import { api } from '@/lib/axios'
import type { CreateCnaeRequest } from '@/types/http/create-cnae-request'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateCnae = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateCnaeRequest) => {
      await api.post('/cnaes', data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-cnaes'] })
    },
  })
}
