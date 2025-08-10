import { api } from '@/lib/axios'
import { keepPreviousData, useQuery,  } from '@tanstack/react-query'
import {
  schema,
  type GetBranchesActivitySearchParams,
} from '../types/http/get-branches-activity-search-params'
import { createQueryStringClean } from '@/utils/create-query-string-clean'
import type { GetBranchesActivityResponse } from '@/types/http/get-branches-activity-response'

export function useBranchesActivity(params: GetBranchesActivitySearchParams = {}) {
  const parsedParams = schema.safeParse(params)

  if (!parsedParams.success) {
    throw new Error('Invalid search parameters for branches activity')
  }

  return useQuery({
    queryKey: ['get-branches-activity', parsedParams.data],
    queryFn: async () => {
      const searchParams = createQueryStringClean(parsedParams.data)
      const response = await api.get<GetBranchesActivityResponse>(
        `/branches-activity?${searchParams}`,
      )

      return response.data
    },
    placeholderData: keepPreviousData,
  })
}
