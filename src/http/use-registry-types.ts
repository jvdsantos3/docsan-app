import { api } from '@/lib/axios'
import { keepPreviousData, useQuery,  } from '@tanstack/react-query'
import {
  schema,
  type GetRegistryTypesSearchParams,
} from '../types/http/get-registry-types-search-params'
import { createQueryStringClean } from '@/utils/create-query-string-clean'
import type { GetRegistryTypesResponse } from '@/types/http/get-registry-types-response'

export function useRegistryTypes(params: GetRegistryTypesSearchParams = {}) {
  const parsedParams = schema.safeParse(params)

  if (!parsedParams.success) {
    throw new Error('Invalid search parameters for registry types')
  }

  return useQuery({
    queryKey: ['get-use-registry-types', parsedParams.data],
    queryFn: async () => {
      const searchParams = createQueryStringClean(parsedParams.data)
      const response = await api.get<GetRegistryTypesResponse>(
        `/registry-types?${searchParams}`,
      )
      return response.data
    },
    placeholderData: keepPreviousData,
  })
}
