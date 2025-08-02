// import { api } from '@/lib/axios'
import type { Company } from '@/types/company'
// import type { GetServiceAreaResponse } from '@/types/http/get-service-area-response'
import type { ServiceArea } from '@/types/service-area'
// import { useQuery } from '@tanstack/react-query'

export function useServiceArea(
  serviceAreaId: ServiceArea['id'],
  companyId: Company['id'],
) {
  console.log(serviceAreaId, companyId);

  return {
    data: {
      id: "b7323166-5d06-4dfe-a4a6-1a4b888dfc89",
      name: "Saúde",
      createdAt: "2025-07-30T14:09:16.482Z",
      updatedAt: "2025-07-30T14:09:16.482Z"
    },
    isLoading: false
  }
  // return useQuery({
  //   queryKey: ['get-service-area', serviceAreaId],
  //   queryFn: async () => {
  //     const response = await api.get<GetServiceAreaResponse>(
  //       `/company/${companyId}/document-types/${serviceAreaId}`,
  //     )
  //     return response.data
  //   },
  //   enabled: !!serviceAreaId && !!companyId,
  // })
}
