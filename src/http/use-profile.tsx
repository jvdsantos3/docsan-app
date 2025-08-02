import { api } from '@/lib/axios'
import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import type { GetProfileResponse } from '@/types/http/get-profile-response'

export const useProfile = (
  options?: Partial<UseQueryOptions<GetProfileResponse>>,
) => {
  return useQuery({
    queryKey: ['get-profile'],
    queryFn: async () => {
      const response = await api.get<GetProfileResponse>('/profile')
      return response.data
    },
    ...options,
  })
}
