import { api } from '@/lib/axios'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import type { GetDocumentsSearchParams } from './types/get-documents-search-params'
import { createQueryStringClean } from '@/utils/create-query-string-clean'
import type { GetDocumentsResponse } from './types/get-documents-response'

export const useDocuments = (
  companyId: string,
  params: GetDocumentsSearchParams = {},
) => {
  return useQuery({
    queryKey: ['documents', companyId, params],
    queryFn: async () => {
      const searchParams = createQueryStringClean(params)
      const response = await api.get<GetDocumentsResponse>(
        `/documents/${companyId}?${searchParams}`,
      )
      return response.data
    },
    placeholderData: keepPreviousData,
    enabled: !!companyId,
  })
}
