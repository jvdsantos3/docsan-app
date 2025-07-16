import { api } from '@/lib/axios'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import type { GetDocumentTypesResponse } from './types/get-document-types-response'
import type { GetDocumentTypesSearchParams } from './types/get-document-types-search-params'

export function useDocumentTypes(params: GetDocumentTypesSearchParams = {}) {
  return useQuery({
    queryKey: ['get-document-types', params],
    queryFn: async () => {
      const { page = 1, order = 'asc' } = params
      const response = await api.get<GetDocumentTypesResponse>(
        `/document-types?page=${page}&order=${order}`,
      )
      return response.data
    },
    placeholderData: keepPreviousData,
  })
}
