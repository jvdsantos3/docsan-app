import { api } from '@/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { CreateRegistryTypeRequest } from '@/types/http/create-registry-type-request'

export function useCreateRegistryType() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      data,
    }: {
      data: CreateRegistryTypeRequest
    }) => {
      await api.post(`/registry-types`, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-registry-types'] })
    },
  })
}
