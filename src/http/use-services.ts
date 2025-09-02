import { api } from '@/lib/axios'
import type { GetServicesResponse } from '@/types/http/get-services-response'
import type { GetServicesSearchParams } from '@/types/http/get-services-search-params'
import { createQueryStringClean } from '@/utils/create-query-string-clean'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export const useServices = (params: GetServicesSearchParams = {}) => {
  return useQuery({
    queryKey: ['get-services', params],
    queryFn: async () => {
      const searchParams = createQueryStringClean(params)
      const response = await api.get<GetServicesResponse>(
        `/services?${searchParams}`,
      )
      return response.data.services
    },
    placeholderData: keepPreviousData,
  })
}
