// import { api } from '@/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { ServiceArea } from '@/types/service-area'
import type { Company } from '@/types/company'
import type { UpdateServiceAreaRequest } from '@/types/http/update-service-area-request'

export function useUpdateServiceArea() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      companyId,
      data,
    }: {
      id: ServiceArea['id']
      companyId: Company['id']
      data: UpdateServiceAreaRequest
    }) => {
      console.log(id, companyId, data)
      return true
      // await api.put(`/company/${companyId}/document-types/${id}`, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-service-areas'] })
    },
  })
}
