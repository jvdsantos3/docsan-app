import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import type { Cnae } from '@/types/cnae'
import type { GetCnaeResponse } from '@/types/http/get-cnae-response'

export function useCnae(
  cnaeId: Cnae['id'],
) {
  return useQuery({
    queryKey: ['get-cnae', cnaeId],
    queryFn: async () => {
      const response = await api.get<GetCnaeResponse>(
        `/cnaes/${cnaeId}`,
      )
      return response.data
    },
    enabled: !!cnaeId,
  })
}
