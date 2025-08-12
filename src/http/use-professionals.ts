import { api } from '@/lib/axios'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import type { GetProfessionalsSearchParams } from '@/types/http/get-professionals-search-params'
import { createQueryStringClean } from '@/utils/create-query-string-clean'
import type { GetProfessionalsResponse } from '@/types/http/get-professionals-response'

export const useProfessionals = (params: GetProfessionalsSearchParams = {}) => {
  return useQuery({
    queryKey: ['get-professionals', params],
    queryFn: async () => {
      const searchParams = createQueryStringClean(params)
      const response = await api.get<GetProfessionalsResponse>(
        `/professionals?${searchParams}`,
      )
      return response.data
    },
    placeholderData: keepPreviousData,
  })
}
