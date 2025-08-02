import { api } from '@/lib/axios'
import { keepPreviousData, useQuery,  } from '@tanstack/react-query'
import type { GetDocumentTypesResponse } from '@/types/http/get-document-types-response'
import {
  schema,
  type GetDocumentTypesSearchParams,
} from '../types/http/get-document-types-search-params'
import { createQueryStringClean } from '@/utils/create-query-string-clean'

export function useDocumentTypes(companyId: string, params: GetDocumentTypesSearchParams = {}) {
  const parsedParams = schema.safeParse(params)

  if (!parsedParams.success) {
    throw new Error('Invalid search parameters for document types')
  }

  return useQuery({
    queryKey: ['get-document-types', parsedParams.data],
    queryFn: async () => {
      const searchParams = createQueryStringClean(parsedParams.data)
      const response = await api.get<GetDocumentTypesResponse>(
        `/company/${companyId}/document-types?${searchParams}`,
      )
      return response.data
    },
    enabled: !!companyId,
    placeholderData: keepPreviousData,
  })
}
