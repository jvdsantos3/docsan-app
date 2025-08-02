import { api } from '@/lib/axios'
import { keepPreviousData, useQuery,  } from '@tanstack/react-query'
import {
  schema,
  type GetDocumentTypesSearchParams,
} from '../types/http/get-document-types-search-params'
import { createQueryStringClean } from '@/utils/create-query-string-clean'
import type { GetDocumentTypeVersionsResponse } from '@/types/http/get-document-type-versions-response'

export function useDocumentTypeVersions(companyId: string, typeId: string, params: GetDocumentTypesSearchParams = {}) {
  const parsedParams = schema.safeParse(params)
  
  if (!parsedParams.success) {
    throw new Error('Invalid search parameters for document types')
  }

  return useQuery({
    queryKey: ['get-document-type-version', parsedParams.data],
    queryFn: async () => {
      const searchParams = createQueryStringClean(parsedParams.data)
      const response = await api.get<GetDocumentTypeVersionsResponse>(
        `/company/${companyId}/document-types/${typeId}/documents?${searchParams}`,
      )
      return response.data
    },
    enabled: !!companyId,
    placeholderData: keepPreviousData,
  })
}
