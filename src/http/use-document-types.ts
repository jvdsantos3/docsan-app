import { api } from '@/lib/axios'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import type { GetDocumentTypesResponse } from './types/get-document-types-response'
import type { GetDocumentTypesSearchParams } from './types/get-document-types-search-params'

export function useDocumentTypes(params: GetDocumentTypesSearchParams = {}) {
  return useQuery({
    queryKey: ['get-document-types', params],
    queryFn: async () => {
      const searchParams = new URLSearchParams(params as Record<string, string>)
      const response = await api.get<GetDocumentTypesResponse>(
        `/document-types?${searchParams.toString()}`,
      )
      return response.data
    },
    placeholderData: keepPreviousData,
  })
}
