import { api } from '@/lib/axios'
import type { RegistryType } from '@/types/registry-type'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useToggleStatusRegistryType() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (registryTypeId: RegistryType['id']) => {
      await api.patch(`/registry-types/${registryTypeId}/active`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-registry-type'] })
      queryClient.invalidateQueries({ queryKey: ['get-registry-types'] })
    },
  })
}
