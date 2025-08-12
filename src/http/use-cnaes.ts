import { api } from '@/lib/axios'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import {
  schema,
  type GetCnaesSearchParams,
} from '../types/http/get-cnaes-search-params'
import { createQueryStringClean } from '@/utils/create-query-string-clean'
import type { GetCnaesResponse } from '@/types/http/get-cnaes-response'

export function useCnaes(params: GetCnaesSearchParams = {}) {
  const parsedParams = schema.safeParse(params)

  if (!parsedParams.success) {
    throw new Error('Invalid search parameters for cnaes')
  }

  return useQuery({
    queryKey: ['get-cnaes', parsedParams.data],
    queryFn: async () => {
      const searchParams = createQueryStringClean(parsedParams.data)
      const response = await api.get<GetCnaesResponse>(`/cnaes?${searchParams}`)
      return response.data
    },
    placeholderData: keepPreviousData,
  })
}
