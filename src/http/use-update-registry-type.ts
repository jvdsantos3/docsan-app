import { api } from '@/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { RegistryType } from '@/types/registry-type'
import type { UpdateRegistryTypeRequest } from '@/types/http/update-registry-type-request'

export function useUpdateRegistryType() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: RegistryType['id']
      data: UpdateRegistryTypeRequest
    }) => {
      await api.put(`/registry-types/${id}`, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-registry-types'] })
    },
  })
}
