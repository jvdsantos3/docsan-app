import { api } from '@/lib/axios'
import type { GetRegistryTypeResponse } from '@/types/http/get-registry-type-response'
import type { RegistryType } from '@/types/registry-type'
import { useQuery } from '@tanstack/react-query'

export function useRegistryType(
  registryTypeId: RegistryType['id'],
) {
  return useQuery({
    queryKey: ['get-registry-type', registryTypeId],
    queryFn: async () => {
      const response = await api.get<GetRegistryTypeResponse>(
        `/registry-types/${registryTypeId}`,
      )
      return response.data
    },
    enabled: !!registryTypeId,
  })
}
