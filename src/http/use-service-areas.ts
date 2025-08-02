// import { api } from '@/lib/axios'
import { keepPreviousData, useQuery,  } from '@tanstack/react-query'
// import type { GetDocumentTypesResponse } from '@/types/http/get-document-types-response'
import {
  schema,
  type GetServiceAreasSearchParams,
} from '../types/http/get-service-areas-search-params'
// import { createQueryStringClean } from '@/utils/create-query-string-clean'

export function useServiceAreas(companyId: string, params: GetServiceAreasSearchParams = {}) {
  const parsedParams = schema.safeParse(params)

  if (!parsedParams.success) {
    throw new Error('Invalid search parameters for document types')
  }

  return useQuery({
    queryKey: ['get-service-areas', parsedParams.data],
    queryFn: async () => {
      // const searchParams = createQueryStringClean(parsedParams.data)
      // const response = await api.get<GetDocumentTypesResponse>(
      //   `/company/${companyId}/document-types?${searchParams}`,
      // )

      const response = {
        data: [
          {
            id: "b7323166-5d06-4dfe-a4a6-1a4b888dfc89",
            name: "Saúde",
            createdAt: "2025-07-30T14:09:16.482Z",
            updatedAt: "2025-07-30T14:09:16.482Z"
          },
          {
            id: "b7323166-5d06-4dfe-a4a6-1a4b888dfc90",
            name: "Tecnologia",
            createdAt: "2025-07-30T14:09:16.482Z",
            updatedAt: "2025-07-30T14:09:16.482Z"
          },
          {
            id: "b7323166-5d06-4dfe-a4a6-1a4b888dfc91",
            name: "Segurança",
            createdAt: "2025-07-31T14:09:16.482Z",
            updatedAt: "2025-07-31T14:09:16.482Z"
          },
          {
            id: "b7323166-5d06-4dfe-a4a6-1a4b888dfc92",
            name: "Suporte",
            createdAt: "2025-07-31T14:09:16.482Z",
            updatedAt: "2025-07-31T14:09:16.482Z"
          },
          {
            id: "b7323166-5d06-4dfe-a4a6-1a4b888dfc93",
            name: "Lavanderia",
            createdAt: "2025-08-01T14:09:16.482Z",
            updatedAt: "2025-08-01T14:09:16.482Z"
          }
        ],
        first: 1,
        last: 1,
        current: 1,
        next: null,
        prev: null,
        total: 1
      }
      return response
    },
    enabled: !!companyId,
    placeholderData: keepPreviousData,
  })
}
