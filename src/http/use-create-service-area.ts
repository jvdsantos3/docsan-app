// import { api } from '@/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { CreateServiceAreaRequest } from '@/types/http/create-service-area-request'
import type { Company } from '@/types/company'

export function useCreateServiceArea() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      companyId,
      data,
    }: {
      companyId: Company['id']
      data: CreateServiceAreaRequest
    }) => {
      console.log(companyId, data)
      return true
      // await api.post(`/company/${companyId}/document-types`, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-service-areas'] })
    },
  })
}
